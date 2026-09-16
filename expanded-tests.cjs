const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map(),context={window:{},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},Date};
vm.createContext(context);
for(const f of ['trainer-catalog.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),context);
const base={core:{age:2,level:2,last:202},forge:{level:5,count:1,upgrade:0},player:{ingame_time:1000},inventory:{items:{soft_currency:100,forge_currency:20,akey_currency:2,bkey_currency:1,ckey_currency:2,dkey_currency:2,skills_currency:0,tech_currency:5}},skills:{amount:10,count:10,upgrade:10,skills:{100:[0,2,3]},active_skills:['100']},armory:{equipment:{1:['1001',30,123],5:['1005',90,-23]},stash:[]},dungs:{a:{age:1,level:1},c:{age:1,level:1}},pets:{amount:1,eggs:{2:['2','1',0]},pets:{3:['3','2',0,1,0]},processes:{1:['4','1',0,1900000000]}},technos:{forge:{nodes:{x:[1,1900000000],y:[2,0]}}}};
function run(kind,opts={},state=base){store.clear();const lab=context.window.__autoForgeTestLabFactory(()=>{}),id=lab.identity('fixture');lab.bind(id);lab.observe(state);lab.arm(kind,opts);const before=JSON.stringify({status:0,time:1800000000,data:{data:state}});const after=lab.transform(before,id);return {state:JSON.parse(after).data.data,lab,changed:before!==after,before};}
let r=run('keys');for(const k of ['akey_currency','bkey_currency','ckey_currency','dkey_currency'])assert.equal(r.state.inventory.items[k],base.inventory.items[k]+5);assert.equal(r.state.inventory.items.soft_currency,100);
for(const amount of [1001,1000000,Number.MAX_SAFE_INTEGER-10]){
  const cards=run('skill_cards',{skill:'100',amount});assert(cards.changed);assert.equal(cards.state.skills.skills[100][2],3+amount);assert.equal(cards.state.skills.amount,10+amount);
}
assert(!run('skill_cards',{skill:'100',amount:Number.MAX_SAFE_INTEGER-9}).changed,'all summon counters must remain exact');
const manyPets=structuredClone(base);manyPets.pets.amount=1000001;
assert.equal(run('egg_add',{pet:'1',seed:999999},manyPets).state.pets.amount,1000002);
const lastPet=structuredClone(base);lastPet.pets.amount=Number.MAX_SAFE_INTEGER-1;
assert.equal(run('egg_add',{pet:'1',seed:0},lastPet).state.pets.amount,Number.MAX_SAFE_INTEGER);
lastPet.pets.eggs[String(Number.MAX_SAFE_INTEGER)]=[String(Number.MAX_SAFE_INTEGER),'1',0];
assert(!run('egg_add',{pet:'1',seed:0},lastPet).changed,'exhausted identifiers must terminate without overflow');
assert(run('gear_stash',{item:'3005',level:100,seed:4294967295}).changed);
r=run('campaign');assert.deepEqual(r.state.core,{age:3,level:15,last:314});
r=run('gear_level',{level:100});assert.deepEqual(r.state.armory.equipment,{1:['1001',100,123],5:['1005',100,-23]});
r=run('gear_stash',{item:'3005',level:100,seed:-123});assert.deepEqual(r.state.armory.stash,[['3005',100,-123]]);assert.deepEqual(r.state.armory.equipment,base.armory.equipment);
assert(!run('gear_stash',{item:'3005',level:100,seed:0},{...base,armory:{...base.armory,stash:[['1001',1,0]]}}).changed);
assert.deepEqual(run('gear_stash',{item:'3001',level:100,seed:0},{...base,armory:{...base.armory,stash:{}}}).state.armory.stash,[['3001',100,0]]);
for(const stash of [null,false,0,'',{'1':['1001',1,0]}])assert(!run('gear_stash',{item:'3001',level:100,seed:0},{...base,armory:{...base.armory,stash}}).changed);
assert(!run('gear_stash',{item:'__proto__',level:100,seed:0}).changed);
r=run('skill_cards',{skill:'100',amount:10});assert.deepEqual(r.state.skills.skills[100],[0,2,13]);assert.equal(r.state.skills.amount,20);assert.deepEqual(r.state.skills.active_skills,['100']);
r=run('skill_cards',{skill:'1200',amount:10});assert.deepEqual(r.state.skills.skills[1200],[0,1,9]);assert.equal(r.state.skills.upgrade,20);
assert(!run('skill_cards',{skill:'1',amount:10}).changed,'enemy-only skill rejected');
r=run('egg_add',{pet:'9',seed:1});assert.equal(r.state.pets.amount,5);assert.deepEqual(r.state.pets.eggs[5],['5','9',1]);assert.deepEqual(r.state.pets.eggs[2],base.pets.eggs[2]);
r=run('egg_level',{level:4});assert.equal(r.state.dungs.c.level,4);assert.equal(r.state.dungs.a.level,1);
assert(!run('egg_level',{level:131}).changed);assert(!run('egg_level',{level:1}).changed);
r=run('egg_timers');assert.equal(r.state.pets.processes[1][3],1);assert.equal(r.state.pets.processes[1][1],'1');
r=run('research_timers');assert.deepEqual(r.state.technos.forge.nodes,{x:[1,1799999999],y:[2,0]});
for(const amount of [0,-1,0.5,Number.MAX_SAFE_INTEGER+1,Infinity,NaN])assert(!run('resource',{resource:'soft_currency',amount}).changed);
for(const amount of [100001,1000000,1000000000,Number.MAX_SAFE_INTEGER-100]){
  r=run('resource',{resource:'soft_currency',amount});
  assert(r.changed);assert.equal(r.state.inventory.items.soft_currency,100+amount);
  assert.equal(r.state.inventory.items.forge_currency,base.inventory.items.forge_currency);
}
r=run('resource',{resource:'soft_currency',amount:Number.MAX_SAFE_INTEGER-99});assert(!r.changed,'addition must not overflow the exact integer balance range');
assert(!run('resource',{resource:'authentication_token',amount:100}).changed);
r=run('resource',{resource:'tech_currency',amount:100});assert.equal(r.state.inventory.items.tech_currency,105);
assert.equal(run('quality').state.forge.level,6,'forge progression is not capped at the old test-account limit');
assert(!run('quality',{}, {...base,forge:{...base.forge,level:context.window.__autoForgeCatalog.forgeMax}}).changed,'at the real forge cap nothing resets');
const bad=JSON.parse(JSON.stringify(base));bad.inventory.items.bkey_currency='invalid';assert(!run('keys',{},bad).changed,'invalid later field cancels the whole operation');
r=run('gear_level',{level:100});r.lab.observe(r.state);r.lab.arm('restore');const restored=JSON.parse(r.lab.transform(JSON.stringify({status:0,data:{data:r.state}}),r.lab.identity('fixture'))).data.data;assert.deepEqual(restored.armory.equipment,base.armory.equipment);
console.log('PASS: campaign consistency; four-key scope; resource validation; gear IDs, levels and stash protection; player-only cards/counters; unique egg identifiers; dungeon bounds; timer scope; forge cap; atomic rejection and restoration');
store.clear();const watched=context.window.__autoForgeTestLabFactory(()=>{}),watchedId=watched.identity('fixture');watched.bind(watchedId);watched.observe(base);watched.arm('gear_level',{level:100});
watched.observe({...base,core:{...base.core,last:203},player:{ingame_time:1010}});
const staleText=JSON.stringify({status:0,data:{data:base}});
assert.equal(watched.transform(staleText,watchedId),staleText);
assert.match(watched.summary().message,/older/);
assert.equal(watched.summary().pending,null);
console.log('PASS: pending operation tracks newly observed saves and rejects a load behind progress made after arming');
