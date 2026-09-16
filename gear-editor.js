(() => {
  'use strict';
  const catalog=()=>window.__autoForgeCatalog;
  const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
  function roll(seed,age){
    const cat=catalog();if(!integer(seed,-4294967295,4294967295)||!integer(age,1,cat.gearEras.length))return null;
    const next=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<15;seed&=0x7fffffff;return seed/2147483648;};
    const keys=cat.gearAffixOrder.filter(k=>cat.gearAffixes[k]?.[age-1]?.chance>0);
    const total=keys.reduce((n,k)=>n+cat.gearAffixes[k][age-1].chance,0),pick=next()*total;
    let sum=0;
    for(const key of keys){const d=cat.gearAffixes[key][age-1];sum+=d.chance;if(pick<=sum)return {key,label:cat.gearAffixLabels[key],value:d.min+next()*(d.max-d.min),min:d.min,max:d.max};}
    return null;
  }
  function valid(item){return !!item&&Object.hasOwn(catalog().items,item.item)&&integer(item.level,1,catalog().gearLevelMax)&&integer(item.seed,-4294967295,4294967295);}
  function preview(selection){
    if(!valid(selection))return null;
    const item=catalog().items[selection.item],factor=1+selection.level/catalog().gearLevelMax;
    return {...selection,name:item.label||item.name,era:catalog().gearEras[item.age-1],slot:catalog().gearSlots[item.slot-1],slotId:item.slot,hp:item.hp*factor,damage:item.damage*factor,weapon:item.slot===5?`${item.ranged?'Ranged':'Melee'} · ${(item.animation||'one_hand').replaceAll('_',' ')} · ${item.interval}s base attack interval`:null,bonus:roll(selection.seed,item.age)};
  }
  const percent=v=>(v*100).toLocaleString(undefined,{maximumFractionDigits:3})+'%';
  const bonusText=b=>b?`${b.label} +${percent(b.value)}`:'Unknown bonus';
  const amount=v=>v.toLocaleString(undefined,{maximumFractionDigits:1});
  function createDraft(){
    let items=[];
    return {get items(){return items.map(v=>({...v}));},add(v){if(!valid(v)||items.length>=catalog().stashMax)return false;items.push({...v});return true;},remove(i){items.splice(i,1);},clear(){items=[];},plan(){return {items:items.map(v=>({...v}))};}};
  }
  function createEditor({getSnapshot,getAccount,isEligible,apply}){
    const draft=createDraft();let owner,form,hydrated=false,host,refreshCurrent=()=>{};
    const cat=catalog();
    function sync(){
      const account=getAccount(),s=getSnapshot(),ready=!!account&&s?.stash!=null&&s?.equipment!=null;
      if(owner===account&&form&&(hydrated||!ready))return false;
      owner=account;hydrated=ready;draft.clear();
      const owned=Object.values(s?.equipment||{}),ages=owned.map(v=>cat.items[v[0]]?.age).filter(Number.isFinite);
      form={age:Math.min(cat.gearEras.length,Math.max(1,...ages,s?.age||1)),slot:1,item:null,level:Math.max(1,...owned.map(v=>v[1]).filter(Number.isFinite)),bonus:'base_dmg',custom:false,seed:0};
      return true;
    }
    const available=()=>Object.entries(cat.items).filter(([,v])=>v.age===form.age&&v.slot===form.slot);
    function normalize(){
      const choices=available();if(!choices.some(([id])=>id===form.item))form.item=choices[0]?.[0];
      const bonuses=cat.gearBonusSeeds[form.age];if(!Object.hasOwn(bonuses,form.bonus))form.bonus=Object.keys(bonuses)[0];
    }
    const selection=()=>({item:form.item,level:Number(form.level),seed:form.custom?(String(form.seed).trim()===''?NaN:Number(form.seed)):cat.gearBonusSeeds[form.age][form.bonus]});
    function render(){
      if(!host)return;sync();normalize();host.replaceChildren();
      const node=(tag,text,parent=host)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;parent.appendChild(n);return n;};
      const row=()=>{const r=node('div');r.className='gear-fields';return r;};
      function select(parent,label,options,value,onchange){
        const l=node('label',label,parent),e=node('select',undefined,l);e.setAttribute('aria-label',label);
        for(const [id,name]of options){const o=node('option',name,e);o.value=String(id);}e.value=String(value);e.onchange=()=>onchange(e.value);return e;
      }
      const top=row();select(top,'Gear era',cat.gearEras.map((n,i)=>[i+1,n]),form.age,v=>{form.age=Number(v);render();});
      select(top,'Equipment slot',cat.gearSlots.map((n,i)=>[i+1,n]),form.slot,v=>{form.slot=Number(v);render();});
      select(host,'Item appearance',available().map(([id,v])=>[id,v.label||v.name]),form.item,v=>{form.item=v;refreshCurrent();});
      const stats=row(),label=node('label','New item level',stats),level=node('input',undefined,label);
      level.type='number';level.min=1;level.max=cat.gearLevelMax;level.value=form.level;level.setAttribute('aria-label','New item level');
      level.oninput=()=>{form.level=level.value;refreshCurrent();};
      const bonus=select(stats,'Bonus stat',cat.gearAffixOrder.filter(k=>Object.hasOwn(cat.gearBonusSeeds[form.age],k)).map(k=>[k,cat.gearAffixLabels[k]]),form.bonus,v=>{form.bonus=v;refreshCurrent();});bonus.disabled=form.custom;
      const card=node('div');card.className='gear-preview';card.setAttribute('aria-live','polite');
      const buttons=row(),add=node('button','Add to batch',buttons),create=node('button',`Create batch (${draft.items.length}/${cat.stashMax})`,buttons);
      const custom=node('details');custom.className='gear-custom';custom.open=form.custom;node('summary','Custom seed',custom);
      const seedLabel=node('label','Gear stat seed',custom),seed=node('input',undefined,seedLabel);seed.type='number';seed.min=-4294967295;seed.max=4294967295;seed.value=form.custom?form.seed:selection().seed;seed.setAttribute('aria-label','Gear stat seed');
      seed.oninput=()=>{form.custom=true;form.seed=seed.value;bonus.disabled=true;refreshCurrent();};
      custom.ontoggle=()=>{if(form.custom===custom.open)return;form.custom=custom.open;if(form.custom)form.seed=seed.value;bonus.disabled=form.custom;refreshCurrent();};
      const status=node('p');status.className='current-value';status.setAttribute('aria-live','polite');
      const batch=node('ol');batch.className='gear-batch';
      draft.items.forEach((v,i)=>{
        const p=preview(v),li=node('li',undefined,batch),description=node('div',undefined,li);
        node('strong',`${p.name} · Lv ${p.level}`,description);node('small',`${p.era} · ${bonusText(p.bonus)}`,description);
        const remove=node('button','×',li);remove.className='secondary-action';remove.setAttribute('aria-label',`Remove ${i+1}: ${p.name}`);remove.onclick=()=>{draft.remove(i);render();};
      });
      node('p','Item stats exclude research and loadout bonuses. Bonus selection chooses a high-roll seed. Use the game’s Equip/Sell buttons after creating the batch.').className='gear-note';
      add.onclick=()=>{if(draft.add(selection()))render();};
      create.onclick=()=>{if(isEligible()&&draft.items.length)apply('gear_stash',draft.plan());};
      refreshCurrent=()=>{
        const p=preview(selection()),s=getSnapshot(),stash=s?.stash;
        const empty=stash&&typeof stash==='object'&&!Object.keys(stash).length;
        card.replaceChildren();
        if(p){
          node('strong',`${p.name} · Lv ${p.level}`,card);
          node('div',`${p.hp?'HP '+amount(p.hp):''}${p.hp&&p.damage?' · ':''}${p.damage?'Damage '+amount(p.damage):''}`,card);
          node('div',bonusText(p.bonus),card);
          const details=node('details',undefined,card);details.open=!!form.previewOpen;node('summary','Details & equipped item',details);details.ontoggle=()=>{form.previewOpen=details.open;};
          node('div',`${p.era} · ${p.slot}`,details);if(p.weapon)node('div',p.weapon,details);node('small',`Seed ${p.seed}`,details);
          const owned=s?.equipment?.[p.slotId];
          if(owned){const current=preview({item:owned[0],level:owned[1],seed:owned[2]});if(current)node('small',`Equipped: ${current.name} · Lv ${current.level} · ${bonusText(current.bonus)}`,details);}
        }else node('span',`Enter a whole-number level from 1–${cat.gearLevelMax} and a valid seed.`,card);
        if(!form.custom)seed.value=selection().seed;
        add.disabled=!hydrated||!p||draft.items.length>=cat.stashMax;create.disabled=!draft.items.length||!empty||!isEligible();
        status.textContent=!stash?'Waiting for stash data.':!empty?`Stash has ${Object.keys(stash).length} item(s). Equip or sell them before applying.`:`${draft.items.length}/${cat.stashMax} queued · Stash is empty`;
      };
      refreshCurrent();
    }
    return {mount(parent){host=document.createElement('div');host.className='gear-editor';parent.appendChild(host);render();},refresh(){if(sync())render();else refreshCurrent();}};
  }
  window.__autoForgeGear={roll,preview,valid,createDraft,createEditor,bonusText};
})();
