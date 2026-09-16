const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const base={core:{age:9,level:1,last:900},forge:{level:25},player:{ingame_time:12000},inventory:{items:{soft_currency:1234.25,forge_currency:500}},dungs:{a:{age:1,level:2},b:{age:2,level:3},c:{age:1,level:12},d:{age:3,level:4}}};
const page=`<!doctype html><meta charset="utf-8"><title>Resource and adventure checks</title><style>body{font:14px system-ui;background:#e5e2ee}pre{white-space:pre-wrap;width:200px}</style><pre id="state"></pre>
<script>const key='resource-adventure-fixture';let state=JSON.parse(localStorage.getItem(key)||'null')||${JSON.stringify(base)};
window.fetch=async(input,init)=>{if(String(input).endsWith('/users/publish')){state=JSON.parse(init.body).data;localStorage.setItem(key,JSON.stringify(state));return new Response('{"status":0}');}return new Response(JSON.stringify({status:0,data:{data:state}}));};</script>
<script src="/trainer.js"></script><script>
const headers={'X-Auth-Uid':'resource-adventure-fixture'};
fetch('/users/fetch',{method:'POST',headers,body:'{}'}).then(r=>r.json()).then(r=>{state=r.data.data;state.player.ingame_time+=30;fetch('/users/publish',{method:'POST',headers,body:JSON.stringify({data:state})});document.querySelector('#state').textContent='Simulated save\\n'+JSON.stringify({resources:state.inventory.items,adventures:state.dungs},null,2);});
</script>`;
http.createServer((req,res)=>{res.setHeader('Cache-Control','no-store');if(req.url==='/trainer.js'){res.setHeader('Content-Type','text/javascript');res.end(fs.readFileSync(path.join(__dirname,'../autoforge-inspector.user.js')));}else{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(page);}}).listen(8888,'127.0.0.1',()=>console.log('Resource/adventure fixture http://127.0.0.1:8888/'));
