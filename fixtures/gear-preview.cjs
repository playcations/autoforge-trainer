const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const base={core:{age:9,level:1,last:900},forge:{level:25},player:{ingame_time:12000},inventory:{items:{soft_currency:10000,forge_currency:500}},armory:{equipment:{1:['9001',40,0]},stash:[],amount:1,total:50},sets:{items:[],equipment:[],hidden:[]}};
const page=`<!doctype html><meta charset="utf-8"><title>Gear builder fixture</title><style>body{font:13px system-ui;background:#e5e2ee;margin:10px}pre{white-space:pre-wrap;width:135px}button{padding:5px}</style>
<p>Simulated stash</p><pre id="state"></pre><button id="sell">Sell first stash item</button>
<script>const key='gear-fixture';let state=JSON.parse(localStorage.getItem(key)||'null')||${JSON.stringify(base)};
window.fetch=async(input,init)=>{if(String(input).endsWith('/users/publish')){state=JSON.parse(init.body).data;localStorage.setItem(key,JSON.stringify(state));return new Response('{"status":0}');}return new Response(JSON.stringify({status:0,data:{data:state}}));};</script>
<script src="/trainer.js"></script><script>
const headers={'X-Auth-Uid':'gear-fixture'};
function draw(){document.querySelector('#state').textContent=state.armory.stash.length+' stash items\\n'+state.armory.stash.map(v=>{const p=window.__autoForgeGear.preview({item:v[0],level:v[1],seed:v[2]});return p.name+' · Lv '+p.level+'\\n'+window.__autoForgeGear.bonusText(p.bonus);}).join('\\n\\n');}
function save(){state.player.ingame_time+=30;fetch('/users/publish',{method:'POST',headers,body:JSON.stringify({data:state})});draw();}
fetch('/users/fetch',{method:'POST',headers,body:'{}'}).then(r=>r.json()).then(r=>{state=r.data.data;save();});
document.querySelector('#sell').onclick=()=>{state.armory.stash.shift();save();};
</script>`;
http.createServer((req,res)=>{res.setHeader('Cache-Control','no-store');if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end('<!doctype html><title>Compact gear check</title><iframe title="Game-sized fixture" src="/game" style="width:500px;height:500px;border:0"></iframe>');}else if(req.url==='/game'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(page);}else if(req.url==='/trainer.js'){res.setHeader('Content-Type','text/javascript');res.end(fs.readFileSync(path.join(__dirname,'../autoforge-inspector.user.js')));}else{res.writeHead(404);res.end();}}).listen(8887,'127.0.0.1',()=>console.log('Gear fixture http://127.0.0.1:8887/'));
