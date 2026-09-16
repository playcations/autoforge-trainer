const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync(__dirname+'/fixtures/noeval-bridge.js','utf8');
const flags={hp:false,cd:false,arena:false,speed:1,ready:{},mark(name){this.ready[name]=1;}},errors=[];
const ctx={window:{__afNative:flags},UTF8ToString:x=>x,stringToNewUTF8:x=>x,_typeof:x=>typeof x,console:{warn(){},error:x=>errors.push(x)}};
vm.createContext(ctx);vm.runInContext(src,ctx);
for(const key of ['hp','cd','arena']){
 assert.equal(ctx._webutil_run_noeval('__afNative.'+key),'false');
 flags[key]=true;assert.equal(ctx._webutil_run_noeval('__afNative.'+key),'true');
 assert.equal(ctx._webutil_run_noeval('__afNative.mark("'+key+'")'),'nil');assert.equal(flags.ready[key],1);
}
for(const speed of [1,2,3,5]){flags.speed=speed;assert.equal(ctx._webutil_run_noeval('__afNative.speed'),String(speed));}
assert.equal(ctx._webutil_run_noeval('__afNative.mark("speed")'),'nil');assert.equal(flags.ready.speed,1);
assert.equal(errors.length,0);
assert.match(ctx._webutil_run_noeval('window.__afNative.hp?1:0'),/Unsupported expression/);
console.log('PASS: shipped no-eval bridge accepts property flags and JSON-argument readiness calls; rejects previous ternary expression');
