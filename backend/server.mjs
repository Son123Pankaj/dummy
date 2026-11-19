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
        if (clean.plan && !['bronze','silver','gold','platinum'].includes(clean.plan)) return json(response,400,{error:'Choose a valid plan.'});
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
      if (url.pathname === '/api/ai/magic-wand') {
        if (request.method === 'OPTIONS') {
          response.writeHead(204, { 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
          return response.end();
        }
        if (request.method !== 'POST') return json(response, 405, { error: 'Use POST.' });
        let size = 0; const chunks = [];
        for await (const chunk of request) { size += chunk.length; if (size > 16000) return json(response, 413, { error: 'Request is too large.' }); chunks.push(chunk); }
        let body; try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return json(response, 400, { error: 'Invalid JSON.' }); }
        const text = (body?.text || '').trim();
        const action = body?.action || 'improve';
        if (!text) return json(response, 400, { error: 'Text is required.' });

        let result = text;
        if (process.env.GEMINI_API_KEY) {
          try {
            const promptMap = {
              improve: `Improve and polish the following text for clarity, professional flow and elegance while keeping its original meaning:\n\n${text}`,
              professional: `Rewrite the following text professionally for a corporate telecom/call center software inquiry to Avyukta IntelliCall:\n\n${text}`,
              grammar: `Correct any grammar, spelling, and punctuation errors in the following text without altering its tone:\n\n${text}`,
              shorten: `Make the following text concise and crisp, keeping key points:\n\n${text}`,
              expand: `Expand the following inquiry text with helpful telecom and call center details (inbound/outbound call capacity, CRM integration, languages):\n\n${text}`
            };
            const prompt = promptMap[action] || promptMap.improve;
            const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const candidate = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (candidate) result = candidate.trim();
            }
          } catch {
            // deterministic fallback
          }
        }
        if (result === text) {
          if (action === 'professional') {
            result = `Dear Avyukta IntelliCall Team,\n\nWe would like to request comprehensive details and a tailored quote regarding:\n${text}\n\nWe look forward to arranging an indicative demonstration at your earliest convenience.\n\nBest regards.`;
          } else if (action === 'grammar') {
            result = text.replace(/\bi\b/g, 'I').replace(/\s+([.,!?;:])/g, '$1').replace(/([.!?])\s*([a-z])/g, (_, p1, p2) => `${p1} ${p2.toUpperCase()}`).replace(/^[a-z]/, m => m.toUpperCase());
            if (!/[.!?]$/.test(result)) result += '.';
          } else if (action === 'shorten') {
            result = text.replace(/\b(actually|basically|essentially|kind of|sort of|just wanted to say that)\b/gi, '').replace(/\s{2,}/g, ' ').trim();
          } else if (action === 'expand') {
            result = `${text}\n\nKey Requirements:\n• 24/7 Inbound and automated outbound calling\n• Bilingual Hindi & English voice cadence with live interruption\n• Instant CRM integration with live supervisor transfer`;
          } else {
            result = text.replace(/^[a-z]/, m => m.toUpperCase());
            if (!/[.!?]$/.test(result)) result += '.';
          }
        }
        return json(response, 200, { result, action });
      }
      if (url.pathname === '/api/ai/summarize') {
        if (request.method === 'OPTIONS') {
          response.writeHead(204, { 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
          return response.end();
        }
        if (request.method !== 'POST') return json(response, 405, { error: 'Use POST.' });
        let size = 0; const chunks = [];
        for await (const chunk of request) { size += chunk.length; if (size > 32000) return json(response, 413, { error: 'Request is too large.' }); chunks.push(chunk); }
        let body; try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return json(response, 400, { error: 'Invalid JSON.' }); }
        const text = (body?.text || '').trim();
        const title = body?.title || 'Summary';
        if (!text) return json(response, 400, { error: 'Text is required.' });

        const sentences = text
          .replace(/[#*•✓]/g, '')
          .split(/(?<=[.?!])\s+/)
          .map(s => s.trim())
          .filter(s => s.length > 20);

        const keyHighlights = sentences.slice(0, 4);
        const takeaway = sentences[0] || `Avyukta IntelliCall enterprise solutions for ${title}.`;

        return json(response, 200, {
          title,
          summary: `Executive Summary of ${title}:\n\n${takeaway}\n\nKey Highlights:\n• ${keyHighlights.join('\n• ')}\n\nBusiness Value:\nProvides verified enterprise telecom infrastructure, transparent commercial billing, and high-concurrency conversational AI workflows.`,
          keyPoints: keyHighlights,
          readTime: `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min read`
        });
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
