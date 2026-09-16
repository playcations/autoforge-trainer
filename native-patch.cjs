const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{},URL,location:{href:'https://autoforgegame-j101p8-0-0-19-webview.devvit.net/index.html'},atob:s=>Buffer.from(s,'base64').toString('binary'),Uint8Array,ArrayBuffer,Headers,Response};
let response;
class XHR{open(){this.readyState=1;}get response(){return this.raw;}get responseText(){return '';}setRequestHeader(){}getResponseHeader(){return '';}send(){}addEventListener(){}}
const open0=XHR.prototype.open,fetch0=()=>Promise.resolve(response);context.window.XMLHttpRequest=XHR;context.window.fetch=fetch0;
vm.createContext(context);for(const file of ['native-payload.js','native-patch.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context);
const api=context.window.__autoForgeNativePatchFactory(()=>{}),payload=context.window.__autoForgeNativePayload;
const bytes=new Uint8Array(payload.length);for(const p of payload.patches)bytes.set(Buffer.from(p.before,'base64'),p.offset);
const url='https://autoforgegame-j101p8-0-0-19-webview.devvit.net/1788851099/game0.arcd';
const xhr=new XHR();xhr.open('GET',url);xhr.readyState=4;xhr.status=200;xhr.responseType='arraybuffer';xhr.raw=bytes.buffer;
let out=xhr.response;assert.notEqual(out,bytes.buffer);assert.equal(out.byteLength,bytes.length);
for(const p of payload.patches)assert.deepEqual(Buffer.from(out).subarray(p.offset,p.offset+Buffer.from(p.after,'base64').length),Buffer.from(p.after,'base64'));
assert.equal(xhr.response,out);assert.equal(api.summary().served,1);
xhr.open('GET','https://example.com/other');assert.equal(xhr.response,bytes.buffer,'XHR reuse restores original getter');
const bad=new XHR();bad.open('GET',url);bad.readyState=4;bad.status=200;bad.responseType='arraybuffer';bad.raw=new Uint8Array(payload.length).buffer;assert.equal(bad.response,bad.raw,'mismatch leaves full archive unchanged');
assert(!api.set('hp',true),'switch is unavailable before Lua readiness');context.window.__afNative.ready.hp=1;assert(api.set('hp',true));assert(api.summary().hp);
assert(!api.set('arena',true),'Arena switch requires its module');context.window.__afNative.mark('arena');assert(api.set('arena',true));assert(api.summary().arena);
assert.equal(api.summary().speed,1);assert(!api.set('speed',2),'speed requires the battle module');
context.window.__afNative.mark('speed');
for(const speed of [2,3,5,1]){assert(api.set('speed',speed));assert.equal(api.summary().speed,speed);assert.equal(context.window.__afNative.speed,speed);}
for(const speed of [0,-1,1.5,4,10,NaN,Infinity,'2',true])assert(!api.set('speed',speed),'unsupported speed must not reach native code');
assert(api.set('speed',5));
(async()=>{response=new Response(bytes);const r=await context.window.fetch(url);assert.notEqual(r,response);assert.deepEqual(Buffer.from(await r.arrayBuffer()),Buffer.from(out));assert.deepEqual(Buffer.from(await response.arrayBuffer()),Buffer.from(bytes));
 response=new Response(bytes);assert.equal(await context.window.fetch(url.replace('1788851099','other-build')),response);
 api.stop();assert.equal(context.window.fetch,fetch0);assert.equal(XHR.prototype.open,open0);assert(!api.summary().hp);assert(!api.summary().cd);assert(!api.summary().arena);assert(!api.set('arena',true));assert.equal(api.summary().speed,1);assert(!api.set('speed',5));
 console.log('PASS: exact-build archive guard; same-length binary patches; unrelated/mismatched data unchanged; XHR caching/reuse; fetch source readability; readiness gate; Stop resets combat flags and hooks');
})().catch(e=>{console.error(e);process.exitCode=1});
