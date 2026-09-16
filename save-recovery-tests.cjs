const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const KEY='af-trainer-one-shot-v1',copy=v=>JSON.parse(JSON.stringify(v));
const base={core:{age:8,level:14,last:813},forge:{level:25,count:12,upgrade:3,last:null},player:{ingame_time:12000},inventory:{items:{soft_currency:1000,forge_currency:500,arena_currency:8}},skills:{level:1,amount:10,count:10,upgrade:10,skills:{100:[0,1,3]}},pets:{amount:2,pets:{1:['1','1',0,1,.9]},eggs:{2:['2','2',0]},processes:[]},mounts:{amount:1,count:1,upgrade:1,mounts:{1:['1','1',0,2,.4]}},unknown:{nested:['preserve this',false,{value:42}]}};
function harness(){
  const store=new Map();let blocked=false;
  const context={window:{},Date,localStorage:{getItem:k=>store.get(k)||null,setItem(k,v){if(blocked)throw Error('QuotaExceededError');store.set(k,v);}}};
  vm.createContext(context);
  for(const file of ['trainer-catalog.js','research-editor.js','skins.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context);
  const make=()=>context.window.__autoForgeTestLabFactory(()=>{}),id=make().identity('save-recovery-fixture');
  let lab=make();lab.bind(id);lab.observe(copy(base));
  const observe=(s,source='Load')=>lab.observe(copy(s),{source,progress:s.core.last,gameTime:s.player.ingame_time});
  const load=(s,account=id)=>{
    lab=make();
    const envelope=JSON.parse(lab.transform(JSON.stringify({status:0,time:1800000000,data:{session_token:'fresh-envelope',role:'player',data:s}}),account));
    assert.equal(envelope.data.session_token,'fresh-envelope');assert.equal(envelope.data.role,'player');
    const state=envelope.data.data;observe(state);return state;
  };
  const apply=(kind,options,server=base)=>{assert(lab.arm(kind,options),lab.summary().message);return load(copy(server));};
  return {store,id,make,load,observe,apply,get lab(){return lab;},block(v){blocked=v;}};
}

// Reproduce the reported sequence across actual factory restarts while every server load is still 25.
let h=harness(),s;
for(const level of [26,27,28]){
  s=h.apply('forge_level',{level});assert.equal(s.forge.level,level);
  assert.equal(h.lab.summary().pending,null);
  assert.deepEqual(s.unknown,base.unknown,'Retain the full save, not only trainer fields');
}
const beforeReload=copy(s);
for(let i=0;i<3;i++)assert.deepEqual(h.load(base),beforeReload,'Recovery must not rerun the edit or advance play time');
assert.equal(h.lab.summary().outcome.type,'recovered','A local recovery is not server confirmation');

// Consecutive edits in different sections must accumulate from the same latest snapshot.
s=h.apply('resource',{resource:'soft_currency',amount:1000000});assert.equal(s.inventory.items.soft_currency,1001000);
s=h.apply('resource',{resource:'soft_currency',amount:2000000});assert.equal(s.inventory.items.soft_currency,3001000);
s=h.apply('pet_level',{level:9});assert.equal(s.pets.pets[1][3],9);assert.equal(s.pets.pets[1][4],.9);
s=h.apply('pet_level',{level:12});assert.equal(s.pets.pets[1][3],12);
s=h.apply('mount_level',{level:10});assert.equal(s.mounts.mounts[1][3],10);
s=h.apply('skill_cards',{skill:'100',amount:20});assert.equal(s.skills.skills[100][2],23);
s=h.apply('egg_start_finish',{});assert.equal(s.pets.processes[0][3],1);assert.deepEqual(s.pets.eggs,{});
assert.equal(s.forge.level,28);assert.equal(s.inventory.items.soft_currency,3001000);assert.equal(s.pets.pets[1][3],12);
assert.deepEqual(h.load(base),s,'Reload cannot duplicate coins, cards, or incubating eggs');

// Normal play (including spending) observed after Apply replaces the full checkpoint.
let played=copy(s);played.player.ingame_time+=30;played.inventory.items.soft_currency-=250;
played.pets.pets[2]=['2','2',0,1,0];played.pets.processes=[];played.unknown.nested.push('normal play');
h.observe(played,'Save');
s=h.apply('forge_level',{level:29});
assert.equal(s.inventory.items.soft_currency,3000750);assert.deepEqual(s.pets,played.pets);assert.deepEqual(s.unknown,played.unknown);
// A delayed older outgoing request must not overwrite the checkpoint used on the next Apply.
h.observe(base,'Save');s=h.apply('forge_level',{level:30});assert.equal(s.inventory.items.soft_currency,3000750);

// Once the server catches up, retire the checkpoint and confirm only that unmodified load.
assert.deepEqual(h.load(s),s);assert.equal(h.lab.summary().outcome.type,'verified');
assert.equal(JSON.parse(h.store.get(KEY)).checkpoint,undefined);

// A genuinely newer server save wins as a whole, even if resources were spent there.
h=harness();s=h.apply('resource',{resource:'soft_currency',amount:100});
const newer=copy(s);newer.player.ingame_time+=60;newer.inventory.items.soft_currency=600;newer.unknown={server:'newer'};
s=h.apply('resource',{resource:'soft_currency',amount:100},newer);
assert.equal(s.inventory.items.soft_currency,700);assert.deepEqual(s.unknown,newer.unknown);
// Campaign progress takes precedence over a smaller play-time marker, like the native selector.
const advanced=copy(s);advanced.core.last++;advanced.player.ingame_time=5;advanced.inventory.items.soft_currency=400;
assert.deepEqual(h.load(advanced),advanced);assert.equal(JSON.parse(h.store.get(KEY)).checkpoint,undefined);

// Higher timestamp breaks a metadata tie; identical metadata uses the server and existing guards.
h=harness();const stamped=copy(base);stamped.__ts=20;h.observe(stamped,'Save');
assert(h.lab.arm('forge_level',{level:26}));
const oldStamp=copy(base);oldStamp.__ts=10;
s=h.load(oldStamp);assert.equal(s.forge.level,26);assert.equal(s.__ts,20);
h=harness();assert(h.lab.arm('resource',{resource:'soft_currency',amount:100}));
const tied=copy(base);tied.inventory.items.soft_currency=900;
assert.deepEqual(h.load(tied),tied);assert.equal(h.lab.summary().outcome.type,'error');

// A save between queuing and reload must also be retained, including unrelated changes.
h=harness();assert(h.lab.arm('forge_level',{level:26}));
const late=copy(base);late.player.ingame_time+=30;late.inventory.items.soft_currency=750;late.unknown.late=true;
h.observe(late,'Save');s=h.load(base);assert.equal(s.forge.level,26);assert.equal(s.inventory.items.soft_currency,750);assert(s.unknown.late);

// Wrong accounts and failed/incomplete responses cannot consume or expose another account's checkpoint.
const other=h.lab.identity('other-account');assert.deepEqual(h.load(base,other),base);
assert.deepEqual(h.load(base),s);
for(const raw of ['not JSON',JSON.stringify({status:1,data:{data:base}}),JSON.stringify({status:0,data:{data:{forge:{level:1}}}})])assert.equal(h.make().transform(raw,h.id),raw);

// An expired action is cancelled, but the previously applied progress is still recovered.
assert(h.lab.arm('forge_level',{level:27}));
const expired=JSON.parse(h.store.get(KEY));expired.pending.expires=0;h.store.set(KEY,JSON.stringify(expired));
assert.deepEqual(h.load(base),s);assert.equal(h.lab.summary().pending,null);

// A failed checkpoint write cannot deliver a changed save and claim successful Apply.
h=harness();assert(h.lab.arm('forge_level',{level:26}));h.block(true);
assert.deepEqual(h.load(base),base);assert.equal(h.lab.summary().appliedThisSession,false);
assert.match(h.lab.summary().message,/storage.*No new change applied/i);
h.block(false);assert.equal(h.apply('forge_level',{level:26}).forge.level,26);
assert(h.lab.arm('forge_level',{level:27}));h.block(true);
assert.equal(h.load(base).forge.level,26,'Storage failure must still return the previously retained state');
assert.equal(h.lab.summary().appliedThisSession,false);
console.log('PASS: repeated 25→26→27→28 reloads, mixed sections, exactly-once additions, full-save recovery, normal spending/hatching, late saves, server catch-up/newer progress, account isolation, expiry and storage failures');
