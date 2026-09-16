// Manual browser regression fixture. Run from any directory with Node, then open localhost:8885.
// The server deliberately keeps returning forge 25 until the catch-up button is pressed.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const base={core:{age:8,level:14,last:813},forge:{level:25,count:0,upgrade:0,last:null},player:{ingame_time:12000},inventory:{items:{soft_currency:1000,forge_currency:500}},pets:{amount:1,pets:{1:['1','1',0,1,.9]},eggs:{},processes:[]}};
let serverSave=structuredClone(base),lastPublished;
const page=`<!doctype html><meta charset="utf-8"><title>Trainer stale-save regression</title>
<style>body{font:16px system-ui;background:#f5f0e5;padding:24px}pre{line-height:1.6}button{padding:8px}</style>
<h1>Stale-save regression fixture</h1><p>Simulated game only. Server remains at forge 25 until catch-up.</p>
<pre id="state">Loading…</pre><button id="spend">Spend 250 coins and save</button> <button id="catch-up">Let server catch up</button>
<script src="/trainer.js"></script><script>
const headers={'X-Auth-Uid':'stale-save-browser-fixture','Content-Type':'application/json'};let state;
function draw(){document.querySelector('#state').textContent='Forge: '+state.forge.level+'\\nCoins: '+state.inventory.items.soft_currency+'\\nPet level: '+state.pets.pets[1][3];}
async function save(){return fetch('/users/publish',{method:'POST',headers,body:JSON.stringify({data:state})});}
fetch('/users/fetch',{method:'POST',headers,body:'{}'}).then(r=>r.json()).then(async r=>{state=r.data.data;draw();await save();});
document.querySelector('#spend').onclick=async()=>{state.inventory.items.soft_currency-=250;state.player.ingame_time+=30;draw();await save();};
document.querySelector('#catch-up').onclick=async()=>{await fetch('/catch-up',{method:'POST'});location.reload();};
</script>`;
http.createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.url==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(page);}
  if(req.url==='/trainer.js'){res.setHeader('Content-Type','text/javascript');return res.end(fs.readFileSync(path.join(__dirname,'../autoforge-inspector.user.js')));}
  res.setHeader('Content-Type','application/json');
  if(req.url==='/users/fetch')return res.end(JSON.stringify({status:0,data:{data:serverSave}}));
  if(req.url==='/users/publish'){
    let body='';for await(const chunk of req)body+=chunk;
    lastPublished=JSON.parse(body).data;return res.end('{"status":0}');
  }
  if(req.url==='/catch-up'){if(lastPublished)serverSave=structuredClone(lastPublished);return res.end('{"status":0}');}
  res.writeHead(404);res.end('{}');
}).listen(8885,'127.0.0.1',()=>console.log('Stale-save fixture: http://127.0.0.1:8885/'));
