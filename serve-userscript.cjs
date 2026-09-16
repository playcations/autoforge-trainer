const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const names = new Set(['/autoforge-inspector.user.js', '/autoforge-inspector.meta.js']);
const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  const name = new URL(req.url, 'http://127.0.0.1:8767').pathname;
  if (!names.has(name)) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const data = fs.readFileSync(path.join(__dirname, name.slice(1)));
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(503); res.end('Run build-userscript.cjs first'); }
});
server.on('error', e => { console.error(e.message); process.exitCode = 1; });
server.listen(8767, '127.0.0.1', () => console.log('AutoForge userscript updates available on 127.0.0.1:8767'));
