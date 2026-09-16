(() => {
  'use strict';
  const list=value=>{
    if(Array.isArray(value))return value;
    if(value&&typeof value==='object'&&!Object.keys(value).length)return [];
    return null;
  };
  window.__autoForgeSkins={
    plan(state){
      const definitions=window.__autoForgeCatalog?.skins,sets=state?.sets,changes=[];
      if(!definitions||!sets?.items||!sets.equipment||!sets.hidden)return {error:'Waiting for the skin collection. Open the game’s Skins screen and let the game save.'};
      const known=new Set(),owned=new Set();
      for(const [key,value]of Object.entries(sets.items)){
        const slot=Number(key)+(Array.isArray(sets.items)?1:0),ids=list(value);
        if(!Number.isInteger(slot)||slot<1||slot>9||!ids||ids.some(id=>typeof id!=='string'||!/^\d+$/.test(id)||definitions[id]&&definitions[id].slot!==slot))return {error:'Unrecognized skin collection format. No skins changed.'};
        for(const id of ids){owned.add(id);if(definitions[id])known.add(id);}
      }
      for(let slot=1;slot<=9;slot++){
        const key=Array.isArray(sets.items)?slot-1:String(slot),current=list(sets.items[key]??{});
        const missing=Object.keys(definitions).filter(id=>definitions[id].slot===slot&&!owned.has(id));
        if(missing.length)changes.push({path:['sets','items',key],after:[...current,...missing]});
      }
      return {changes,ids:[...owned],owned:known.size,total:Object.keys(definitions).length,added:Object.keys(definitions).length-known.size};
    }
  };
})();
