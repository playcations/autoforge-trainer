const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map(),ctx={window:{},Date,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}};
vm.createContext(ctx);for(const f of ['trainer-catalog.js','gear-editor.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),ctx);
const cat=ctx.window.__autoForgeCatalog,gear=ctx.window.__autoForgeGear,copy=v=>JSON.parse(JSON.stringify(v));
const samples=JSON.parse(fs.readFileSync(__dirname+'/fixtures/gear-rolls.json','utf8')).samples;
for(const {seed,age,key,value}of samples){const got=gear.roll(seed,age);assert.equal(got.key,key);assert(Math.abs(got.value-value)<1e-12,`native seed ${seed}, era ${age}`);}
for(const [age,bonuses]of Object.entries(cat.gearBonusSeeds))for(const [key,seed]of Object.entries(bonuses)){
 const result=gear.roll(seed,Number(age));assert.equal(result.key,key);assert(result.value<=result.max);assert(result.max-result.value<1e-7,'preset yields the displayed high roll');
}
for(const age of cat.gearEras.keys())for(const slot of cat.gearSlots.keys())assert(Object.values(cat.items).some(v=>v.age===age+1&&v.slot===slot+1&&v.label&&!v.label.includes('_')),'Every era/slot has readable item choices');
assert.equal(gear.preview({item:'9001',level:100,seed:0}).name,'Hacker Visor');
assert.equal(gear.preview({item:'9001',level:100,seed:0}).hp,5240000);
assert.match(gear.preview({item:'10005',level:40,seed:1}).weapon,/Ranged.*gun/);
assert.equal(gear.preview({item:'10003',level:1,seed:1}).name,'Moon Boots');
const selections=[{item:'10001',level:100,seed:cat.gearBonusSeeds[10].base_hp},{item:'9003',level:90,seed:cat.gearBonusSeeds[9].attack_speed},{item:'9001',level:80,seed:0},{item:'10005',level:70,seed:-4294967295}];
const draft=gear.createDraft();for(const v of selections)assert(draft.add(v));assert(!draft.add(selections[0]));assert.equal(draft.items.length,4);
const external=draft.items;external[0].level=1;assert.equal(draft.items[0].level,100,'preview reads cannot mutate the queued batch');
draft.remove(1);assert.equal(draft.items.length,3);assert(draft.add(selections[1]));draft.clear();assert.equal(draft.items.length,0);
const base={core:{age:9,level:1,last:900},forge:{level:25},player:{ingame_time:1000},inventory:{items:{soft_currency:10000,forge_currency:55}},armory:{equipment:{1:['1001',5,0]},stash:[],amount:1,total:88}};
const make=()=>ctx.window.__autoForgeTestLabFactory(()=>{});
function begin(options,observed=base){store.clear();const lab=make(),id=lab.identity('gear-batch-fixture');lab.bind(id);lab.observe(copy(observed));return {lab,id,armed:lab.arm('gear_stash',options)};}
let r=begin({items:selections});assert(r.armed);let loaded=make();
const raw=JSON.stringify({status:0,data:{data:base}});const out=JSON.parse(loaded.transform(raw,r.id)).data.data;
assert.equal(out.armory.stash.length,4);assert.deepEqual(out.armory.stash.map(v=>v[0]),['9003','9001','10001','10005'],'native stash ordering by era');
for(const v of selections)assert(out.armory.stash.some(row=>row[0]===v.item&&row[1]===v.level&&row[2]===v.seed));
assert.deepEqual(out.armory.equipment,base.armory.equipment);assert.equal(out.armory.total,88);assert.equal(out.armory.amount,1);assert.deepEqual(out.inventory,base.inventory);
assert.deepEqual(JSON.parse(make().transform(raw,r.id)).data.data,out,'older reload restores exactly four items without duplicating them');
for(const items of [[],null,{},[...selections,selections[0]],[...selections.slice(0,3),{item:'__proto__',level:1,seed:0}],[{item:'9001',level:101,seed:0}],[{item:'9001',level:1,seed:NaN}],[null]]){
 r=begin({items});assert(!r.armed,'invalid batch is rejected before reload');assert.equal(r.lab.summary().pending,null);assert.equal(r.lab.transform(raw,r.id),raw);
}
const occupied=copy(base);occupied.armory.stash=[['1001',1,0]];
assert(!begin({items:selections},occupied).armed,'never overwrite occupied stash');
r=begin({items:selections});assert(r.armed);const current=JSON.stringify({status:0,data:{data:occupied}});assert.equal(make().transform(current,r.id),current,'stash occupancy rechecked when loaded');
r=begin({item:'9001',level:5,seed:2});assert(r.armed,'older one-item plans remain compatible');assert.equal(JSON.parse(make().transform(raw,r.id)).data.data.armory.stash.length,1);
console.log(`PASS: ${samples.length} native bonus fixtures, high-roll presets, readable era/slot choices, item stats, four-item drafts, atomic validation, ordering, reload recovery, occupancy rechecks and legacy plans`);
