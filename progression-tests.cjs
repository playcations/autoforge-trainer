const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map(),context={window:{},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},Date};
vm.createContext(context);
for(const file of ['trainer-catalog.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context);
const catalog=context.window.__autoForgeCatalog;
const base={core:{age:4,level:1,last:320},forge:{level:5},player:{ingame_time:1000},inventory:{items:{mount_currency:990,hard_currency:30}},skills:{level:3,count:10,upgrade:10,amount:25,skills:{1000:[0,5,0]}},mounts:{amount:1,count:1,upgrade:1,level:1,active_mount:'1',mounts:{1:['1','2',123,1,2],2:['2','1',234,12,0]}},pets:{amount:3,pets:{1:['1','10',-56458,1,0],3:['3','9',0,1,1]},eggs:{2:['2','1',83735]},processes:{},active_pets:['3']},technos:{power:{nodes:{1:[1,0]},layers:0},forge:{nodes:{},layers:0}},dungs:{a:{age:1,level:1},b:{age:1,level:3},c:{age:1,level:61,count:0},d:{age:1,level:1}}};
function run(kind,options,state=base){store.clear();const lab=context.window.__autoForgeTestLabFactory(()=>{}),id=lab.identity('fixture');lab.bind(id);lab.observe(state);lab.arm(kind,options);const before=JSON.stringify({status:0,time:1800000000,data:{data:state}}),after=lab.transform(before,id);return {lab,id,state:JSON.parse(after).data.data,changed:after!==before,before};}
let result=run('pet_level',{level:10});
assert.equal(result.state.pets.pets[3][3],10);assert.equal(result.state.pets.pets[3][4],1);
assert.deepEqual(result.state.pets.eggs,base.pets.eggs);assert.deepEqual(result.state.pets.active_pets,['3']);
assert.deepEqual(result.state.mounts,base.mounts);
result=run('pet_level',{level:100});assert.equal(result.state.pets.pets[3][4],0,'maximum pet level has no leftover upgrade progress');
const mixed=structuredClone(base);
mixed.pets.pets[1][3]=12;mixed.pets.pets[1][4]=0.25;
mixed.pets.pets[3][4]=1.75;
result=run('pet_level',{level:9},mixed);
assert.equal(result.state.pets.pets[3][3],9,'fractional merge progress must not prevent leveling');
assert.equal(result.state.pets.pets[3][4],1.75,'fractional progress is preserved');
assert.deepEqual(result.state.pets.pets[1],mixed.pets.pets[1],'a pet above the target is untouched');
assert.match(result.lab.summary().message,/Edited incoming data for 1 pet to level 9; 1 already/);
result.lab.observe(result.state,{progress:result.state.core.last,gameTime:result.state.player.ingame_time,source:'Save'});
assert.equal(result.lab.summary().outcome.type,'saved');
assert.match(result.lab.summary().message,/outgoing save contains the new pet levels/);
result=run('pet_level',{level:9},mixed);
result.lab.observe(mixed,{progress:mixed.core.last,gameTime:mixed.player.ingame_time,source:'Save'});
assert.equal(result.lab.summary().outcome.type,'recovered');
assert.match(result.lab.summary().message,/retained locally/);
const recoveredLab=context.window.__autoForgeTestLabFactory(()=>{});
assert.deepEqual(JSON.parse(recoveredLab.transform(result.before,result.id)).data.data,result.state,'a discarded older save recovers the full applied state on reload without another edit');
result=run('pet_level',{level:9},mixed);
const newerLower=structuredClone(mixed);newerLower.player.ingame_time=result.state.player.ingame_time+60;
result.lab.observe(newerLower,{progress:newerLower.core.last,gameTime:newerLower.player.ingame_time,source:'Save'});
assert.equal(result.lab.summary().outcome.type,'error');
assert(result.lab.arm('pet_level',{level:9}),'a genuinely newer outgoing save can be used for a retry');
result=run('pet_level',{level:100},mixed);assert.equal(result.state.pets.pets[3][4],0);
for(const progress of [-1,NaN,Infinity]){
  const invalid=structuredClone(base);invalid.pets.pets[3][4]=progress;
  result=run('pet_level',{level:9},invalid);assert(!result.changed);assert.equal(result.lab.summary().pending,null);
  assert.match(result.lab.summary().message,/pet #3: invalid upgrade progress/);
}
result=run('pet_level',{level:1});assert(!result.changed);assert.match(result.lab.summary().message,/already at level 1 or higher/);
const unhatched=structuredClone(base);unhatched.pets.pets={};
result=run('pet_level',{level:9},unhatched);assert(!result.changed);assert.match(result.lab.summary().message,/No hatched pets/);
result=run('mount_level',{level:10});assert.equal(result.state.mounts.mounts[1][3],10);assert.equal(result.state.mounts.mounts[2][3],12);assert.equal(result.state.mounts.active_mount,'1');
const mergedMount=structuredClone(base);mergedMount.mounts.mounts[1][4]=2.7;
const mergedResult=run('mount_level',{level:10},mergedMount);assert.equal(mergedResult.state.mounts.mounts[1][3],10);assert.equal(mergedResult.state.mounts.mounts[1][4],2.7);
assert.equal(result.state.player.ingame_time>1030,true,'selection beats one unobserved native 30-second tick');
for(const kind of ['mount_level','pet_level'])for(const level of [0,101,-1,1.5,NaN])assert(!run(kind,{level}).changed);
const malformed=structuredClone(base);malformed.pets.pets[3][1]='not-a-real-pet';
assert(!run('pet_level',{level:10},malformed).changed,'later malformed creature cancels all earlier staged edits');
result=run('mount_add',{mount:'600'});assert.deepEqual(result.state.mounts.mounts[3],['3','600',1,1,0]);assert.equal(result.state.mounts.amount,3);assert.equal(result.state.mounts.count,2);assert.equal(result.state.mounts.upgrade,2);assert.equal(result.state.mounts.active_mount,'1');
for(const mount of ['1000','__proto__','unknown'])assert(!run('mount_add',{mount}).changed,'only normally summonable mounts can be added');
for(const [kind,group]of [['mount_summon_level','mounts'],['skill_summon_level','skills']]){
  result=run(kind,{level:40});assert.equal(result.state[group].level,40);assert.equal(result.state[group].upgrade,0);assert.equal(result.state[group].count,0);assert.equal(result.state[group].amount,base[group].amount);
  assert(!run(kind,{level:41}).changed);assert(!run(kind,{level:1}).changed);
}
for(const level of [41,100]){
  const overflow=structuredClone(base);overflow.mounts.level=level;
  result=run('mount_summon_level',{level:40},overflow);
  assert.equal(result.state.mounts.level,40,'missing mount odds can be repaired at the final configured tier');
  assert.equal(result.state.mounts.count,0);assert.equal(result.state.mounts.upgrade,0);
  assert.deepEqual(result.state.mounts.mounts,overflow.mounts.mounts);
  assert.deepEqual(result.state.inventory,overflow.inventory);
  assert(!run('mount_summon_level',{level:26},overflow).changed,'repair cannot lower below the final configured odds tier');
}
const impossible=structuredClone(base);impossible.mounts.level=101;
assert(!run('mount_summon_level',{level:40},impossible).changed,'out-of-range native progression still fails closed');
result=run('research_tree',{tree:'power',level:5});
for(const [id,node]of Object.entries(catalog.research.power))assert.deepEqual(result.state.technos.power.nodes[id],[Math.min(5,node.levels),0]);
assert.deepEqual(result.state.technos.forge,base.technos.forge);assert.deepEqual(result.state.inventory,base.inventory);
result=run('research_tree',{tree:'forge',level:5});for(const [id,node]of Object.entries(catalog.research.forge))assert.equal(result.state.technos.forge.nodes[id][0],node.levels);
const active=structuredClone(base);active.technos.power.nodes[2]=[0,1800001000];assert(!run('research_tree',{tree:'power',level:5},active).changed);
const compressed=structuredClone(base);compressed.technos.power={nodes:{},layers:1};result=run('research_tree',{tree:'power',level:1},compressed);assert(!result.state.technos.power.nodes[1],'completed compacted layers are preserved');
for(const tree of ['other','__proto__'])assert(!run('research_tree',{tree,level:5}).changed);
for(const dungeon of ['a','b','d']){
  result=run('dungeon_level',{dungeon,age:2,level:1});assert.deepEqual(result.state.dungs[dungeon],{age:2,level:1});assert.deepEqual(result.state.dungs.c,base.dungs.c);
  assert(!run('dungeon_level',{dungeon,age:1,level:11}).changed);assert(!run('dungeon_level',{dungeon,age:6,level:1}).changed);
}
result=run('dungeon_level',{dungeon:'c',age:1,level:100});assert.equal(result.state.dungs.c.level,100);assert.equal(result.state.dungs.c.count,0);
assert(!run('dungeon_level',{dungeon:'c',age:2,level:1}).changed);assert(!run('dungeon_level',{dungeon:'c',age:1,level:60}).changed);
for(const [kind,options]of [['pet_level',{level:10}],['mount_add',{mount:'600'}],['research_tree',{tree:'power',level:5}],['dungeon_level',{dungeon:'d',age:2,level:1}]]){
  result=run(kind,options);result.lab.observe(result.state);result.lab.arm('restore');const restored=JSON.parse(result.lab.transform(JSON.stringify({status:0,data:{data:result.state}}),result.id)).data.data;
  delete restored.player;const expected=structuredClone(base);delete expected.player;assert.deepEqual(restored,expected);
}
console.log('PASS: pet/mount leveling scope, native tick margin, unique normal mounts, summon tier bounds, tree caps/prerequisites, compacted layers, active-research rejection, dungeon bounds and exact field restoration.');
