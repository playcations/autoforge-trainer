const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const store=new Map(),context={window:{},Date,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}};vm.createContext(context);
for(const file of ['trainer-catalog.js','test-lab.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+file,'utf8'),context);
const base={forge:{level:5},core:{last:320},player:{ingame_time:1000},inventory:{items:{arena_currency:8,mount_currency:964}},arena:{league:1,points:49,strikes:2,history:[1,1]}};
function run(options,state=base){store.clear();const lab=context.window.__autoForgeTestLabFactory(()=>{}),id=lab.identity('arena-rank-fixture');lab.bind(id);lab.observe(state);lab.arm('arena_rank',options);const input=JSON.stringify({status:0,data:{data:state}}),output=lab.transform(input,id);return {lab,id,input,output,state:JSON.parse(output).data.data};}
for(const [league,points]of context.window.__autoForgeCatalog.arenaLeagues.map((v,i)=>[i+1,v.points-1]).concat([[2,0]])){
 const r=run({league,points});assert.equal(r.state.arena.league,league);assert.equal(r.state.arena.points,points);
 assert.deepEqual(r.state.arena.history,base.arena.history);assert.equal(r.state.arena.strikes,2);assert.deepEqual(r.state.inventory,base.inventory);
 assert.equal(r.lab.transform(r.output,r.id),r.output,'Applies once');
 r.lab.observe(r.state);r.lab.arm('restore');const restored=JSON.parse(r.lab.transform(r.output,r.id)).data.data;assert.deepEqual(restored.arena,base.arena);
}
for(const options of [{league:0,points:0},{league:18,points:0},{league:1.5,points:0},{league:1,points:-1},{league:1,points:100},{league:17,points:20000},{league:1,points:49},{league:1,points:48},{league:2,points:NaN}]){const r=run(options);assert.equal(r.output,r.input,'Reject invalid or non-increasing rank '+JSON.stringify(options));}
for(const state of [{...base,arena:{...base.arena,league:0}},{...base,arena:{...base.arena,points:-1}},{...base,arena:undefined},{...base,arena:{...base.arena,league:3,points:20}}]){const r=run({league:2,points:0},state);assert.equal(r.output,r.input);}
console.log('PASS: all 17 league bounds, rank increases, exact restoration, no tickets/history/rewards changed, invalid and lower targets rejected');
