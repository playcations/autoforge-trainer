const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map(),ctx={window:{},Date,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}};vm.createContext(ctx);
for(const file of ['trainer-catalog.js','skins.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),ctx);
const base={forge:{level:24},core:{last:813},player:{ingame_time:12000},inventory:{items:{soft_currency:450000}},sets:{items:Array.from({length:9},()=>({})),equipment:{1:'1'},hidden:[1]}};
base.sets.items[0]=['1'];
function run(state=base,loaded=state){store.clear();const lab=ctx.window.__autoForgeTestLabFactory(()=>{}),id=lab.identity('skin-fixture');lab.bind(id);lab.observe(state);const armed=lab.arm('skins_unlock');const input=JSON.stringify({status:0,data:{data:loaded}}),output=lab.transform(input,id);return {lab,id,armed,input,output,state:JSON.parse(output).data.data};}
let r=run();assert(r.armed);assert.equal(r.lab.skinSummary().owned,1);
const plan=ctx.window.__autoForgeSkins.plan(r.state);assert.equal(plan.owned,31);assert.equal(plan.added,0);
assert.deepEqual(r.state.sets.equipment,base.sets.equipment);assert.deepEqual(r.state.sets.hidden,[1]);assert.deepEqual(r.state.inventory,base.inventory);
for(const [id,def]of Object.entries(ctx.window.__autoForgeCatalog.skins))assert(r.state.sets.items[def.slot-1].includes(id));
assert.equal(r.state.sets.items[0].filter(id=>id==='1').length,1);
let fresh=ctx.window.__autoForgeTestLabFactory(()=>{});fresh.bind(r.id);fresh.observe(r.state,{progress:813,gameTime:r.state.player.ingame_time,source:'Load'});assert.equal(fresh.summary().outcome.type,'verified');
r.lab.observe(r.state);r.lab.arm('restore');const restored=JSON.parse(r.lab.transform(JSON.stringify({status:0,data:{data:r.state}}),r.id)).data.data;assert.deepEqual(restored.sets,base.sets);
const complete=r.state;r=run(complete);assert(!r.armed);assert.equal(r.output,r.input);
const objectSlots=structuredClone(base);objectSlots.sets.items=Object.fromEntries(objectSlots.sets.items.map((v,i)=>[i+1,v]));r=run(objectSlots);assert.equal(ctx.window.__autoForgeSkins.plan(r.state).owned,31);
const future=structuredClone(base);future.sets.items[0].push('999');r=run(future);assert(r.state.sets.items[0].includes('999'),'preserve unknown future skin IDs');
for(const mutate of [s=>delete s.sets,s=>s.sets.items[0]=['2'],s=>s.sets.items[0]=[1],s=>s.sets.items[0]='bad']){const bad=structuredClone(base);mutate(bad);r=run(bad);assert(!r.armed);assert.equal(r.output,r.input);}
const older=structuredClone(base);older.sets.items[0]={};r=run(base,older);assert.equal(r.output,r.input);assert.match(r.lab.summary().message,/older/);
console.log('PASS: all 31 skin pieces, native slot layout, existing and unknown ownership, no auto-equip, no currency changes, malformed/stale rejection, restore and later-load verification');
