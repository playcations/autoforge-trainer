const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map(),ctx={window:{},Date,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}};
vm.createContext(ctx);for(const f of ['trainer-catalog.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),ctx);
const make=()=>ctx.window.__autoForgeTestLabFactory(()=>{}),copy=v=>structuredClone(v);
const base={core:{age:9,level:1,last:900},forge:{level:25},player:{ingame_time:12000},inventory:{items:{soft_currency:1234.25,forge_currency:1.0000000001}},dungs:{a:{age:1,level:1},b:{age:2,level:1},c:{age:1,level:12},d:{age:3,level:1}}};
function begin(kind,options,state=base){store.clear();const lab=make(),id=lab.identity('resource-adventure-test');lab.bind(id);lab.observe(copy(state));const armed=lab.arm(kind,options);return {lab,id,armed};}
function load(r,state=base){const lab=make(),input=JSON.stringify({status:0,data:{data:state}}),output=lab.transform(input,r.id);return {lab,input,output,state:JSON.parse(output).data.data};}
for(const [key,amount,want]of [['soft_currency',1000000,1001235],['forge_currency',100,102],['arena_currency',12,12]]){
 const r=begin('resource',{resource:key,amount});assert(r.armed);const preview=r.lab.resourcePreview(key,amount);assert.equal(preview.after,want);
 const applied=load(r);assert.equal(applied.state.inventory.items[key],want);assert.equal(base.inventory.items.soft_currency,1234.25,'preflight leaves observed save intact');
 for(const [k,v]of Object.entries(base.inventory.items))if(k!==key)assert.equal(applied.state.inventory.items[k],v,'other fractional balances remain untouched');
 assert.equal(load(r).state.inventory.items[key],want,'stale reload does not repeat addition');
}
let r=begin('resource',{resource:'soft_currency',amount:100});
const newer=copy(base);newer.player.ingame_time+=30;newer.inventory.items.soft_currency=2000.75;
assert.equal(load(r,newer).state.inventory.items.soft_currency,2101,'normalizes newest loaded balance');
for(const raw of [null,'1234',NaN,Infinity,-0.1,Number.MAX_SAFE_INTEGER+1]){
 const state=copy(base);state.inventory.items.soft_currency=raw;r=begin('resource',{resource:'soft_currency',amount:1},state);assert(!r.armed,`reject invalid ${raw}`);assert(!r.lab.summary().pending);
}
const tools=ctx.window.__autoForgeResources;
assert.match(tools.plan({},'soft_currency',1).error,/not loaded/);
assert.equal(tools.plan({inventory:{items:{}}},'soft_currency',1).after,1,'native missing counter is zero');
assert.equal(tools.plan(base,'soft_currency',Number.MAX_SAFE_INTEGER-1235).after,Number.MAX_SAFE_INTEGER);
assert.match(tools.plan(base,'soft_currency',Number.MAX_SAFE_INTEGER-1234).error,/exceed/);
r=begin('resource',{resource:'soft_currency',amount:Number.MAX_SAFE_INTEGER-1235});
const overflow=copy(base);overflow.player.ingame_time+=30;overflow.inventory.items.soft_currency=2000.75;let result=load(r,overflow);assert.equal(result.output,result.input);assert.match(result.lab.summary().message,/exceed/);
r=begin('resource',{resource:'soft_currency',amount:1});const malformed=copy(base);malformed.player.ingame_time+=30;malformed.inventory.items.soft_currency=null;result=load(r,malformed);assert.equal(result.output,result.input);
r=begin('keys',{});result=load(r);for(const key of ['a','b','c','d'])assert.equal(result.state.inventory.items[key+'key_currency'],5);
r=begin('coins',{});assert.equal(load(r).state.inventory.items.soft_currency,1335,'legacy coin action shares normalization');
for(const [dungeon,limits]of Object.entries(ctx.window.__autoForgeCatalog.dungeons)){
 r=begin('dungeon_level',{dungeon,age:limits.length,level:limits.at(-1)});assert(r.armed);result=load(r);assert.equal(result.state.dungs[dungeon].age,limits.length);assert.equal(result.state.dungs[dungeon].level,limits.at(-1));
 for(const [age,level]of [[130,1],[limits.length+1,1],[1,limits[0]+1]]){r=begin('dungeon_level',{dungeon,age,level});assert(!r.armed);assert.match(r.lab.summary().message,/Choose adventure age/);}
}
r=begin('dungeon_level',{dungeon:'c',age:1,level:12});assert(!r.armed);assert.match(r.lab.summary().message,/above your current/);
console.log('PASS: fractional/missing resources, preview parity, selected-counter scope, repeated reloads, fresh balance normalization, precision boundaries, malformed data, shared keys/coins behavior, all adventure maxima and specific validation errors');
