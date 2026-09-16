const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const host='https://autoforgegame-j101p8-0-0-19-webview.devvit.net';
let response;
class XHR {
 open(){this.readyState=1;this.listeners={};}
 send(){}
 get response(){return this.raw;}
 get responseText(){return typeof this.raw==='string'?this.raw:'';}
 setRequestHeader(){}
 getResponseHeader(){return null;}
 addEventListener(name,fn){this.listeners[name]=fn;}
}
const originals={open:XHR.prototype.open,send:XHR.prototype.send,header:XHR.prototype.setRequestHeader,responseHeader:XHR.prototype.getResponseHeader};
const fetch0=()=>Promise.resolve(response),storage=new Map();
const ctx={window:{fetch:fetch0,XMLHttpRequest:XHR},document:{documentElement:null,addEventListener(){}},location:{href:host+'/index.html'},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},URL,Headers,Request,Response,Blob,TextEncoder,TextDecoder,Uint8Array,ArrayBuffer,Date,setTimeout,setInterval,clearInterval,atob:s=>Buffer.from(s,'base64').toString('binary')};
vm.createContext(ctx);
for(const file of ['native-payload.js','native-patch.js','trainer-catalog.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),ctx);
let lab;const factory=ctx.window.__autoForgeTestLabFactory;ctx.window.__autoForgeTestLabFactory=(...args)=>(lab=factory(...args));
vm.runInContext(fs.readFileSync(__dirname+'/inspector.js','utf8'),ctx);
const api=ctx.window.__autoForgeReadOnlyInspector_v1,payload=ctx.window.__autoForgeNativePayload;
const bytes=new Uint8Array(payload.length);for(const p of payload.patches)bytes.set(Buffer.from(p.before,'base64'),p.offset);
const url=host+'/'+payload.build+'/game0.arcd';
const verify=out=>{assert.equal(out.byteLength,bytes.length);for(const p of payload.patches)assert.deepEqual(Buffer.from(out).subarray(p.offset,p.offset+Buffer.from(p.after,'base64').length),Buffer.from(p.after,'base64'));};
const body=JSON.stringify({status:0,time:1800000000,data:{data:{inventory:{items:{soft_currency:100}},forge:{level:5},core:{age:2,level:2,last:201},player:{ingame_time:100}}}});
const headers={'X-Auth-Uid':'synthetic-integration'};
const tick=()=>new Promise(r=>setTimeout(r,20));
(async()=>{
 response=new Response(bytes);verify(await (await ctx.window.fetch(url)).arrayBuffer());
 const xhr=new XHR();xhr.open('GET',url);Object.assign(xhr,{raw:bytes.buffer,status:200,responseType:'arraybuffer',readyState:4});verify(xhr.response);
 xhr.open('POST',host+'/users/fetch');xhr.setRequestHeader('X-Auth-Uid',headers['X-Auth-Uid']);xhr.send('{}');Object.assign(xhr,{raw:body,status:200,responseType:'text',readyState:4});assert.equal(xhr.responseText,body);xhr.listeners.loadend();
 await tick();assert.equal(api.getReport().snapshot.inventory.items.soft_currency,100);lab.arm('coins');
 response=new Response(body);const edited=await (await ctx.window.fetch(host+'/users/fetch',{method:'POST',body:'{}',headers})).json();assert.equal(edited.data.data.inventory.items.soft_currency,200);
 await tick();assert.equal(api.getReport().loads[0].modified,true);
 xhr.open('GET',url);Object.assign(xhr,{raw:bytes.buffer,status:200,responseType:'arraybuffer',readyState:4});verify(xhr.response);
 assert.equal(api.getReport().native.served,3);
 api.stop();assert.equal(ctx.window.fetch,fetch0);for(const [key,value]of Object.entries(originals)){const method={header:'setRequestHeader',responseHeader:'getResponseHeader'}[key]||key;assert.equal(XHR.prototype[method],value);}
 assert.equal(xhr.response,bytes.buffer,'Stopped archive getters return original bytes');
 console.log('PASS: integrated native/observer hook order, archive and player loads, one-shot edit, XHR reuse in both directions, export status, Stop restores all hooks');
})().catch(e=>{console.error(e);process.exitCode=1});
