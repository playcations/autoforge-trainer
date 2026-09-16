(() => {
  'use strict';
  const names={forge:'Forge',power:'Power',skills:'Skills',pets:'Pets'};
  const catalog=()=>window.__autoForgeCatalog.research;
  const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
  function level(state,tree,id){
    const node=catalog()[tree][id],current=state?.technos?.[tree];
    if(!current?.nodes||!integer(current.layers,0,100))return null;
    return node.layer<current.layers?node.levels:current.nodes[id]?.[0]??0;
  }
  function busy(state,tree){return Object.values(state?.technos?.[tree]?.nodes||{}).some(n=>n?.[1]>0);}
  function shape(options){
    if(!object(options?.trees)||!Object.keys(options.trees).length||!object(options.observed))return false;
    return Object.entries(options.trees).every(([tree,targets])=>Object.hasOwn(names,tree)&&object(targets)&&Object.keys(targets).length>0&&
      Object.entries(targets).every(([id,target])=>Object.hasOwn(catalog()[tree],id)&&integer(target,1,catalog()[tree][id].levels))&&
      object(options.observed[tree])&&Object.entries(catalog()[tree]).every(([id,node])=>integer(options.observed[tree][id],0,node.levels)));
  }
  function validate(state,options){
    if(!shape(options))return {error:'Invalid research selection.'};
    const changes=[];
    for(const [tree,targets]of Object.entries(options.trees)){
      const current=state?.technos?.[tree],definitions=catalog()[tree];
      if(!current?.nodes||!integer(current.layers,0,Math.max(...Object.values(definitions).map(n=>n.layer))+1))return {error:`Waiting for ${names[tree]} research data.`};
      for(const [id,node]of Object.entries(current.nodes))if(!Object.hasOwn(definitions,id)||!Array.isArray(node)||node.length!==2||!integer(node[0],0,definitions[id].levels)||!Number.isFinite(node[1])||node[1]<0)return {error:'Unexpected research data.'};
      if(busy(state,tree))return {error:`Finish and collect active ${names[tree]} research before applying upgrades.`};
      for(const id of Object.keys(definitions))if(level(state,tree,id)<options.observed[tree][id])return {error:'Loaded research is older than the displayed levels. Wait for the game to save and try again.'};
      for(const [id,target]of Object.entries(targets)){
        const before=level(state,tree,id);
        if(target<=before)continue;
        if(definitions[id].reqs.some(req=>Math.max(level(state,tree,req),targets[req]||0)<1))return {error:`Unlock the prerequisites for ${definitions[id].name||id} first.`};
        changes.push({path:['technos',tree,'nodes',id],after:[target,0]});
      }
    }
    return changes.length?{changes}:{error:'These upgrades are already applied. Nothing to change.'};
  }
  function createDraft(){
    let targets={},history=[];
    const copy=()=>JSON.parse(JSON.stringify(targets));
    const preview=(state,tree,id)=>Math.max(level(state,tree,id)??0,targets[tree]?.[id]||0);
    return {
      preview,
      add(state,tree,id){
        if(!Object.hasOwn(names,tree)||!Object.hasOwn(catalog()[tree],id))return false;
        const node=catalog()[tree][id],current=level(state,tree,id);
        if(current===null||busy(state,tree)||preview(state,tree,id)>=node.levels||node.reqs.some(req=>preview(state,tree,req)<1))return false;
        history.push(copy());(targets[tree]??={})[id]=preview(state,tree,id)+1;return true;
      },
      undo(){if(history.length)targets=history.pop();},
      reset(){targets={};history=[];},
      get canUndo(){return history.length>0;},
      plan(state){
        const trees={},observed={};
        for(const [tree,nodes]of Object.entries(targets))for(const [id,target]of Object.entries(nodes))if(target>(level(state,tree,id)??0)){
          (trees[tree]??={})[id]=target;
          observed[tree]??=Object.fromEntries(Object.keys(catalog()[tree]).map(key=>[key,level(state,tree,key)]));
        }
        return {trees,observed};
      }
    };
  }
  function createEditor({getSnapshot,getAccount,apply,initialTree='forge',onSelect=()=>{}}){
    const draft=createDraft();let selected=Object.hasOwn(names,initialTree)?initialTree:'forge',account=null,holder,signature='',helpOpen=false;
    const element=(tag,text,parent,className)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;parent?.appendChild(e);return e;};
    function refresh(force=false){
      if(!holder?.isConnected)return;
      const nextAccount=getAccount(),state=getSnapshot();
      if(account!==nextAccount){draft.reset();account=nextAccount;}
      const plan=draft.plan(state),nextSignature=JSON.stringify([state?.technos,plan,selected,account]);
      if(!force&&signature===nextSignature)return;signature=nextSignature;
      const scroll=holder.querySelector('.research-scroll')?.scrollTop||0;holder.replaceChildren();
      const header=element('div',undefined,holder,'research-header');
      const top=element('div',undefined,header,'research-topline');
      const tabs=element('div',undefined,top,'research-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Research tree sub-tabs');
      const selectTree=tree=>{selected=tree;onSelect(tree);refresh(true);const scroller=holder.querySelector('.research-scroll');if(scroller)scroller.scrollTop=0;};
      for(const [tree,name]of Object.entries(names)){
        const b=element('button',name,tabs);b.id='af-research-tab-'+tree;b.setAttribute('role','tab');b.setAttribute('aria-selected',String(tree===selected));b.setAttribute('aria-controls','af-research-tree-panel');b.tabIndex=tree===selected?0:-1;
        b.onclick=()=>selectTree(tree);
        b.onkeydown=e=>{const keys=Object.keys(names),index=keys.indexOf(tree);let next;if(e.key==='ArrowRight')next=keys[(index+1)%keys.length];if(e.key==='ArrowLeft')next=keys[(index+keys.length-1)%keys.length];if(e.key==='Home')next=keys[0];if(e.key==='End')next=keys.at(-1);if(next){e.preventDefault();selectTree(next);holder.querySelector('#af-research-tab-'+next)?.focus();}};
      }
      const help=element('details',undefined,top,'research-help');help.open=helpOpen;help.ontoggle=()=>{helpOpen=help.open;};
      const helpToggle=element('summary','?',help);helpToggle.setAttribute('aria-label','Research help');
      element('p','Click a node to queue +1. Gold = queued, green = maxed, gray = locked. Parents need level 1. Apply saves the queued batch and reloads. Undo removes the last click; Reset clears the draft. Scroll the tree to see more nodes.',help);
      const pending=Object.entries(plan.trees).flatMap(([tree,nodes])=>Object.entries(nodes).map(([id,target])=>({tree,id,target,before:level(state,tree,id)})));
      const count=pending.reduce((sum,n)=>sum+n.target-n.before,0);
      const actions=element('div',undefined,header,'research-actions');
      const applyButton=element('button',count?`Apply +${count}`:'Apply',actions);applyButton.setAttribute('aria-label',count?`Apply ${count} research upgrades`:'Apply research upgrades');applyButton.title=count?`${count} levels queued across ${pending.length} nodes`:'Click tree nodes to queue upgrades';
      const checked=count?validate(state,plan):null;applyButton.disabled=!account||!count||!!checked?.error;applyButton.onclick=()=>apply('research_nodes',draft.plan(getSnapshot()));
      const undo=element('button','Undo',actions);undo.disabled=!draft.canUndo;undo.onclick=()=>{draft.undo();refresh(true);};
      const reset=element('button','Reset',actions);reset.disabled=!draft.canUndo;reset.onclick=()=>{draft.reset();refresh(true);};
      if(checked?.error)element('p',checked.error,header,'research-warning');
      const timerCount=Object.keys(names).filter(tree=>busy(state,tree)).length;
      if(timerCount){const timer=element('button','Finish timers',actions,'research-timer');timer.setAttribute('aria-label','Finish active research timers');timer.disabled=!account||count>0;
      timer.title=count?'Apply or reset queued upgrades before reloading to finish timers.':'Finish active research timers';timer.onclick=()=>apply('research_timers');}
      if(busy(state,selected))element('p','Finish and collect active research before editing this tree.',header,'research-warning');
      if(!state?.technos?.[selected]){element('p','Waiting for this tree’s saved levels.',holder);return;}
      const definitions=catalog()[selected],layers={};
      for(const [id,node]of Object.entries(definitions))(layers[node.layer]??=[]).push(id);
      const positions={},nodeHeight=48,step=62,height=(Math.max(...Object.keys(layers).map(Number))+1)*step;
      const scroller=element('div',undefined,holder,'research-scroll');
      const tree=element('div',undefined,scroller,'research-tree');tree.id='af-research-tree-panel';tree.setAttribute('role','tabpanel');tree.setAttribute('aria-labelledby','af-research-tab-'+selected);tree.style.height=height+'px';
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox',`0 0 300 ${height}`);svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');tree.appendChild(svg);
      for(const [row,ids]of Object.entries(layers))ids.forEach((id,i)=>{positions[id]={x:300*(i+.5)/ids.length,y:Number(row)*step,width:Math.min(144,300/ids.length-6)};});
      for(const [id,node]of Object.entries(definitions))for(const req of node.reqs){
        const from=positions[req],to=positions[id],line=document.createElementNS('http://www.w3.org/2000/svg','path');
        line.setAttribute('d',`M ${from.x} ${from.y+nodeHeight} L ${from.x} ${from.y+nodeHeight+7} L ${to.x} ${to.y-7} L ${to.x} ${to.y}`);
        line.setAttribute('class',draft.preview(state,selected,req)>=1?'unlocked':'');svg.appendChild(line);
      }
      for(const [id,node]of Object.entries(definitions)){
        const current=level(state,selected,id),target=draft.preview(state,selected,id),queued=target>current,pos=positions[id];
        const locked=node.reqs.some(req=>draft.preview(state,selected,req)<1),maxed=target>=node.levels,active=busy(state,selected);
        const b=element('button',undefined,tree,'research-node');b.dataset.state=queued?'queued':maxed?'maxed':locked?'locked':'available';
        b.style.left=(pos.x/3)+'%';b.style.top=pos.y+'px';b.style.width=(pos.width/3)+'%';
        b.disabled=!account||current===null||locked||maxed||active;
        element('span',node.name||node.stat.replaceAll('_',' '),b,'research-node-name');
        element('span',`#${id} · `+(queued?`${current}→${target}/${node.levels}`:`${current??'—'}/${node.levels}`)+(maxed&&!queued?' ✓':''),b,'research-node-level');
        b.setAttribute('aria-label',`${names[selected]} node ${id}: ${node.name||node.stat}. Current ${current??'unknown'} of ${node.levels}${queued?`, queued ${target}`:''}`);
        b.title=(node.name||node.stat)+' — '+(active?'Finish active research first.':locked?'Requires '+node.reqs.map(req=>`#${req} ${definitions[req].name}`).join(' and ')+' at level 1.':maxed?'Maximum level.':'Click to queue one level.');
        b.onclick=()=>{draft.add(getSnapshot(),selected,id);refresh(true);};
      }
      scroller.scrollTop=scroll;
    }
    return {mount(parent){holder=element('div',undefined,parent,'research-editor');signature='';refresh(true);},refresh};
  }
  window.__autoForgeResearch={level,busy,shape,validate,createDraft,createEditor};
})();
