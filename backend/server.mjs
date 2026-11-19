import { createServer } from 'node:http';
import { open, mkdir, readFile, realpath, stat } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID, createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const json = (response, status, value) => {response.writeHead(status, {'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'}); response.end(JSON.stringify(value));};
export async function createLeadServer({dataDir = resolve(root, 'backend/data'), staticDir = resolve(root, 'frontend/dist'), allowedOrigins = [], maxPerHour = 12} = {}) {
  await mkdir(dataDir, {recursive: true});
  const log = resolve(dataDir, 'leads.jsonl');
  const known = new Map();
  try {for (const line of (await readFile(log, 'utf8')).split('\n').filter(Boolean)) {const record = JSON.parse(line); known.set(record.requestKey, {id: record.id, digest: record.digest});}}
  catch (error) {if (error.code !== 'ENOENT') throw error;}
  const limits = new Map();
  let queue = Promise.resolve();
  const persist = record => {
    const task = queue.then(async () => {
      const existing = known.get(record.requestKey);
      if (existing) {if (existing.digest !== record.digest) throw new Error('IDEMPOTENCY_CONFLICT'); return existing.id;}
      const file = await open(log, 'a', 0o600);
      try {await file.writeFile(JSON.stringify(record) + '\n', 'utf8'); await file.sync();} finally {await file.close();}
      known.set(record.requestKey, {id: record.id, digest: record.digest}); return record.id;
    });
    queue = task.catch(() => {}); return task;
  };
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      if (url.pathname === '/api/leads') {
        const origin = request.headers.origin;
        const sameOrigin = origin && new URL(origin).host === request.headers.host;
        if (origin && !sameOrigin && !allowedOrigins.includes(origin)) return json(response, 403, {error:'This origin is not allowed.'});
        if (origin && allowedOrigins.includes(origin)) {response.setHeader('Access-Control-Allow-Origin', origin); response.setHeader('Vary','Origin');}
        if (request.method === 'OPTIONS') {response.writeHead(204, {'Access-Control-Allow-Methods':'POST, OPTIONS', 'Access-Control-Allow-Headers':'Content-Type, Idempotency-Key'}); return response.end();}
        if (request.method !== 'POST') {response.setHeader('Allow','POST, OPTIONS'); return json(response,405,{error:'Use POST.'});}
        if (!request.headers['content-type']?.startsWith('application/json')) return json(response,415,{error:'Send JSON.'});
        let size = 0; const chunks = [];
        for await (const chunk of request) {size += chunk.length; if (size > 16000) return json(response,413,{error:'Request is too large.'}); chunks.push(chunk);}
        let body; try {body = JSON.parse(Buffer.concat(chunks).toString('utf8'));} catch {return json(response,400,{error:'Invalid JSON.'});}
        if (!body || Array.isArray(body) || typeof body !== 'object') return json(response,400,{error:'Invalid request.'});
        const fields = {name:160,email:160,phone:25,company:160,useCase:160,language:160,message:3000,plan:30,voice:160,source:80,page:160,website:200};
        const clean = {};
        for (const [field, max] of Object.entries(fields)) {if (body[field] != null && typeof body[field] !== 'string') return json(response,400,{error:`Invalid ${field}.`}); clean[field] = (body[field] || '').trim(); if (clean[field].length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(clean[field])) return json(response,400,{error:`Invalid ${field}.`});}
        if (clean.website) return json(response,400,{error:'Request could not be accepted.'});
        if (clean.name.length < 2 || !clean.useCase || (!clean.email && !clean.phone) || body.consent !== true) return json(response,400,{error:'Add your name, contact method, use case and contact permission.'});
        if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return json(response,400,{error:'Enter a valid email.'});
        if (clean.phone && !/^\+?[\d\s().-]{7,25}$/.test(clean.phone)) return json(response,400,{error:'Enter a valid phone number.'});
        if (clean.plan && !['silver','gold','platinum'].includes(clean.plan)) return json(response,400,{error:'Choose a valid plan.'});
        const requestKey = request.headers['idempotency-key'];
        if (typeof requestKey !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(requestKey)) return json(response,400,{error:'A request identifier is required.'});
        const digest = createHash('sha256').update(JSON.stringify(clean)).digest('hex');
        const existing = known.get(requestKey);
        if (existing) return existing.digest === digest ? json(response,200,{id:existing.id}) : json(response,409,{error:'This identifier was already used. Refresh and try again.'});
        const now = Date.now();
        for (const [address, limit] of limits) if (limit.until <= now) limits.delete(address);
        const address = request.socket.remoteAddress || 'unknown'; const limit = limits.get(address) || {count:0,until:now + 3600000};
        if (limit.count >= maxPerHour || limits.size > 10000) {response.setHeader('Retry-After','3600'); return json(response,429,{error:'Too many requests. Please try later or call our team.'});}
        limit.count++; limits.set(address, limit);
        const {website, ...details} = clean;
        const id = await persist({id:randomUUID(), requestKey, digest, createdAt:new Date().toISOString(), consent:true, consentText:'Contact me about this demo request.', ...details});
        return json(response,201,{id});
      }
      if (url.pathname.startsWith('/api/')) return json(response,404,{error:'Not found.'});
      if (!['GET','HEAD'].includes(request.method)) return json(response,405,{error:'Method not allowed.'});
      const base = await realpath(staticDir);
      let candidate = resolve(base, '.' + decodeURIComponent(url.pathname));
      if (candidate !== base && !candidate.startsWith(base + sep)) return json(response,404,{error:'Not found.'});
      try {if (!(await stat(candidate)).isFile()) throw new Error('Not a file');} catch {if (extname(url.pathname)) return json(response,404,{error:'Not found.'}); candidate = resolve(base,'index.html');}
      const actual = await realpath(candidate);
      if (!actual.startsWith(base + sep)) return json(response,404,{error:'Not found.'});
      const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.mp3':'audio/mpeg','.ico':'image/x-icon'}[extname(actual)] || 'application/octet-stream';
      const bytes = await readFile(actual);
      const headers = {'Content-Type':mime,'Content-Length':bytes.length,'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':extname(actual) === '.html' ? 'no-cache' : 'public, max-age=3600', 'Accept-Ranges':'bytes'};
      if (request.headers.range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        let start = match?.[1] ? Number(match[1]) : 0;
        let end = match?.[2] ? Number(match[2]) : bytes.length - 1;
        if (match && !match[1] && match[2]) {start = Math.max(0, bytes.length - Number(match[2])); end = bytes.length - 1;}
        if (!match || (!match[1] && !match[2]) || start > end || start >= bytes.length) {response.writeHead(416, {'Content-Range':`bytes */${bytes.length}`}); return response.end();}
        end = Math.min(end, bytes.length - 1);
        const part = bytes.subarray(start,end + 1);
        response.writeHead(206, {...headers,'Content-Length':part.length,'Content-Range':`bytes ${start}-${end}/${bytes.length}`});
        return response.end(request.method === 'HEAD' ? undefined : part);
      }
      response.writeHead(200, headers);
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch (error) {json(response,error.message === 'IDEMPOTENCY_CONFLICT' ? 409 : 503,{error:'Unable to complete the request. Please retry or contact our team directly.'});}
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = await createLeadServer({dataDir:process.env.LEAD_DATA_DIR || undefined, allowedOrigins:(process.env.LEAD_ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173').split(',').filter(Boolean)});
  server.listen(Number(process.env.PORT || 8787), process.env.HOST || '127.0.0.1', () => console.log(`Website and lead service ready on port ${process.env.PORT || 8787}. Lead records remain outside the public website.`));
}
