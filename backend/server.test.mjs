import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createLeadServer } from './server.mjs';

const lead = {name:'पंकज शर्मा', phone:'+91 98765 43210', useCase:'Follow up leads', consent:true, plan:'gold', voice:'Ritu'};
async function fixture(t, options = {}) {
  const dir = await mkdtemp(join(tmpdir(),'avyukta-test-'));
  const dataDir = join(dir,'private'); const staticDir = join(dir,'public');
  await mkdir(staticDir); await writeFile(join(staticDir,'index.html'),'<main>Website</main>'); await writeFile(join(staticDir,'sample.mp3'),'0123456789');
  const server = await createLeadServer({dataDir,staticDir,...options});
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  t.after(async()=>{await new Promise(resolve=>server.close(resolve)); await rm(dir,{recursive:true,force:true});});
  const post = (body=lead,key='12345678-1234-1234-1234-123456789012',headers={}) => fetch(url+'/api/leads',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':key,...headers},body:JSON.stringify(body)});
  return {dataDir,staticDir,server,url,post};
}
test('saves Unicode enquiries durably and concurrent retries are idempotent', async t=>{
  const {post,dataDir} = await fixture(t);
  const results = await Promise.all([post(),post(),post()]);
  const bodies = await Promise.all(results.map(result=>result.json()));
  assert.equal(new Set(bodies.map(body=>body.id)).size,1);
  const lines = (await readFile(join(dataDir,'leads.jsonl'),'utf8')).trim().split('\n');
  assert.equal(lines.length,1); assert.equal(JSON.parse(lines[0]).name,lead.name);
  assert.equal((await post({...lead,message:'Changed request'})).status,409);
});
test('rejects missing permission, invalid contacts, spam, cross-origin and oversized inputs', async t=>{
  const {post,url} = await fixture(t);
  for (const body of [{...lead,consent:false},{...lead,phone:'abc'},{...lead,name:'A'},{...lead,website:'spam.example'},{...lead,message:'x'.repeat(3001)}]) assert.equal((await post(body)).status,400);
  assert.equal((await post(lead,undefined,{Origin:'https://unrelated.example'})).status,403);
  assert.equal((await fetch(url+'/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:'x'.repeat(17000)})).status,413);
});
test('private data is not served, nested routes load, audio seeking works', async t=>{
  const {post,url} = await fixture(t); await post();
  assert.equal((await fetch(url+'/backend/data/leads.jsonl')).status,404);
  assert.equal((await fetch(url+'/api/unknown')).status,404);
  assert.match(await (await fetch(url+'/pricing')).text(),/Website/);
  const range = await fetch(url+'/sample.mp3',{headers:{Range:'bytes=3-6'}});
  assert.equal(range.status,206); assert.equal(await range.text(),'3456');
  assert.equal(range.headers.get('content-range'),'bytes 3-6/10');
  assert.equal((await fetch(url+'/sample.mp3',{headers:{Range:'bytes=999-'}})).status,416);
});
test('rate limit is enforced but a saved request can still be retried', async t=>{
  const {post} = await fixture(t,{maxPerHour:1});
  assert.equal((await post()).status,201); assert.equal((await post()).status,200);
  assert.equal((await post(lead,'abcdefgh-1234-1234-1234-123456789012')).status,429);
});
test('idempotency survives a service restart', async t=>{
  const {post,server,dataDir,staticDir} = await fixture(t);
  const saved = await (await post()).json();
  await new Promise(resolve=>server.close(resolve));
  const restarted = await createLeadServer({dataDir,staticDir});
  await new Promise(resolve=>restarted.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>restarted.close(resolve)));
  const response = await fetch(`http://127.0.0.1:${restarted.address().port}/api/leads`,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':'12345678-1234-1234-1234-123456789012'},body:JSON.stringify(lead)});
  assert.equal(response.status,200); assert.equal((await response.json()).id,saved.id);
});
