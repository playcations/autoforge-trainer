(() => {
  'use strict';
  const resourceTools=window.__autoForgeResources={
    plan(state,key,amount){
      const items=state?.inventory?.items;
      if(!items||typeof items!=='object')return {error:'Resource data has not loaded yet. Let the game finish loading, then try again.'};
      const raw=Object.hasOwn(items,key)?items[key]:0;
      if(typeof raw!=='number'||!Number.isFinite(raw)||raw<0)return {error:'The selected resource balance is not a usable number. Reload the game to read it again.'};
      if(raw>Number.MAX_SAFE_INTEGER)return {error:'This balance exceeds the supported numeric precision limit; it cannot be increased reliably.'};
      const balance=Math.ceil(raw),max=Number.MAX_SAFE_INTEGER-balance;
      const result={current:raw,balance,max,rounded:raw!==balance};
      if(!Number.isSafeInteger(amount)||amount<1)return {...result,error:'Enter a whole-number addition of at least 1.'};
      if(amount>max)return {...result,error:`This addition would exceed the exact whole-number limit. You can add up to ${max}.`};
      return {...result,after:balance+amount};
    }
  };
  const eggTools=window.__autoForgeEggs={
    inspect(pets,now=Date.now()/1000){
      const processes=Object.values(pets?.processes||{}).filter(Array.isArray);
      const waiting=Object.values(pets?.eggs||{}).filter(Array.isArray).length,slots=pets?.add_slot===true?3:2;
      const ready=processes.filter(p=>Number.isFinite(p[3])&&p[3]<=now).length;
      return {waiting,slots,occupied:processes.length,free:Math.max(0,slots-processes.length),ready,incubating:processes.length-ready};
    },
    guard(pets){
      const items=[];
      for(const [group,location]of [['eggs','waiting'],['processes','incubating'],['pets','hatched']])for(const p of Object.values(pets?.[group]||{}))if(Array.isArray(p))items.push({id:String(p[0]),pet:String(p[1]),seed:p[2],location,value:p[3]});
      return {amount:pets?.amount,items};
    },
    older(pets,guard){
      if(!guard)return false;
      if(!pets||!Number.isFinite(pets.amount)||pets.amount<guard.amount)return true;
      const current=this.guard(pets).items,ranks={waiting:0,incubating:1,hatched:2};
      return guard.items.some(old=>{const p=current.find(p=>p.id===old.id);return !p||p.pet!==old.pet||p.seed!==old.seed||ranks[p.location]<ranks[old.location]||p.location===old.location&&(p.location==='hatched'&&p.value<old.value||p.location==='incubating'&&p.value>old.value);});
    },
    plan(pets,startWaiting=false){
      if(!pets?.eggs||!pets?.processes||!pets?.pets)return {error:'Waiting for complete egg data.'};
      const status=this.inspect(pets),changes=[],ids=[],seen=new Set(),processes=[];
      const valid=p=>Array.isArray(p)&&typeof p[0]==='string'&&typeof p[1]==='string'&&Object.hasOwn(window.__autoForgeCatalog?.pets||{},p[1])&&Number.isFinite(p[2]);
      for(const [slot,p]of Object.entries(pets.processes)){
        if(p===null)continue;
        const number=Number(slot)+(Array.isArray(pets.processes)?1:0);
        if(!Number.isInteger(number)||number<1||number>status.slots||!valid(p)||p.length!==4||!Number.isFinite(p[3])||p[3]<0||seen.has(p[0]))return {error:'Unexpected incubator data. No egg changes applied.'};
        seen.add(p[0]);
        processes[number-1]=p.slice();
        if(p[3]>1){changes.push({path:['pets','processes',slot,3],after:1});ids.push(p.slice(0,3));}
        processes[number-1][3]=1;
      }
      const waiting=[];
      for(const [id,p]of Object.entries(pets.eggs)){
        if(!valid(p)||p.length!==3||id!==p[0]||seen.has(id)||pets.pets[id])return {error:'Unexpected egg inventory. No egg changes applied.'};
        seen.add(id);waiting.push([id,p]);
      }
      let started=0;
      if(startWaiting){
        waiting.sort((a,b)=>Number(a[0])-Number(b[0]));
        for(let slot=1;slot<=status.slots&&started<waiting.length;slot++){
          if(processes[slot-1])continue;
          const [id,p]=waiting[started++];
          changes.push({path:['pets','eggs',id],after:undefined});processes[slot-1]=[...p,1];ids.push(p.slice());
        }
      }
      if(!changes.length)return {error:status.occupied?'Eggs in occupied slots are already ready. Collect them in the game to free slots.':status.waiting?'These eggs are in inventory, so their timers have not started. Use Start and finish waiting eggs, or press Hatch in the game first.':'No eggs are waiting or incubating.'};
      // Incubation slots are numeric Lua indices. JSON arrays preserve those indices,
      // including when the original empty collection arrived as an object.
      if(startWaiting){for(let i=changes.length-1;i>=0;i--)if(changes[i].path[1]==='processes')changes.splice(i,1);changes.push({path:['pets','processes'],after:processes});}
      return {changes,ids,started,waiting:status.waiting-started,ready:status.occupied+started};
    },
    confirmed(pets,ids){return !!ids?.length&&ids.every(([id,pet,seed])=>{const hatched=pets?.pets?.[id];if(hatched&&hatched[1]===pet&&hatched[2]===seed)return true;return Object.values(pets?.processes||{}).some(p=>p&&p[0]===id&&p[1]===pet&&p[2]===seed&&p[3]<=1);});}
  };
  const creatureLevels=window.__autoForgeCreatureLevels={
    plan(state,group,target){
      const catalog=window.__autoForgeCatalog,cap=group==='pets'?catalog.petLevelMax:catalog.mountLevelMax;
      const label=group==='pets'?'pet':'mount',entries=state?.[group]?.[group],changes=[];
      if(!Number.isSafeInteger(target)||target<1||target>cap)return {error:`Choose a ${label} level from 1 to ${cap}.`};
      if(!entries||typeof entries!=='object')return {error:`Waiting for owned ${label} data.`};
      let raised=0,skipped=0;
      for(const [id,entry]of Object.entries(entries)){
        const invalid=reason=>({error:`Cannot read ${label} #${id}: ${reason}.`});
        if(!Array.isArray(entry)||entry.length!==5||String(entry[0])!==id)return invalid('unexpected saved record');
        if(!Object.hasOwn(catalog[group],entry[1]))return invalid('unrecognized creature type');
        if(!Number.isSafeInteger(entry[3])||entry[3]<1||entry[3]>cap)return invalid(`level must be between 1 and ${cap}`);
        // Native merges add scaled burn values without rounding. Fractional progress is valid.
        if(!Number.isFinite(entry[4])||entry[4]<0||entry[4]>Number.MAX_SAFE_INTEGER)return invalid('invalid upgrade progress');
        if(entry[3]>=target){skipped++;continue;}
        raised++;changes.push({path:[group,group,id,3],after:target});
        if(target===cap&&entry[4]!==0)changes.push({path:[group,group,id,4],after:0});
      }
      if(!raised)return {error:skipped?`All owned ${group} are already at level ${target} or higher.`:group==='pets'?'No hatched pets are owned yet.':'No mounts are owned yet.'};
      return {changes,raised,skipped,target,group};
    }
  };
  window.__autoForgeTestLabFactory = function (changed) {
    const KEY = 'af-trainer-one-shot-v1';
    let account = null, state = null, baseline = null, appliedThisSession=false, recoveredThisSession=false, message = 'Waiting for an identified game snapshot.';
    const catalog=window.__autoForgeCatalog;
    const kinds=['timer','coins','quality','restore','campaign','campaign_level','forge_level','keys','resource','gear_level','gear_stash','skill_cards','egg_level','egg_add','egg_timers','egg_start_finish','research_timers','pet_level','mount_level','mount_add','mount_summon_level','skill_summon_level','research_tree','research_nodes','dungeon_level','arena_rank','skins_unlock'];
    const resources=['soft_currency','forge_currency','akey_currency','bkey_currency','ckey_currency','dkey_currency','skills_currency','tech_currency','pet_currency','mount_currency','arena_currency'];
    const integer=(x,min,max)=>Number.isSafeInteger(x)&&x>=min&&x<=max;
    const stashItems=o=>Object.hasOwn(o,'items')?o.items:[o];
    function optionsValid(kind,o) {
      if(kind==='research_nodes')return window.__autoForgeResearch?.shape(o)===true;
      if(kind==='campaign_level')return integer(o.age,1,catalog?.campaignLevels?.length||0)&&integer(o.level,1,catalog.campaignLevels[o.age-1]);
      if(kind==='forge_level')return integer(o.level,1,catalog?.forgeMax||0);
      if(kind==='arena_rank')return integer(o.league,1,catalog?.arenaLeagues?.length||0)&&integer(o.points,0,catalog.arenaLeagues[o.league-1].points-1);
      if(kind==='resource')return resources.includes(o.resource)&&integer(o.amount,1,Number.MAX_SAFE_INTEGER);
      if(kind==='gear_level')return integer(o.level,1,catalog?.gearLevelMax||100);
      if(kind==='gear_stash'){const items=stashItems(o);return !!catalog&&Array.isArray(items)&&items.length>0&&items.length<=(catalog.stashMax||4)&&items.every(v=>v&&Object.hasOwn(catalog.items,v.item)&&integer(v.level,1,catalog.gearLevelMax)&&integer(v.seed,-4294967295,4294967295));}
      if(kind==='skill_cards')return !!catalog&&Object.hasOwn(catalog.skills,o.skill)&&integer(o.amount,1,Number.MAX_SAFE_INTEGER);
      if(kind==='egg_level')return integer(o.level,1,catalog?.eggDungeonMax||0);
      if(kind==='egg_add')return !!catalog&&Object.hasOwn(catalog.pets,o.pet)&&integer(o.seed,-4294967295,4294967295);
      if(kind==='pet_level'||kind==='mount_level')return integer(o.level,1,kind==='pet_level'?catalog?.petLevelMax:catalog?.mountLevelMax);
      if(kind==='mount_add')return !!catalog?.mounts&&Object.hasOwn(catalog.mounts,o.mount);
      if(kind==='mount_summon_level'||kind==='skill_summon_level')return integer(o.level,1,kind==='mount_summon_level'?catalog?.mountSummonMax:catalog?.skillSummonMax);
      if(kind==='research_tree')return !!catalog?.research&&Object.hasOwn(catalog.research,o.tree)&&integer(o.level,1,5);
      if(kind==='dungeon_level')return !!catalog?.dungeons&&Object.hasOwn(catalog.dungeons,o.dungeon)&&integer(o.age,1,catalog.dungeons[o.dungeon].length)&&integer(o.level,1,catalog.dungeons[o.dungeon][o.age-1]);
      return true;
    }
    let record;
    try { record = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { record = {}; }
    const persist = () => { localStorage.setItem(KEY, JSON.stringify(record)); changed(); };
    const eligible=()=>!!account&&integer(state?.forge?.level,1,Number.MAX_SAFE_INTEGER)&&!!baseline;
    const skillCardLimit=(s,id)=>{
      const counters=['amount','count','upgrade'].map(k=>s?.skills?.[k]);
      const owned=s?.skills?.skills?.[id];if(owned)counters.push(owned[2]);
      return counters.every(n=>integer(n,0,Number.MAX_SAFE_INTEGER))?Number.MAX_SAFE_INTEGER-Math.max(...counters):0;
    };
    const report=(text,type='error')=>{message=text;record.outcome={account,text,type,at:Date.now()};try{persist();}catch{changed();}return false;};
    const clone=value=>JSON.parse(JSON.stringify(value));
    const validSave=s=>Number.isFinite(s?.core?.last)&&s.core.last>=0&&Number.isFinite(s?.player?.ingame_time)&&s.player.ingame_time>=0&&!!s?.inventory?.items&&!!s?.forge;
    // Same precedence as the game's storage selector. Never merge individual fields
    // from different saves, and never replay an increment to recover an old load.
    const compareSaves=(a,b)=>{
      for(const [x,y]of [[a.core.last,b.core.last],[a.player.ingame_time,b.player.ingame_time]])if(x!==y)return x>y?1:-1;
      const timestamp=s=>Number.isFinite(s.__ts)?s.__ts:Number.isFinite(s.timestamp)?s.timestamp:null;
      const x=timestamp(a),y=timestamp(b);
      if(x!==null&&y!==null&&x>0&&y>0&&x!==y)return x>y?1:-1;
      return 0;
    };
    const checkpoint=()=>record.checkpoint?.account===account&&validSave(record.checkpoint.snapshot)?record.checkpoint:null;
    function retain(snapshot){record.checkpoint={account,snapshot:clone(snapshot),at:Date.now()};}
    function matchesChange(snapshot,last){
      if(last.eggIds)return eggTools.confirmed(snapshot.pets,last.eggIds);
      return last.changes.every(c=>{if(last.kind==='research_nodes')return window.__autoForgeResearch?.level(snapshot,c.path[1],c.path[3])>=c.after[0];const v=get(snapshot,c.path);return typeof c.after==='number'&&c.after>=0&&c.before<=c.after?typeof v==='number'&&v>=c.after:JSON.stringify(v)===JSON.stringify(c.after);});
    }
    function identity(value) {
      if (!value || typeof value !== 'string') return null;
      // A local comparison tag, not an authentication credential or an anonymity guarantee.
      let h = 2166136261;
      for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
      return 'account-' + (h >>> 0).toString(16);
    }
    function bind(id) { if (id) account = id; }
    function observe(snapshot, meta) {
      state = snapshot;
      meta=meta || {progress:snapshot.core?.last,gameTime:snapshot.player?.ingame_time};
      baseline=Number.isFinite(meta.progress) && Number.isFinite(meta.gameTime)
        ? {progress:meta.progress,gameTime:meta.gameTime,observedAt:Date.now()} : null;
      const saved=checkpoint();
      if(meta.source==='Save'&&saved&&validSave(snapshot)&&compareSaves(snapshot,saved.snapshot)>=0){retain(snapshot);localStorage.setItem(KEY,JSON.stringify(record));}
      const pending=record.pending;
      if(pending?.account===account && baseline && pending.baseline && Date.now()<=pending.expires && baseline.progress>=pending.baseline.progress && baseline.gameTime>=pending.baseline.gameTime) {
        pending.baseline={...baseline};
        localStorage.setItem(KEY,JSON.stringify(record));
      }
      if(message==='Waiting for an identified game snapshot.'&&account&&baseline)message=record.outcome?.account===account?record.outcome.text:'Ready. Applying a change reloads the game automatically.';
      const last=record.last;
      if(meta?.source==='Save'&&last?.kind==='pet_level'&&last.account===account&&!last.petSaveChecked&&record.outcome?.type!=='verified'&&Date.now()-last.at<15*60*1000){
        const levels=last.changes.filter(c=>c.path[0]==='pets'&&c.path[1]==='pets'&&c.path[3]===3);
        if(levels.length){
          last.petSaveChecked=true;
          const matches=levels.every(c=>get(snapshot,c.path)>=c.after);
          const target=levels[0].after;
          if(matches)report(`The game's outgoing save contains the new pet levels (target ${target}). Server persistence will be checked on a later reload.`,'saved');
          else if(saved&&validSave(snapshot)&&compareSaves(saved.snapshot,snapshot)>0)report('The game sent an older save. Your newer pet levels are retained locally and will be restored on reload.','recovered');
          else report(`The game's outgoing save still contains lower or missing pet levels (target ${target}). The edited load was not kept. Apply again using this current save.`,'error');
        }
      }
      if(meta?.source==='Load'&&!appliedThisSession&&!recoveredThisSession&&record.last?.account===account&&Date.now()-record.last.at<15*60*1000){
        const matches=matchesChange(snapshot,record.last);
        if(matches)report(record.last.eggIds?'Finished egg timers confirmed in the server load. Collect ready eggs in the game.':record.last.kind==='research_nodes'?'Research upgrades confirmed in the server load.':'Confirmed in the server load: '+record.last.kind+'.','verified');
      }
    }
    function arm(kind,options={}) {
      const saved=checkpoint();
      if(saved&&validSave(state)&&compareSaves(saved.snapshot,state)>0){state=clone(saved.snapshot);baseline={progress:state.core.last,gameTime:state.player.ingame_time,observedAt:saved.at};}
      if (!account || !state) return report('Waiting for your account data. Let the game finish loading before applying a change.');
      if(!integer(state.forge?.level,1,Number.MAX_SAFE_INTEGER))return report('The game data format is not recognized. No changes applied.');
      if (kind === 'restore' && (!record.last || record.last.account !== account)) {
        return report('No matching backup for this account.');
      }
      if (!kinds.includes(kind)) return report('Unknown operation.');
      if(!optionsValid(kind,options)){
        if(kind==='dungeon_level'){
          const limits=catalog?.dungeons?.[options.dungeon];
          if(limits)return report(`Choose adventure age 1–${limits.length} and level 1–${limits[options.age-1]||limits[0]} for this adventure. Nothing was changed.`);
        }
        return report('Invalid target or amount. Check the displayed limits; nothing was changed.');
      }
      if(kind==='gear_stash'&&(!state.armory?.stash||typeof state.armory.stash!=='object'||Object.keys(state.armory.stash).length))return report('Clear the existing stash first. Equip or sell its items in the game.');
      if(kind==='resource'){
        const checked=resourceTools.plan(state,options.resource,options.amount);
        if(checked.error)return report(checked.error+' No changes applied.');
      }
      if(kind==='dungeon_level'){
        const current=state.dungs?.[options.dungeon];
        if(!current)return report('Adventure data has not loaded yet. Open Adventures in the game, then try again.');
        if(current.age>options.age||current.age===options.age&&current.level>=options.level)return report('Choose an adventure stage above your current progress. Lower targets are blocked.');
      }
      if(kind==='quality'&&state.forge.level>=(catalog?.forgeMax||5))return report('Forge is already at the maximum level.');
      if(!baseline)return report('Waiting for save metadata. Let the game save before trying again.');
      if(kind==='campaign_level'&&(options.age*100+options.level<=Math.max(state.core?.last||0,(state.core?.age||0)*100+(state.core?.level||0))))return report('Choose a campaign stage above your current progress. Lower targets are blocked.');
      if(kind==='forge_level'&&options.level<=state.forge.level)return report('Choose a forge level above your current level.');
      if(kind==='arena_rank'&&state.arena&&(options.league<state.arena.league||options.league===state.arena.league&&options.points<=state.arena.points))return report('Choose an Arena rank above your current rank. Lower targets are blocked.');
      if(kind==='research_nodes'){const checked=window.__autoForgeResearch.validate(state,options);if(checked.error)return report(checked.error);}
      if(kind==='skins_unlock'){const checked=window.__autoForgeSkins.plan(state);if(checked.error)return report(checked.error);if(!checked.added)return report('All available skin pieces are already unlocked.','info');}
      if(kind==='skill_cards'&&options.amount>skillCardLimit(state,options.skill))return report(`You can add up to ${skillCardLimit(state,options.skill)} cards without exceeding the exact whole-number limit. No changes applied.`);
      if(kind==='egg_timers'||kind==='egg_start_finish'){const checked=eggTools.plan(state.pets,kind==='egg_start_finish');if(checked.error)return report(checked.error);}
      if(kind==='pet_level'||kind==='mount_level'){const checked=creatureLevels.plan(state,kind==='pet_level'?'pets':'mounts',options.level);if(checked.error)return report(checked.error+' No changes applied.');}
      const beforeArm=clone(record);
      record.pending = { kind, options, account, baseline, expires: Date.now() + 5 * 60 * 1000 };
      record.pending.guard={forge:state.forge.level,arena:state.arena?{league:state.arena.league,points:state.arena.points}:null,balance:kind==='resource'?state.inventory?.items?.[options.resource]:null};
      if(kind==='skins_unlock')record.pending.guard.skinItems=window.__autoForgeSkins.plan(state).ids;
      if(['egg_add','egg_timers','egg_start_finish'].includes(kind))record.pending.guard.eggs=eggTools.guard(state.pets);
      retain(state);
      message = `${kind} armed for the next game load; expires in 5 minutes.`;
      record.outcome={account,text:'Change queued. Reloading the game…',type:'pending',at:Date.now()};
      try{persist();}catch{record=beforeArm;delete record.pending;return report('Browser storage could not save the operation. Allow storage for the game and try again.');}
      return true;
    }
    function cancel() { delete record.pending; report('Pending operation cancelled.','info'); }
    function get(obj, path) { return path.reduce((o,k) => o?.[k], obj); }
    function set(obj, path, value) {
      const target = path.slice(0,-1).reduce((o,k) => o?.[k], obj);
      if (!target || typeof target !== 'object') throw Error('State field missing');
      if (value === undefined) delete target[path.at(-1)]; else target[path.at(-1)] = value;
    }
    function transform(text, id) {
      bind(id);
      let plan = record.pending;
      if(!id)return text;
      let body; try { body = JSON.parse(text); } catch { return text; }
      let s = body?.data?.data;
      if (body.status !== 0 || !s?.forge || !s.inventory?.items) return text;
      const saved=checkpoint();
      if(saved&&validSave(s)){
        if(compareSaves(saved.snapshot,s)>0){
          s=body.data.data=clone(saved.snapshot);text=JSON.stringify(body);recoveredThisSession=true;
          if(!plan||plan.account!==id)report('Kept your newer local progress because the server returned an older save. Waiting for the game to save it.','recovered');
        }else{
          // The server has caught up, or has genuinely newer play on this account.
          delete record.checkpoint;try{localStorage.setItem(KEY,JSON.stringify(record));}catch{}
        }
      }
      if (!plan || plan.account !== id) return text;
      if (Date.now() > plan.expires) { cancel(); return text; }
      const opts=plan.options||{};
      if(!kinds.includes(plan.kind)||!optionsValid(plan.kind,opts)){cancel();return text;}
      if (!plan.baseline || !Number.isFinite(s.core?.last) || !Number.isFinite(s.player?.ingame_time)) {
        delete record.pending;message='Save-selection metadata missing; cancelled without changes.';persist();return text;
      }
      const stale=reason=>{delete record.pending;report(reason+' Wait for the game to save, then apply again. No changes applied.');return text;};
      const newerLoad=saved&&validSave(s)&&compareSaves(s,saved.snapshot)>0;
      if(!newerLoad&&s.core.last < plan.baseline.progress)return stale('The loaded campaign progress is older than your current progress.');
      if(!newerLoad&&s.player.ingame_time < plan.baseline.gameTime)return stale('The server returned an older save.');
      const guard=plan.guard;
      if(!newerLoad&&guard&&(s.forge.level<guard.forge||guard.arena&&(s.arena?.league<guard.arena.league||s.arena?.league===guard.arena.league&&s.arena?.points<guard.arena.points)))return stale('The loaded progression is behind your latest snapshot.');
      if(!newerLoad&&guard&&plan.kind==='resource'&&Number.isFinite(guard.balance)&&(s.inventory.items[opts.resource]??0)<guard.balance)return stale('The loaded balance is lower than the balance shown before Apply.');
      if(!newerLoad&&eggTools.older(s.pets,guard?.eggs))return stale('The loaded eggs are behind your latest snapshot.');
      const changes = [];
      let eggResult,creatureResult,skinResult;
      function change(path, value) { changes.push({ path, before: get(s,path), after:value }); }
      const reject=reason=>{delete record.pending;report(reason+' No changes applied.');return text;};
      const increase=(path,amount)=>{
        const before=get(s,path);
        if(!integer(before,0,Number.MAX_SAFE_INTEGER-amount))throw Error('Invalid counter');
        change(path,before+amount);
      };
      const increaseResource=(key,amount)=>{
        const checked=resourceTools.plan(s,key,amount);
        if(checked.error)return checked.error;
        change(['inventory','items',key],checked.after);
      };
      if(!integer(s.forge.level,1,Number.MAX_SAFE_INTEGER))return reject('Unexpected forge level.');
      try { if (plan.kind === 'timer') {
        if (!(s.forge.last > 0)) { delete record.pending; message='No active forge deadline in the loaded save; nothing changed.'; persist(); return text; }
        change(['forge','last'], Math.floor(typeof body.time === 'number' ? body.time : Date.now()/1000) - 1);
      } else if (plan.kind === 'coins') {
        const error=increaseResource('soft_currency',100);if(error)return reject(error);
      } else if (plan.kind === 'quality'||plan.kind==='forge_level') {
        const target=plan.kind==='quality'?Math.min(catalog?.forgeMax||5,s.forge.level+1):opts.level;
        if(s.forge.level>=target)return reject('Forge is already at or above the target.');
        change(['forge','level'], target);
        change(['forge','count'],0);change(['forge','upgrade'],0);change(['forge','last'],null);
      } else if(plan.kind==='campaign') {
        if(s.core.last>=314)return reject('Stage 3–15 access is already unlocked.');
        change(['core','age'],3);change(['core','level'],15);change(['core','last'],314);
      } else if(plan.kind==='campaign_level') {
        const target=opts.age*100+opts.level;
        if(!integer(s.core.age,1,catalog.campaignLevels.length)||!integer(s.core.level,1,catalog.campaignLevels[s.core.age-1]))return reject('Unexpected campaign stage.');
        if(target<=Math.max(s.core.last,s.core.age*100+s.core.level))return reject('Campaign is already at or above this target.');
        change(['core','age'],opts.age);change(['core','level'],opts.level);change(['core','last'],Math.max(s.core.last,target-1));
      } else if(plan.kind==='keys') {
        for(const key of resources.filter(k=>/^[abcd]key_currency$/.test(k))){const error=increaseResource(key,5);if(error)return reject(error);}
      } else if(plan.kind==='resource') {
        const error=increaseResource(opts.resource,opts.amount);if(error)return reject(error);
      } else if(plan.kind==='gear_level') {
        if(!s.armory?.equipment)return reject('No equipment state.');
        for(const [slot,item] of Object.entries(s.armory.equipment)) {
          if(!Array.isArray(item)||item.length<3||!integer(item[1],1,catalog.gearLevelMax))return reject('Unexpected equipment format.');
          if(item[1]<opts.level)change(['armory','equipment',slot,1],opts.level);
        }
      } else if(plan.kind==='gear_stash') {
        const stash=s.armory?.stash;
        if(!stash||typeof stash!=='object'||Object.keys(stash).length)return reject('Clear the existing stash first.');
        const items=stashItems(opts).map(v=>[String(v.item),v.level,v.seed]);
        items.sort((a,b)=>catalog.items[a[0]].age-catalog.items[b[0]].age);
        change(['armory','stash'],items);
      } else if(plan.kind==='skill_cards') {
        if(!s.skills?.skills)return reject('No skill state.');
        if(opts.amount>skillCardLimit(s,opts.skill))return reject('The loaded skill counters cannot hold this addition within the exact whole-number limit.');
        const owned=s.skills.skills[opts.skill];
        if(owned){
          if(!Array.isArray(owned)||owned.length!==3)return reject('Unexpected skill-card format.');
          increase(['skills','skills',opts.skill,2],opts.amount);
        }else change(['skills','skills',opts.skill],[0,1,opts.amount-1]);
        for(const k of ['amount','count','upgrade'])increase(['skills',k],opts.amount);
      } else if(plan.kind==='egg_level') {
        const c=s.dungs?.c;
        if(!c||c.age!==1||!integer(c.level,1,catalog.eggDungeonMax+1))return reject('Unexpected egg-adventure state.');
        if(c.level>=opts.level)return reject('Egg adventure is already at or above that level.');
        change(['dungs','c','level'],opts.level);
      } else if(plan.kind==='egg_add') {
        const pets=s.pets;
        if(!pets?.eggs||!pets?.pets||!pets?.processes||!integer(pets.amount,0,Number.MAX_SAFE_INTEGER-1))return reject('Unexpected pet state or no exact identifiers remain.');
        let next=pets.amount+1;
        const ids=new Set([...Object.keys(pets.eggs),...Object.keys(pets.pets),...Object.values(pets.processes).filter(Boolean).map(p=>String(p[0]))]);
        while(next<Number.MAX_SAFE_INTEGER&&ids.has(String(next)))next++;
        if(ids.has(String(next)))return reject('Pet identifier limit reached.');
        change(['pets','amount'],next);change(['pets','eggs',String(next)],[String(next),String(opts.pet),opts.seed]);
      } else if(plan.kind==='egg_timers'||plan.kind==='egg_start_finish') {
        eggResult=eggTools.plan(s.pets,plan.kind==='egg_start_finish');
        if(eggResult.error)return reject(eggResult.error);
        for(const c of eggResult.changes)change(c.path,c.after);
      } else if(plan.kind==='research_timers') {
        for(const tree of ['forge','power','skills','pets'])for(const [key,node]of Object.entries(s.technos?.[tree]?.nodes||{}))if(Array.isArray(node)&&node[1]>0)change(['technos',tree,'nodes',key,1],Math.floor(body.time||Date.now()/1000)-1);
      } else if(plan.kind==='pet_level'||plan.kind==='mount_level') {
        creatureResult=creatureLevels.plan(s,plan.kind==='pet_level'?'pets':'mounts',opts.level);
        if(creatureResult.error)return reject(creatureResult.error);
        for(const c of creatureResult.changes)change(c.path,c.after);
      } else if(plan.kind==='mount_add') {
        const mounts=s.mounts;
        if(!mounts?.mounts||!integer(mounts.amount,0,Number.MAX_SAFE_INTEGER-1))return reject('Unexpected mount state or no exact identifiers remain.');
        let next=mounts.amount+1;
        while(next<Number.MAX_SAFE_INTEGER&&Object.hasOwn(mounts.mounts,String(next)))next++;
        if(Object.hasOwn(mounts.mounts,String(next)))return reject('Mount identifier limit reached.');
        change(['mounts','amount'],next);
        change(['mounts','mounts',String(next)],[String(next),String(opts.mount),1,1,0]);
        increase(['mounts','count'],1);increase(['mounts','upgrade'],1);
      } else if(plan.kind==='mount_summon_level'||plan.kind==='skill_summon_level') {
        const group=plan.kind==='mount_summon_level'?'mounts':'skills',current=s[group],cap=group==='mounts'?catalog.mountSummonMax:catalog.skillSummonMax;
        const progressionCap=group==='mounts'?catalog.mountProgressionMax:cap;
        if(!current||!integer(current.level,1,progressionCap)||!integer(current.count,0,Number.MAX_SAFE_INTEGER)||!integer(current.upgrade,0,Number.MAX_SAFE_INTEGER))return reject('Unexpected summon state.');
        const repair=group==='mounts'&&current.level>cap&&opts.level===cap;
        if(current.level>cap&&!repair)return reject(`Mount odds are missing above level ${cap}; use Restore mount summon odds.`);
        if(current.level>=opts.level&&!repair)return reject('Summon level is already at or above the target.');
        change([group,'level'],opts.level);change([group,'count'],0);change([group,'upgrade'],0);
      } else if(plan.kind==='skins_unlock') {
        skinResult=window.__autoForgeSkins.plan(s);
        if(skinResult.error)return reject(skinResult.error);
        if(!newerLoad&&guard?.skinItems?.some(id=>!skinResult.ids.includes(id)))return stale('The loaded skin collection is older than your current collection.');
        if(!skinResult.added)return reject('All available skin pieces are already unlocked.');
        for(const c of skinResult.changes)change(c.path,c.after);
      } else if(plan.kind==='arena_rank') {
        const current=s.arena;
        if(!current||!integer(current.league,1,catalog.arenaLeagues.length)||!integer(current.points,0,Number.MAX_SAFE_INTEGER))return reject('Unexpected Arena rank.');
        if(current.league>opts.league||current.league===opts.league&&current.points>=opts.points)return reject('Arena rank is already at or above the target.');
        change(['arena','league'],opts.league);change(['arena','points'],opts.points);
      } else if(plan.kind==='research_nodes') {
        const checked=window.__autoForgeResearch.validate(s,opts);
        if(checked.error)return reject(checked.error);
        for(const c of checked.changes)change(c.path,c.after);
      } else if(plan.kind==='research_tree') {
        const current=s.technos?.[opts.tree],definition=catalog.research[opts.tree];
        if(!current?.nodes||!integer(current.layers,0,Math.max(...Object.values(definition).map(n=>n.layer))+1))return reject('Unexpected research state.');
        for(const [id,node]of Object.entries(current.nodes))if(!Object.hasOwn(definition,id)||!Array.isArray(node)||node.length!==2||!integer(node[0],0,definition[id].levels)||node[1]!==0)return reject('Finish active research before raising this tree.');
        for(const [id,node]of Object.entries(definition)) {
          const before=node.layer<current.layers?node.levels:current.nodes[id]?.[0]||0;
          const after=Math.min(opts.level,node.levels);
          if(before<after)change(['technos',opts.tree,'nodes',id],[after,0]);
        }
      } else if(plan.kind==='dungeon_level') {
        const current=s.dungs?.[opts.dungeon],limits=catalog.dungeons[opts.dungeon];
        if(!current||!integer(current.age,1,limits.length)||!integer(current.level,1,limits[current.age-1]+1))return reject('Unexpected adventure state.');
        if(current.age>opts.age||current.age===opts.age&&current.level>=opts.level)return reject('Adventure is already at or above the target.');
        change(['dungs',opts.dungeon,'age'],opts.age);change(['dungs',opts.dungeon,'level'],opts.level);
      } else if (plan.kind === 'restore' && record.last?.account === id) {
        for (const c of record.last.changes) change(c.path,c.before);
      }} catch {return reject('The loaded data did not match the expected field format.');}
      if (!changes.length)return reject('No applicable fields or active timers.');
      for (const c of changes) set(s,c.path,c.after);
      const beforeTime=s.player.ingame_time;
      const elapsed=Math.max(0,Math.ceil((Date.now()-plan.baseline.observedAt)/1000));
      // The game accrues play time in 30-second ticks; a local tick can precede its next server save.
      s.player.ingame_time=Math.max(beforeTime,plan.baseline.gameTime)+elapsed+32;
      const beforeApply=clone(record),previouslyApplied=appliedThisSession;
      record.last={account:id,kind:plan.kind,at:Date.now(),changes,selection:{beforeTime,afterTime:s.player.ingame_time}};
      if(eggResult)record.last.eggIds=eggResult.ids;
      appliedThisSession=true;
      delete record.pending;
      message=`Applied ${plan.kind} to the browser's loaded state. Gameplay and persistence are not yet verified.`;
      if(plan.kind==='resource'){const c=changes[0];message=`Applied ${opts.resource.replaceAll('_',' ')}: ${c.before??0} → ${c.after}.${Number.isFinite(c.before)&&!Number.isInteger(c.before)?' Fractional balance rounded up before adding.':''} Waiting for a game save; server persistence is not yet confirmed.`;}
      if(plan.kind==='research_nodes')message=`Applied upgrades to ${changes.length} research nodes. Waiting for a game save; server persistence is not yet confirmed.`;
      if(eggResult)message=`${eggResult.ready} egg${eggResult.ready===1?'':'s'} ready to collect in the game. ${eggResult.waiting} waiting in inventory${eggResult.waiting?'; collect ready eggs to free slots, then start the next batch':''}. Server persistence is not yet confirmed.`;
      if(creatureResult)message=`Edited incoming data for ${creatureResult.raised} ${creatureResult.raised===1?creatureResult.group.slice(0,-1):creatureResult.group} to level ${creatureResult.target}; ${creatureResult.skipped} already at or above target. Waiting for the game to use and save these levels.`;
      if(skinResult)message=`Added ${skinResult.added} skin pieces to the loaded collection. Choose skins in the game’s Skins screen. Server persistence is not yet confirmed.`;
      if(plan.kind==='gear_stash')message=`Created ${stashItems(opts).length} item(s) in the stash. Use Equip/Sell in the game. Server persistence is not yet confirmed.`;
      record.outcome={account:id,text:message,type:'applied',at:Date.now()};
      retain(s);
      try{persist();}catch{
        record=beforeApply;delete record.pending;appliedThisSession=previouslyApplied;
        report('Browser storage could not retain the changed save. No new change applied; free browser storage and try again.');
        return text;
      }
      return JSON.stringify(body);
    }
    return { identity, bind, observe, arm, cancel, transform,
      skillCardLimit:id=>skillCardLimit(state,id),
      resourcePreview:(key,amount)=>resourceTools.plan(state,key,amount),
      gearState:()=>({stash:clone(state?.armory?.stash??null),equipment:clone(state?.armory?.equipment??{}),age:state?.core?.age}),
      skinSummary:()=>{const p=window.__autoForgeSkins.plan(state);return {error:p.error,owned:p.owned,total:p.total,added:p.added};},
      previewCreatureLevels:(group,target)=>{const p=creatureLevels.plan(state,group,target);return {error:p.error,raised:p.raised,skipped:p.skipped,target:p.target};},
      summary: () => ({ identified:!!account, accountTag:account, eligible:eligible(), appliedThisSession, recoveredThisSession, message, outcome:record.outcome?.account===account?record.outcome:null, pending:record.pending ? {kind:record.pending.kind,options:record.pending.options,expires:record.pending.expires} : null,
        last:record.last?.account===account ? {kind:record.last.kind,at:record.last.at,changes:record.last.changes,selection:record.last.selection} : null }) };
  };
})();
