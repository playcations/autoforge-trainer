const {readFileSync} = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const src=readFileSync(__dirname+'/inspector.js','utf8');
const KEY='__autoForgeReadOnlyInspector_v1';
const state={inventory:{items:{soft_currency:123,forge_currency:55,hard_currency:8},charges:1700000000},forge:{level:16,last:1800000000},skills:{skills:{'12':[2,7,3]}},player:{name:'PRIVATE',token:'SECRET'},liveops:{event:{points:20,token:'SECRET'}}};
const sent=[];
let result;
function originalFetch(...args){sent.push(args);return result;}
class XHR {
 open(...args){this.args=args;this.listeners={};}
 send(body){this.sentBody=body;return 'native-result';}
 addEventListener(name,fn){this.listeners[name]=fn;}
}
const ctx={window:{fetch:originalFetch,XMLHttpRequest:XHR},document:{documentElement:null,addEventListener(){}},location:{href:'https://game.test/index.html'},URL,Request,Response,Blob,TextDecoder,ArrayBuffer,Date,setTimeout,clearInterval,setInterval,console};
vm.createContext(ctx);vm.runInContext(src,ctx);
const api=ctx.window[KEY];
const tick=()=>new Promise(r=>setTimeout(r,15));
(async()=>{
 const payload=JSON.stringify({merge:false,data:state});
 const response=new Response(JSON.stringify({status:0,time:1800000000}));
 result=Promise.resolve(response);
 const init={method:'POST',body:payload,headers:{'X-Auth-Token':'SECRET'}};
 const promise=ctx.window.fetch('https://game.test/users/publish?token=PRIVATE',init);
 assert.equal(promise,result,'fetch promise identity must remain unchanged');
 assert.equal(sent[0][1],init,'request init must remain unchanged');
 await tick();
 assert.equal(await response.text(),JSON.stringify({status:0,time:1800000000}),'original response body remains readable');
 let report=api.getReport();
 assert.equal(report.snapshot.inventory.items.soft_currency,123);
 assert.equal(report.events[0].appStatus,0);
 assert.ok(!JSON.stringify(report).includes('SECRET'));
 assert.ok(!JSON.stringify(report).includes('PRIVATE'));
 const xhr=new XHR();xhr.open('POST','https://game.test/users/publish');
 assert.equal(xhr.send(payload),'native-result');assert.equal(xhr.sentBody,payload);
 xhr.status=200;xhr.responseType='text';xhr.responseText=JSON.stringify({status:7});xhr.listeners.loadend();
 await tick();assert.equal(api.getReport().events[0].appStatus,7);
 result=Promise.resolve(new Response(JSON.stringify({status:0,data:{data:{...state,forge:{level:17}}}})));
 await ctx.window.fetch('https://game.test/users/fetch',{method:'POST'});await tick();
 assert.equal(api.getReport().snapshot.forge.level,17);
 assert.equal(api.getReport().source,'Server load');
 result=Promise.reject(new Error('offline'));
 await assert.rejects(ctx.window.fetch('https://game.test/users/publish',init));await tick();
 assert.equal(api.getReport().events[0].httpStatus,0);
 const oldCount=api.getReport().events.length;
 result=Promise.resolve(new Response('{}'));
 await ctx.window.fetch('https://unrelated.test/private',{body:'SECRET'});await tick();
 assert.equal(api.getReport().events.length,oldCount);
 api.stop();assert.equal(ctx.window.fetch,originalFetch);assert.equal(ctx.window[KEY],undefined);
 console.log('PASS: request/response transparency, fetch and XHR capture, load parsing, status reporting, sensitive-data filtering, failure handling, endpoint filtering, stop restoration');
})().catch(e=>{console.error(e);process.exitCode=1});
