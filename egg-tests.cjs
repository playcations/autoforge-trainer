const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const storage=new Map(),context={window:{},Date,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}};
vm.createContext(context);for(const file of ['trainer-catalog.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context);
const eggs=context.window.__autoForgeEggs;
const base={forge:{level:24},core:{age:8,level:1,last:800},player:{ingame_time:1000},inventory:{items:{hard_currency:12}},pets:{amount:0,eggs:{},processes:{},pets:{},active_pets:[],add_slot:false}};
function run(kind,state,options={},loaded=state,time=1800000000){storage.clear();let lab=context.window.__autoForgeTestLabFactory(()=>{});const id=lab.identity('egg-fixture');lab.bind(id);lab.observe(state);const armed=lab.arm(kind,options);lab=context.window.__autoForgeTestLabFactory(()=>{});const input=JSON.stringify({status:0,time,data:{data:loaded}}),output=lab.transform(input,id);lab.observe(JSON.parse(output).data.data);return {lab,id,armed,input,output,state:JSON.parse(output).data.data};}
let state=run('egg_add',base,{pet:'9',seed:42}).state;
let r=run('egg_timers',state);assert(!r.armed);assert.equal(r.output,r.input);assert.match(r.lab.summary().message,/inventory.*timers have not started/);
r=run('egg_start_finish',state);assert(r.armed);state=r.state;assert.deepEqual(state.pets.processes[0],['1','9',42,1]);assert.deepEqual(state.pets.eggs,{});assert.equal(eggs.inspect(state.pets).ready,1);assert.deepEqual(state.inventory,base.inventory);
state=run('egg_add',state,{pet:'1',seed:22}).state;state=run('egg_add',state,{pet:'2',seed:33}).state;
r=run('egg_start_finish',state);state=r.state;assert.deepEqual(state.pets.processes[0],['1','9',42,1],'First completed deadline must remain finished');assert.deepEqual(state.pets.processes[1],['2','1',22,1]);assert.deepEqual(state.pets.eggs[3],['3','2',33]);assert(!state.pets.add_slot);assert.match(r.lab.summary().message,/2 eggs ready.*1 waiting/);
r=run('egg_start_finish',state);assert(!r.armed);assert.match(r.lab.summary().message,/Collect.*free slots/);
for(const [slot,p]of Object.entries(state.pets.processes)){state.pets.pets[p[0]]=[...p.slice(0,3),1,0];delete state.pets.processes[slot];}
r=run('egg_start_finish',state);state=r.state;assert.deepEqual(state.pets.processes[0],['3','2',33,1]);assert.equal(Object.keys(state.pets.pets).length,2);assert.equal(Object.keys(state.pets.eggs).length,0);
const before=structuredClone(base);before.pets={...before.pets,amount:3,eggs:{1:['1','1',0],2:['2','2',0],3:['3','9',0]},add_slot:true};
r=run('egg_start_finish',before);assert.equal(eggs.inspect(r.state.pets).ready,3);assert.deepEqual(r.state.pets.eggs,{});
r.lab.bind(r.id);r.lab.observe(r.state);r.lab.arm('restore');const restored=JSON.parse(r.lab.transform(JSON.stringify({status:0,data:{data:r.state}}),r.id)).data.data;assert.deepEqual(restored.pets,before.pets);
for(const processes of [[],[null,['2','2',0,1900000000]]]){const arrayState=structuredClone(base);arrayState.pets.amount=2;arrayState.pets.eggs={1:['1','1',0]};arrayState.pets.processes=processes;r=run('egg_start_finish',arrayState);assert.equal(r.state.pets.processes[0][0],'1');assert.equal(r.state.pets.processes[0][3],1);assert(Array.isArray(r.state.pets.processes));}
const active=structuredClone(base);active.pets.amount=1;active.pets.processes={1:['1','9',42,1900000000]};
for(const time of [1800000000,1800000000000,0,undefined]){r=run('egg_timers',active,{},active,time);assert.equal(r.state.pets.processes[1][3],1,'Deadline must be expired regardless of response clock units');}
let verifier=context.window.__autoForgeTestLabFactory(()=>{});verifier.bind(r.id);verifier.observe(r.state,{source:'Load'});assert.equal(verifier.summary().outcome.type,'verified');
const collected=structuredClone(r.state);collected.pets.pets[1]=['1','9',42,1,0];collected.pets.processes={};verifier=context.window.__autoForgeTestLabFactory(()=>{});verifier.bind(r.id);verifier.observe(collected,{source:'Load'});assert.equal(verifier.summary().outcome.type,'verified');
const older=structuredClone(active);older.pets.amount=0;older.pets.processes={};r=run('egg_timers',active,{},older);assert.equal(r.output,r.input);assert.match(r.lab.summary().message,/behind/);
const alreadyReady=structuredClone(active);alreadyReady.pets.processes[1][3]=1;r=run('egg_add',alreadyReady,{pet:'1',seed:0},active);assert.equal(r.output,r.input,'Adding another egg must not restore an older full deadline');
const invalid=structuredClone(active);invalid.pets.processes[2]=['2','bad-id',0,1900000000];r=run('egg_timers',invalid);assert(!r.armed);assert.equal(r.output,r.input);
console.log('PASS: waiting versus incubating eggs, repeated add/finish sequence, slot limits, native collection shape, array slots, clock-independent deadlines, stale egg guards, persistence checks and restoration');


