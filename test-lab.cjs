const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map();
const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
const ctx={window:{},localStorage,Date,console};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/test-lab.js','utf8'),ctx);
const make=()=>ctx.window.__autoForgeTestLabFactory(()=>{});
let lab=make();
const base={status:0,time:1800000000,data:{session_token:'untouched',data:{core:{last:5},forge:{level:2,count:12,upgrade:1,last:1800000500},inventory:{items:{soft_currency:100,hard_currency:30}},player:{name:'unchanged',ingame_time:1000}}}};
const text=JSON.stringify(base), id=lab.identity('test-account');
assert.equal(lab.transform(text,id),text,'unarmed must preserve exact body');
lab.observe(base.data.data);lab.arm('coins');
assert.equal(lab.transform(text,lab.identity('other-account')),text,'wrong account must not be changed');
lab=make(); // reload retains the one-shot plan
const coin=JSON.parse(lab.transform(text,id));
assert.equal(coin.data.data.inventory.items.soft_currency,200);
assert.equal(coin.data.data.inventory.items.hard_currency,30);
assert.equal(coin.data.session_token,'untouched');
assert(coin.data.data.player.ingame_time>1000);
assert.equal(JSON.parse(lab.transform(text,id)).data.data.inventory.items.soft_currency,200,'old loads recover the result without adding twice');
lab.observe(coin.data.data);lab.arm('restore');
assert.equal(JSON.parse(lab.transform(JSON.stringify(coin),id)).data.data.inventory.items.soft_currency,100);
lab.observe(base.data.data);lab.arm('timer');
assert.equal(JSON.parse(lab.transform(text,id)).data.data.forge.last,1799999999);
lab.observe(base.data.data);lab.arm('quality');
const quality=JSON.parse(lab.transform(text,id));
assert.equal(quality.data.data.forge.level,3);assert.equal(quality.data.data.forge.last,null);
assert.equal(quality.data.data.inventory.items.soft_currency,100);
lab.observe({forge:{level:16}});lab.arm('coins');assert.equal(lab.summary().pending,null);
store.clear();lab=make();lab.bind(id);
lab.observe(base.data.data);lab.arm('coins');
const pending=JSON.parse(store.get('af-trainer-one-shot-v1'));pending.pending.expires=0;store.set('af-trainer-one-shot-v1',JSON.stringify(pending));
lab=make();assert.equal(lab.transform(text,id),text);
lab.observe(base.data.data);lab.arm('coins');
const older=JSON.parse(text);older.data.data.core.last=4;
const recovered=JSON.parse(lab.transform(JSON.stringify(older),id));assert.equal(recovered.data.data.core.last,5);assert.equal(recovered.data.data.inventory.items.soft_currency,200);
assert.equal(lab.summary().pending,null,'older campaign uses the retained full save and consumes the operation once');
lab.observe({forge:{level:2}});lab.arm('coins');assert.equal(lab.summary().pending,null,'metadata required');
console.log('PASS: account binding, reload, one-shot consumption, coin scope, timer, forge level, restore, incomplete-snapshot guard, expiration');

// Integration: test the assembled fetch path with native response objects.
(async()=>{
let nativeResponse, nativeArgs;
class XHR{
  constructor(){this.listeners=[];this.responseType='';this.readyState=0;}
  open(){this.readyState=1;this.raw='';}
  send(){this.raw=text;this.readyState=4;this.status=200;for(const cb of this.listeners.splice(0))cb();}
  addEventListener(name,cb){this.listeners.push(cb);}
  setRequestHeader(){}
  getResponseHeader(){return String(Buffer.byteLength(this.raw));}
  get responseText(){if(this.responseType && this.responseType!=='text')throw Error('InvalidState');return this.raw;}
  get response(){return this.responseType==='json'?JSON.parse(this.raw):this.responseType==='arraybuffer'?new TextEncoder().encode(this.raw).buffer:this.raw;}
}
const ctx2={window:{XMLHttpRequest:XHR,fetch(...a){nativeArgs=a;return Promise.resolve(nativeResponse);}},document:{documentElement:null,addEventListener(){}},location:{href:'https://game.test/index.html'},localStorage:{getItem:()=>null,setItem(){}},Headers,Request,Response,URL,Blob,TextEncoder,TextDecoder,ArrayBuffer,Date,setInterval,clearInterval,setTimeout,console};
vm.createContext(ctx2);vm.runInContext(fs.readFileSync(__dirname+'/test-lab.js','utf8'),ctx2);
const factory=ctx2.window.__autoForgeTestLabFactory;let integratedLab;
ctx2.window.__autoForgeTestLabFactory=cb=>(integratedLab=factory(cb));
vm.runInContext(fs.readFileSync(__dirname+'/inspector.js','utf8'),ctx2);
const args={method:'POST',headers:{'X-Auth-Uid':'test-account'},body:'{}'};
nativeResponse=new Response(text,{headers:{'Content-Length':String(Buffer.byteLength(text))}});
const first=await ctx2.window.fetch('https://game.test/users/fetch',args);
assert.equal(first,nativeResponse,'unarmed response object preserved');
await new Promise(r=>setTimeout(r,20));
integratedLab.arm('coins');
nativeResponse=new Response(text);
assert.equal(await ctx2.window.fetch('https://game.test/users/fetch',{...args,body:'{"without_data":true}'}),nativeResponse);
assert.equal(integratedLab.summary().pending.kind,'coins','session response must not consume test');
nativeResponse=new Response(text,{headers:{'Content-Length':String(Buffer.byteLength(text))}});
const edited=await ctx2.window.fetch('https://game.test/users/fetch',args);
assert.equal(nativeArgs[1],args,'request untouched');
const editedText=await edited.text();
assert.equal(JSON.parse(editedText).data.data.inventory.items.soft_currency,200);
assert.equal(Number(edited.headers.get('content-length')),Buffer.byteLength(editedText));
assert.equal(await nativeResponse.text(),text,'original response not consumed');
console.log('PASS: fetch load-response integration, native request integrity, original response readability, content length');
let expectedCoins=200;
for(const type of ['','text','json','arraybuffer']){
  integratedLab.observe(base.data.data);integratedLab.arm('coins');
  const session=new XHR();session.open('POST','https://game.test/users/fetch');session.setRequestHeader('X-Auth-Uid','test-account');session.send('{"without_data":true}');
  assert.equal(session.responseText,text);assert.equal(integratedLab.summary().pending.kind,'coins');
  const xhr=new XHR();xhr.open('POST','https://game.test/users/fetch');xhr.responseType=type;xhr.setRequestHeader('X-Auth-Uid','test-account');xhr.send('{}');
  const raw=type==='json'?JSON.stringify(xhr.response):type==='arraybuffer'?new TextDecoder().decode(xhr.response):xhr.responseText;
  assert.equal(JSON.parse(raw).data.data.inventory.items.soft_currency,expectedCoins+=100);
  assert.equal(Number(xhr.getResponseHeader('Content-Length')),Buffer.byteLength(raw));
  xhr.open('GET','https://game.test/other');xhr.send();
  const reused=type==='json'?JSON.stringify(xhr.response):type==='arraybuffer'?new TextDecoder().decode(xhr.response):xhr.responseText;
  assert.equal(reused,text,'reused XHR must have native getters restored');
}
integratedLab.observe(base.data.data);integratedLab.arm('coins');
const pendingXHR=new XHR();pendingXHR.open('POST','https://game.test/users/fetch');pendingXHR.setRequestHeader('X-Auth-Uid','test-account');
ctx2.window.__autoForgeReadOnlyInspector_v1.stop();pendingXHR.send();
assert.equal(pendingXHR.responseText,text,'stop prevents pending response modification');
assert.equal(integratedLab.summary().pending,null);
console.log('PASS: XHR text/json/arraybuffer, content length, request reuse, stopping cancels pending tests');
})().catch(e=>{console.error(e);process.exitCode=1;});
