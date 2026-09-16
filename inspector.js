(() => {
  'use strict';
  const KEY = '__autoForgeReadOnlyInspector_v1';
  if (window[KEY]) return;
  const model = { version: '1.0.0', started: Date.now(), source: null, capturedAt: null,
    snapshot: null, previous: null, loads:[], serverOffset: null, events: [], totals: {}, errors: 0 };
  const MAX_BODY = 2 * 1024 * 1024;
  let host, panel, interval, stopped = false, activeView = 'Overview';
  const trainerViews=['Progress','Combat','PvP','Resources','Gear','Skills','Eggs','Mounts','Research','Adventures'];
  const PREFS='af-trainer-ui-v1';
  let preferences={};try{preferences=JSON.parse(localStorage.getItem(PREFS)||'{}')||{};}catch{}
  let advanced=preferences.advanced===true;
  const savePreferences=()=>{try{localStorage.setItem(PREFS,JSON.stringify({advanced,view:activeView,researchTree:preferences.researchTree}));}catch{}};
  const isTrainerView=()=>!!lab&&trainerViews.includes(activeView);
  const trainerForm={};
  let readouts=[];
  function liveText(parent,read,className='current-value'){const e=node('p',read(),parent);e.className=className;readouts.push(()=>{e.textContent=read();});return e;}
  function refreshReadouts(){for(const update of readouts)update();}
  const native=window.__autoForgeNativePatchFactory?.(()=>safeRun(render));
  const originalFetch = window.fetch;
  const xp = window.XMLHttpRequest.prototype;
  const originalOpen = xp.open, originalSend = xp.send;
  const requests = new WeakMap();
  const lab = window.__autoForgeTestLabFactory?.(() => safeRun(render));
  const gearEditor=window.__autoForgeGear?.createEditor({getSnapshot:()=>lab?.gearState(),getAccount:()=>lab?.summary().accountTag,isEligible:()=>lab?.summary().eligible,apply:applyChange});
  const researchEditor=window.__autoForgeResearch?.createEditor({getSnapshot:()=>model.snapshot,getAccount:()=>lab?.summary().accountTag,apply:applyChange,initialTree:preferences.researchTree,onSelect:tree=>{preferences.researchTree=tree;savePreferences();}});
  if(lab)activeView=trainerViews.includes(preferences.view)?preferences.view:'Progress';
  const originalHeader = xp.setRequestHeader, originalResponseHeader = xp.getResponseHeader;
  const responseTextDescriptor = Object.getOwnPropertyDescriptor(xp,'responseText');
  const responseDescriptor = Object.getOwnPropertyDescriptor(xp,'response');
  function accountFrom(headers) {
    try { return lab?.identity(new Headers(headers).get('X-Auth-Uid')); } catch { return null; }
  }
  const allowed = {
    inventory: ['items', 'charges', 'charge_cap', 'd'],
    forge: ['level', 'count', 'upgrade', 'last'], core: ['age', 'level', 'last'],
    arena: ['league', 'points', 'strikes', 'history'],
    skills: ['level', 'count', 'upgrade', 'amount', 'active_skills', 'skills'],
    armory: ['total', 'amount', 'equipment', 'stash'],
    pets: ['pets', 'eggs', 'processes', 'active_pets', 'add_slot'],
    mounts: ['level', 'count', 'upgrade', 'mounts', 'active_mounts'],
    technos: null, liveops: null, dungs:['a','b','c','d']
  };
  // Only numeric/boolean values from explicit game subsystems survive. No player profile, tokens or strings.
  function numericTree(value, depth = 0) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
    if (typeof value === 'boolean' || value === null) return value;
    if (!value || typeof value !== 'object' || depth > 12) return undefined;
    const out = Array.isArray(value) ? [] : Object.create(null);
    for (const [k, v] of Object.entries(value).slice(0, 5000)) {
      if (!/^[a-zA-Z0-9_.-]{1,80}$/.test(k) || ['__proto__','constructor','prototype'].includes(k) || /token|secret|auth|session|user|name|email|avatar|profile|signature|password/i.test(k)) continue;
      const safe = numericTree(v, depth + 1);
      if (safe !== undefined) out[k] = safe;
    }
    return out;
  }
  function sanitize(state) {
    if (!state || typeof state !== 'object' || !state.inventory?.items || !state.forge) return null;
    const out = Object.create(null);
    for (const [section, keys] of Object.entries(allowed)) {
      if (!state[section]) continue;
      if (!keys) out[section] = numericTree(state[section]);
      else {
        out[section] = Object.create(null);
        for (const key of keys) {
          const v = numericTree(state[section][key]);
          if (v !== undefined) out[section][key] = v;
        }
      }
    }
    return out;
  }
  function category(input) {
    try {
      const pathname = new URL(typeof input === 'string' ? input : input.url, location.href).pathname;
      if (/\/users\/publish\/?$/.test(pathname)) return 'Save';
      if (/\/users\/fetch\/?$/.test(pathname)) return 'Load';
      if (/\/events\/publish\/?$/.test(pathname)) return 'Telemetry';
      if (pathname.includes('/api/energy-help/')) return 'Hammer help';
      if (/\/api\/(products|orders|payments)/.test(pathname)) return 'Store';
      return null;
    } catch { return null; }
  }
  function safeRun(fn) { try { return fn(); } catch { model.errors++; } }
  async function bodyText(body) {
    if (typeof body === 'string') return body.length <= MAX_BODY ? body : '';
    if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
      if (body.byteLength > MAX_BODY) return '';
      return new TextDecoder().decode(body);
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob && body.size <= MAX_BODY) return body.text();
    return '';
  }
  function isPlayerLoad(text) {
    try { const body=JSON.parse(text); return body && typeof body==='object' && body.without_data !== true; }
    catch { return false; }
  }
  function inspect(text, kind, direction) {
    if (stopped || !text || text.length > MAX_BODY) return;
    let body;
    try { body = JSON.parse(text); } catch { return; }
    if (direction === 'response' && typeof body.time === 'number') model.serverOffset = body.time * 1000 - Date.now();
    const raw = kind === 'Save' && direction === 'request' ? body.data
      : kind === 'Load' && direction === 'response' ? body.data?.data : null;
    const snapshot = sanitize(raw);
    if (!snapshot) return;
    model.previous = model.snapshot;
    model.snapshot = snapshot;
    lab?.observe(raw,{progress:raw.core?.last,gameTime:raw.player?.ingame_time,source:kind});
    model.source = kind === 'Save' ? 'Outgoing save (not proof of server acceptance)' : lab ? 'Loaded response (may include an armed local test)' : 'Server load';
    model.capturedAt = Date.now();
    if(kind==='Load') {
      const status=lab?.summary();
      model.loads.unshift({at:model.capturedAt,modified:!!(status?.appliedThisSession||status?.recoveredThisSession),snapshot});
      model.loads.length=Math.min(4,model.loads.length);
    }
    render();
  }
  function start(kind) {
    const event = { kind, at: Date.now(), httpStatus: null, appStatus: null, durationMs: null };
    model.totals[kind] = (model.totals[kind] || 0) + 1;
    model.events.unshift(event); model.events.length = Math.min(100, model.events.length);
    return event;
  }
  function finish(event, status, text = '') {
    if (stopped) return;
    event.httpStatus = status;
    event.durationMs = Date.now() - event.at;
    if (text && text.length <= MAX_BODY) {
      try { const obj = JSON.parse(text); if (typeof obj.status === 'number') event.appStatus = obj.status; } catch {}
      inspect(text, event.kind, 'response');
    }
    render();
  }
  function fetchWrapper(input, init) {
    const result = Reflect.apply(originalFetch, this, arguments);
    const kind = category(input);
    const id = accountFrom(init?.headers || (typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined));
    if (kind === 'Save' || kind === 'Load') lab?.bind(id);
    let delivered = result;
    if (kind === 'Load' && lab && !stopped) {
      const requestBody = init && 'body' in init ? bodyText(init.body)
        : typeof Request !== 'undefined' && input instanceof Request ? input.clone().text() : Promise.resolve('');
      delivered = result.then(async response => {
        try {
          if (!isPlayerLoad(await requestBody)) return response;
          const text = await response.clone().text();
          if (stopped || text.length > MAX_BODY) return response;
          const modified = lab.transform(text,id);
          if (modified === text) return response;
          const headers = new Headers(response.headers);
          headers.delete('Content-Encoding');
          headers.set('Content-Length',String(new TextEncoder().encode(modified).length));
          const replacement = new Response(modified,{status:response.status,statusText:response.statusText,headers});
          return replacement;
        } catch { model.errors++; return response; }
      });
    }
    safeRun(() => {
      if (!kind || stopped) return;
      const event = start(kind);
      if (kind === 'Save') {
        if (init && 'body' in init) bodyText(init.body).then(t => safeRun(() => inspect(t, kind, 'request'))).catch(() => {});
        else if (typeof Request !== 'undefined' && input instanceof Request) input.clone().text().then(t => safeRun(() => inspect(t, kind, 'request'))).catch(() => {});
      }
      delivered.then(response => {
        safeRun(() => finish(event, response.status));
        if (kind === 'Load' || kind === 'Save') {
          safeRun(() => response.clone().text().then(t => safeRun(() => finish(event, response.status, t))).catch(() => {}));
        }
      }, () => safeRun(() => finish(event, 0)));
    });
    return delivered;
  }
  function openWrapper(method, url) {
    const previous = requests.get(this);
    for (const key of ['response','responseText']) {
      if (previous?.getters?.[key] === Object.getOwnPropertyDescriptor(this,key)?.get && previous?.getters?.[key]) delete this[key];
    }
    const result = Reflect.apply(originalOpen, this, arguments);
    safeRun(() => requests.set(this, { kind: category(String(url)) }));
    safeRun(() => {
      const info=requests.get(this);
      if (info.kind !== 'Load' || !lab || !responseDescriptor?.get || !responseTextDescriptor?.get) return;
      const xhr=this;
      function transformed() {
        if (stopped) return undefined;
        if (!info.playerLoad) return undefined;
        if (info.readDone) return info.value;
        const type=xhr.responseType;
        if (xhr.readyState !== 4) return undefined;
        let raw=type && type!=='text' ? responseDescriptor.get.call(xhr) : responseTextDescriptor.get.call(xhr);
        let text=type==='json'?JSON.stringify(raw):type==='arraybuffer'?new TextDecoder().decode(raw):raw;
        if (typeof text!=='string' || text.length>MAX_BODY) return undefined;
        const mod=lab.transform(text,info.account);
        info.readDone=true;info.modified=mod!==text;info.text=mod;
        info.value=type==='json'?JSON.parse(mod):type==='arraybuffer'?new TextEncoder().encode(mod).buffer:mod;
        return info.value;
      }
      info.getters = {response(){return transformed() ?? responseDescriptor.get.call(xhr);},responseText(){
        if (xhr.responseType && xhr.responseType!=='text') return responseTextDescriptor.get.call(xhr);
        return transformed() ?? responseTextDescriptor.get.call(xhr);
      }};
      for (const key of ['response','responseText']) Object.defineProperty(xhr,key,{configurable:true,get:info.getters[key]});
    });
    return result;
  }
  function headerWrapper(name,value) {
    const result=Reflect.apply(originalHeader,this,arguments);
    safeRun(()=>{const info=requests.get(this);if(info && /^x-auth-uid$/i.test(name)){info.account=lab?.identity(String(value));lab?.bind(info.account);}});
    return result;
  }
  function responseHeaderWrapper(name) {
    if (/^content-length$/i.test(name)) {
      safeRun(()=>{if(requests.get(this)?.kind==='Load') void this.response;});
      const info=requests.get(this);
      if (info?.modified) return String(new TextEncoder().encode(info.text).length);
    }
    return Reflect.apply(originalResponseHeader,this,arguments);
  }
  function sendWrapper(body) {
    const requestInfo=requests.get(this);
    if(requestInfo?.kind==='Load') {
      try { requestInfo.playerLoad=isPlayerLoad(typeof body==='string'?body:new TextDecoder().decode(body)); } catch { requestInfo.playerLoad=false; }
    }
    safeRun(() => {
      const info = requests.get(this); if (!info?.kind || stopped) return;
      const event = start(info.kind);
      if (info.kind === 'Save') bodyText(body).then(t => safeRun(() => inspect(t, info.kind, 'request'))).catch(() => {});
      this.addEventListener('loadend', () => safeRun(() => {
        let text = '';
        if (info.kind === 'Save' || info.kind === 'Load') {
          if (!this.responseType || this.responseType === 'text') text = this.responseText;
          else if (this.responseType === 'json') text = JSON.stringify(this.response);
          else if (this.responseType === 'arraybuffer') text = new TextDecoder().decode(this.response);
        }
        finish(event, this.status, text);
      }), { once: true });
    });
    return Reflect.apply(originalSend, this, arguments);
  }
  function stop() {
    stopped = true; clearInterval(interval);
    lab?.cancel();
    if (window.fetch === fetchWrapper) window.fetch = originalFetch;
    if (xp.open === openWrapper) xp.open = originalOpen;
    if (xp.send === sendWrapper) xp.send = originalSend;
    if (xp.setRequestHeader === headerWrapper) xp.setRequestHeader = originalHeader;
    if (xp.getResponseHeader === responseHeaderWrapper) xp.getResponseHeader = originalResponseHeader;
    native?.stop();
    host?.remove(); delete window[KEY];
  }
  function node(tag, text, parent) {
    const e = document.createElement(tag); if (text !== undefined) e.textContent = text;
    parent?.appendChild(e); return e;
  }
  const fmt = v => typeof v === 'number' ? v.toLocaleString() : '—';
  function duration(seconds) {
    if (!Number.isFinite(seconds)) return 'Unknown';
    const s = Math.max(0, Math.ceil(seconds));
    return `${Math.floor(s / 3600)}h ${Math.floor(s % 3600 / 60)}m ${s % 60}s`;
  }
  function table(parent, rows) {
    const t = node('table', undefined, parent);
    rows.forEach(([a,b]) => { const tr=node('tr',undefined,t); node('td',a,tr); node('td',String(b),tr); });
  }
  function applyChange(kind, options) {
    // Persist the validated one-shot plan before restarting this game frame.
    if (lab?.arm(kind, options) === true) location.reload();
  }
  function render(force = false) {
    if (!panel || stopped) return;
    const focused=panel.getRootNode().activeElement;
    if (!force && isTrainerView() && panel.contains(focused) && ['INPUT','SELECT','BUTTON'].includes(focused?.tagName)){refreshReadouts();return;}
    readouts=[];
    panel.classList.toggle('research-view',activeView==='Research');
    panel.replaceChildren();
    const s = model.snapshot;
    if(advanced||!lab)liveText(panel,()=>model.snapshot ? `${model.source} · ${Math.floor((Date.now()-model.capturedAt)/1000)}s ago` : 'Waiting for the game’s next save. Play normally; no extra request is sent.','snapshot-meta');
    if(isTrainerView()){
      const status=lab.summary(),cat=window.__autoForgeCatalog;
      const statusBox=liveText(panel,()=>lab.summary().message,'status-banner');
      readouts.push(()=>{const current=lab.summary(),kind=current.outcome?.type||'info';statusBox.dataset.kind=kind;statusBox.hidden=['Research','Gear'].includes(activeView)&&!(kind==='error'||kind==='pending'||kind==='applied'&&(activeView==='Research'?current.last?.kind?.startsWith('research'):['gear_stash','gear_level','skins_unlock'].includes(current.last?.kind)));});refreshReadouts();
      if(!['Research','Gear'].includes(activeView))liveText(panel,()=>{const v=model.snapshot;return v?`Current: stage ${v.core?.age??'—'}–${v.core?.level??'—'} · Forge ${fmt(v.forge?.level)} · Coins ${fmt(v.inventory?.items?.soft_currency)} · Hammers ${fmt(v.inventory?.items?.forge_currency)} · Arena ${window.__autoForgeCatalog?.arenaLeagues?.[v.arena?.league-1]?.name||v.arena?.league||'—'}, ${fmt(v.arena?.points)} points`:'Waiting for your current account data…';},'current-account');
      const button=(label,action)=>{const b=node('button',label,panel);b.onclick=()=>{action();render(true);panel.scrollTop=0;};return b;};
      if(status.pending)button('Cancel pending operation',()=>lab.cancel()).className='secondary-action';
      const select=(label,entries,current)=>{const l=node('label',label,panel),e=node('select',undefined,l);e.setAttribute('aria-label',label);for(const [value,text]of entries){const o=node('option',text,e);o.value=value;}if(trainerForm[label]!==undefined)e.value=trainerForm[label];else if(current!==undefined)e.value=String(current);e.onchange=()=>{trainerForm[label]=e.value;refreshReadouts();};return e;};
      const number=(label,value,min,max)=>{const l=node('label',label,panel),e=node('input',undefined,l);e.type='number';e.value=trainerForm[label]??value;e.min=min;e.max=max;e.setAttribute('aria-label',label);e.oninput=()=>{trainerForm[label]=e.value;refreshReadouts();};return e;};
      const levelRange=(section,index)=>{const values=Object.values(model.snapshot?.[section]?.[section]||{}).map(v=>v[index]).filter(Number.isFinite);return values.length?`${Math.min(...values)}–${Math.max(...values)}`:'none owned';};
      const ns=native?.summary();model.native=ns;
      if(activeView==='Combat'){
      node('h3','Live combat',panel);
      liveText(panel,()=>native?.status?.()||native?.summary().error||(!native?.summary().served?'Waiting for the game archive. Reload after installing the script.':`Native modules: HP ${native.summary().ready.hp?'ready':'waiting'}, skills ${native.summary().ready.cd?'ready':'waiting'}, Arena ${native.summary().ready.arena?'ready':'waiting'}.`));
      if(!status.eligible)node('p',status.identified?'Waiting for a complete account snapshot.':'Waiting for account identification. Open the game and let it finish loading.',panel);
      if(advanced)button('Refresh native status',render).className='secondary-action';
      if(!ns?.ready.hp||!ns?.ready.cd||!ns?.ready.arena||!ns?.ready.speed)button('Reload game to initialize combat',()=>location.reload()).className='secondary-action';
      const speed=select('Combat speed',[[1,'1× · Normal'],[2,'2×'],[3,'3×'],[5,'5×']],ns?.speed||1);
      speed.onchange=()=>{if(lab.summary().eligible)native?.set('speed',Number(speed.value));refreshReadouts();};
      const updateSpeed=()=>{const n=native?.summary();speed.value=String(n?.speed||1);speed.disabled=!n?.ready.speed||!lab.summary().eligible;speed.title=n?.ready.speed?'Changes immediately; resets to 1× on reload':native?.status?.()||'Waiting for the combat module';};readouts.push(updateSpeed);updateSpeed();
      node('p','Speeds up both sides, skills, waves, and the battle countdown. Changes immediately; resets to 1× on reload. Try 2× first; higher speeds use more CPU. Reward screens and menus keep their normal timing.',panel);
      for(const [key,label]of [['hp','Prevent player HP loss'],['cd','Reuse skills when inactive']]) {
        const b=button(`${label}: ${ns?.[key]?'ON':'OFF'}`,()=>{if(lab.summary().eligible)native?.set(key,!native.summary()[key]);});
        b.className='combat-toggle'; b.setAttribute('aria-pressed',String(!!ns?.[key]));
        const update=()=>{const n=native?.summary();b.disabled=!n?.ready[key]||!lab.summary().eligible;b.title=!lab.summary().eligible?'Waiting for current account data':n?.ready[key]?'':native?.status?.()||'Game module is not ready';};readouts.push(update);update();
      }
      node('p','Combat switches reset to OFF on reload. They do not block saving of rewards or progression. Cooldown mode retains the active-skill guard.',panel);
      }
      if(activeView==='Progress'){
      node('h3','Campaign',panel);
      if(cat?.campaignLevels){
        const age=select('Campaign age',cat.campaignLevels.map((n,i)=>[String(i+1),`Age ${i+1} · ${n} levels`]),s?.core?.age||1);
        const stage=number('Campaign level',s?.core?.level||1,1,cat.campaignLevels[Number(age.value)-1]);
        age.onchange=()=>{trainerForm['Campaign age']=age.value;stage.max=cat.campaignLevels[Number(age.value)-1];stage.value=Math.min(Number(stage.value),Number(stage.max));trainerForm['Campaign level']=stage.value;refreshReadouts();};
        liveText(panel,()=>`Current ${model.snapshot?.core?.age??'—'}–${model.snapshot?.core?.level??'—'} · Maximum ${cat.campaignLevels.length}–${cat.campaignLevels.at(-1)}. Only forward progress is allowed.`);
        button('Raise campaign stage',()=>applyChange('campaign_level',{age:Number(age.value),level:Number(stage.value)}));
      }
      node('h3','Forge',panel);
      if(cat?.forgeMax){const forgeLevel=number('Forge level',s?.forge?.level||1,1,cat.forgeMax);liveText(panel,()=>`Current forge ${fmt(model.snapshot?.forge?.level)} · Maximum ${cat.forgeMax}`);button('Raise forge level',()=>applyChange('forge_level',{level:Number(forgeLevel.value)}));}
      button('Finish active forge deadline',()=>applyChange('timer'));
      }
      if(activeView==='Adventures'){
      button('Add 5 of each adventure key',()=>applyChange('keys'));
      liveText(panel,()=>`Current keys: ${[['a','Portal'],['b','Horde'],['c','Nest'],['d','Lab']].map(([k,name])=>`${name} ${fmt(model.snapshot?.inventory?.items?.[k+'key_currency'])}`).join(' · ')}`);
      }
      if(activeView==='Resources'){
      node('h3','Resources',panel);
      const resource=select('Resource',[['soft_currency','Coins'],['forge_currency','Hammers'],['skills_currency','Skill summon currency'],['tech_currency','Technology points'],['pet_currency','Pet drop currency'],['mount_currency','Horseshoes (mount currency)'],['arena_currency','Arena tickets']]);
      const amount=number('Resource amount',100,1,Number.MAX_SAFE_INTEGER);
      liveText(panel,()=>{const p=lab.resourcePreview(resource.value,Number(amount.value));amount.max=p.max??Number.MAX_SAFE_INTEGER;return `Current ${fmt(p.current)}${p.rounded?` (rounded up to ${fmt(p.balance)})`:''} → after addition ${fmt(p.after)}`;});
      liveText(panel,()=>{const p=lab.resourcePreview(resource.value,Number(amount.value));return p.error||`Maximum addition ${fmt(p.max)} · numeric precision limit`;});
      button('Apply resource addition',()=>applyChange('resource',{resource:resource.value,amount:Number(amount.value)}));
      }
      if(activeView==='PvP'){
      node('h3','Arena',panel);
      liveText(panel,()=>native?.summary().ready.arena?'Opponent controls ready.':native?.status?.()||'Waiting for the Arena module.');
      if(!ns?.ready.arena)button('Reload game to initialize combat',()=>location.reload()).className='secondary-action';
      const weak=button(`Weaker Arena opponents: ${ns?.arena?'ON':'OFF'}`,()=>{if(lab.summary().eligible)native?.set('arena',!native.summary().arena);});
      weak.className='combat-toggle';weak.setAttribute('aria-pressed',String(!!ns?.arena));const updateWeak=()=>{weak.disabled=!native?.summary().ready.arena||!lab.summary().eligible;weak.title=!lab.summary().eligible?'Waiting for current account data':native?.summary().ready.arena?'':native?.status?.()||'';};readouts.push(updateWeak);updateWeak();
      node('p','Turn ON before Challenge. Newly generated opponents have at most 10% of your HP and damage, with no active skills, pets or mounts. Existing opponents are unchanged. Resets to OFF on reload.',panel);
      if(cat?.arenaLeagues){
        const leagues=cat.arenaLeagues;
        const rankLeague=select('Arena league',leagues.map((v,i)=>[String(i+1),v.name]),s?.arena?.league||1);
        const rankPoints=number('Points in selected league',s?.arena?.points||0,0,leagues[Number(rankLeague.value)-1].points-1);
        rankLeague.onchange=()=>{trainerForm['Arena league']=rankLeague.value;rankPoints.max=leagues[Number(rankLeague.value)-1].points-1;if(Number(rankPoints.value)>Number(rankPoints.max))rankPoints.value=rankPoints.max;trainerForm['Points in selected league']=rankPoints.value;};
        button('Raise Arena rank',()=>applyChange('arena_rank',{league:Number(rankLeague.value),points:Number(rankPoints.value)}));
        liveText(panel,()=>`Current ${leagues[model.snapshot?.arena?.league-1]?.name||'—'} · ${fmt(model.snapshot?.arena?.points)} points · ${fmt(model.snapshot?.inventory?.items?.arena_currency)} tickets`);
        node('p','Choose a higher league or more points within your current league. This reloads the game. Match history, tickets and rewards stay unchanged.',panel);
      }
      }
      if(activeView==='Gear'){
      gearEditor?.mount(panel);if(gearEditor)readouts.push(()=>gearEditor.refresh());
      const upgrade=node('details',undefined,panel);upgrade.className='gear-upgrade';node('summary','Raise equipped gear levels',upgrade);
      upgrade.open=!!trainerForm.gearUpgradeOpen;upgrade.ontoggle=()=>{trainerForm.gearUpgradeOpen=upgrade.open;};
      const gearLevel=number('Gear level',Math.max(1,...Object.values(s?.armory?.equipment||{}).map(v=>v[1]).filter(Number.isFinite)),1,cat.gearLevelMax);
      upgrade.appendChild(gearLevel.parentElement);
      liveText(upgrade,()=>`Equipped levels: ${Object.values(model.snapshot?.armory?.equipment||{}).map(v=>v[1]).filter(Number.isFinite).join(', ')||'—'}. Only lower-level items are raised.`);
      upgrade.appendChild(button('Raise equipped gear to this level',()=>applyChange('gear_level',{level:Number(gearLevel.value)})));
      if(cat){
        node('h3','Skins',panel);
        liveText(panel,()=>{const p=lab.skinSummary();return p.error||`${p.owned}/${p.total} skin pieces unlocked · ${p.added} available to add`;});
        button('Unlock all skin pieces',()=>applyChange('skins_unlock'));
        node('p','Unlocks the four skin sets in this game build. Choose pieces in the game’s Skins screen. Equipping pieces can also grant their normal stat bonuses.',panel);
      }
      }
      if(cat&&activeView==='Skills'){
        node('h3','Skill cards',panel);
        const skill=select('Skill card',Object.entries(cat.skills).map(([id,v])=>[id,`${v.name} · grade ${v.grade} · ${id}`]));
        const cards=number('Card count',10,1,Number.MAX_SAFE_INTEGER);
        liveText(panel,()=>{cards.max=lab.skillCardLimit(skill.value);return `Maximum addition ${fmt(Number(cards.max))} · whole-number precision limit`;});
        liveText(panel,()=>{const v=model.snapshot?.skills?.skills?.[skill.value];return v?`Owned: level ${v[1]}, ${v[2]} duplicate cards`:'Not owned yet';});
        button('Add selected skill cards',()=>applyChange('skill_cards',{skill:skill.value,amount:Number(cards.value)}));
        node('p','Use the native Upgrade and Equip buttons afterward. Missing cards are added at their normal initial level.',panel);
        const skillSummon=number('Skill summon level',s?.skills?.level||1,1,cat.skillSummonMax);
        liveText(panel,()=>`Current summon level ${fmt(model.snapshot?.skills?.level)} · Maximum ${cat.skillSummonMax}`);
        button('Raise skill summon level',()=>applyChange('skill_summon_level',{level:Number(skillSummon.value)}));
      }
      if(cat&&activeView==='Eggs'){
        node('h3','Level up all hatched pets',panel);
        const petLevel=number('Target pet level',Math.min(cat.petLevelMax,Math.max(0,...Object.values(s?.pets?.pets||{}).map(v=>v[3]).filter(Number.isFinite))+1),1,cat.petLevelMax);
        liveText(panel,()=>`Current pet levels ${levelRange('pets',3)} · Maximum ${cat.petLevelMax}`);
        liveText(panel,()=>{const p=lab.previewCreatureLevels('pets',Number(petLevel.value));return p.error||`${p.raised} pet${p.raised===1?'':'s'} will rise to ${p.target} · ${p.skipped} already at or above target`;});
        button('Raise all hatched pets',()=>applyChange('pet_level',{level:Number(petLevel.value)}));
        node('p','Raises the level of every collected pet below your target. Higher-level pets keep their levels. Starts one level above your strongest pet.',panel);
        node('h3','Eggs and hatching',panel);
        const pet=select('Pet egg',Object.entries(cat.pets).map(([id,v])=>[id,`${v.name} · grade ${v.grade} · ${id}`]));
        button('Add selected pet egg',()=>applyChange('egg_add',{pet:pet.value,seed:0}));
        liveText(panel,()=>{const p=model.snapshot?.pets;if(!p)return 'Waiting for egg data…';const e=window.__autoForgeEggs.inspect(p,(Date.now()+(model.serverOffset||0))/1000);return `${e.waiting} in inventory · ${e.incubating} incubating · ${e.ready} ready to collect · ${e.free}/${e.slots} slots free`;});
        node('p','Added eggs start in inventory. Start and finish moves waiting eggs into free incubation slots and skips their timers. Collect ready eggs in the game to free slots for the next batch.',panel);
        button('Start and finish waiting eggs',()=>applyChange('egg_start_finish'));
        button('Finish incubating eggs',()=>applyChange('egg_timers'));
      }
      if(cat&&activeView==='Mounts'){
        node('h3','Mounts',panel);
        const mountSummon=number('Mount summon level',Math.min(cat.mountSummonMax,s?.mounts?.level||1),1,cat.mountSummonMax);
        liveText(panel,()=>`Current summon level ${fmt(model.snapshot?.mounts?.level)} · Highest defined odds ${cat.mountSummonMax}`);
        button('Raise mount summon level',()=>applyChange('mount_summon_level',{level:Number(mountSummon.value)}));
        button('Restore mount summon odds',()=>applyChange('mount_summon_level',{level:cat.mountSummonMax}));
        node('p',`Mount odds stop at level ${cat.mountSummonMax}. If normal summoning advances beyond it, Restore returns to that level. It also raises lower summon levels to ${cat.mountSummonMax}.`,panel);
        const mount=select('Mount type',Object.entries(cat.mounts).map(([id,v])=>[id,`${v.name} · grade ${v.grade}`]));
        button('Add selected mount',()=>applyChange('mount_add',{mount:mount.value}));
        const mountLevel=number('Owned mount level',Math.max(1,...Object.values(s?.mounts?.mounts||{}).map(v=>v[3]).filter(Number.isFinite)),1,cat.mountLevelMax);
        liveText(panel,()=>`Owned mount levels ${levelRange('mounts',3)} · Maximum ${cat.mountLevelMax}`);
        button('Raise owned mounts to this level',()=>applyChange('mount_level',{level:Number(mountLevel.value)}));
        node('p','Add horseshoes in Resources. Summon level changes rarity odds; owned mount level changes its stats.',panel);
      }
      if(cat&&activeView==='Research'){
        researchEditor?.mount(panel);readouts.push(()=>researchEditor?.refresh());
      }
      if(cat&&activeView==='Adventures'){
        node('h3','Adventure progression',panel);
        const dungeon=select('Adventure',[['a','Portal of Ages'],['b','Undead Horde'],['c','Creature Nest (egg rewards)'],['d','Mutant Lab']]);
        const limits=()=>cat.dungeons[dungeon.value];
        const dungeonAge=select('Adventure age',limits().map((n,i)=>[i+1,`Age ${i+1} · ${n} levels`]),s?.dungs?.[dungeon.value]?.age||1),dungeonLevel=number('Adventure level',s?.dungs?.[dungeon.value]?.level||1,1,limits()[Number(dungeonAge.value)-1]||limits()[0]);
        const constrainDungeon=()=>{if(!dungeonAge.value)dungeonAge.value='1';dungeonAge.disabled=limits().length===1;dungeonLevel.max=limits()[Number(dungeonAge.value)-1];dungeonLevel.value=Math.min(Math.max(1,Number(dungeonLevel.value)||1),Number(dungeonLevel.max));trainerForm['Adventure age']=dungeonAge.value;trainerForm['Adventure level']=dungeonLevel.value;};
        const syncDungeon=()=>{const v=model.snapshot?.dungs?.[dungeon.value];dungeonAge.replaceChildren();limits().forEach((n,i)=>{const o=node('option',`Age ${i+1} · ${n} levels`,dungeonAge);o.value=i+1;});dungeonAge.value=String(v?.age||1);dungeonLevel.value=v?.level||1;constrainDungeon();refreshReadouts();};
        constrainDungeon();dungeon.onchange=()=>{trainerForm['Adventure']=dungeon.value;syncDungeon();};dungeonAge.onchange=()=>{constrainDungeon();refreshReadouts();};
        liveText(panel,()=>{const v=model.snapshot?.dungs?.[dungeon.value];return `Current adventure ${v?.age??'—'}–${v?.level??'—'} · Target age ${dungeonAge.value}: levels 1–${dungeonLevel.max}. Lower targets are blocked.`;});
        button('Raise selected adventure',()=>applyChange('dungeon_level',{dungeon:dungeon.value,age:Number(dungeonAge.value),level:Number(dungeonLevel.value)}));
        node('p','Creature Nest is the dungeon that drops eggs. Raising its stage changes egg rewards and enemy difficulty. To level up your pets, use Eggs → Raise all hatched pets. Nest has age 1 and stages 1–130; other adventures have ages 1–5 and stages 1–10.',panel);
      }
      if(!['Combat','PvP','Research'].includes(activeView))node('p','Applying changes reloads the game and may autosave. Values reflect the latest observed save or load.',panel);
    }else if (activeView === 'Runtime') {
      node('p','Reads exposed engine names and types only. Does not call game functions or inspect memory contents.',panel);
      node('button','Inspect runtime',panel).onclick=()=>{model.runtime=window.__autoForgeRuntimeDiagnostic?.();render();};
      node('pre',JSON.stringify(model.runtime || {status:'Press Inspect runtime after the game loads.'},null,2),panel);
    } else if (activeView === 'Tests' && lab) {
      const status=lab.summary();
      node('p','Applying a test automatically reloads the game. Changes may be saved automatically. Current account data must be loaded first.',panel);
      node('p','Tests also advance the loaded play-time marker enough to test local-save selection. Older campaign progress is rejected. This is not a save-isolated preview.',panel);
      node('p',status.message,panel).className='status-banner';
      for (const [name,kind] of [['1. Finish active forge deadline','timer'],['3. Add 100 coins','coins'],['4. Raise forge one level','quality'],['Restore last test fields','restore']]) {
        node('button',name,panel).onclick=()=>applyChange(kind);
      }
      node('button','Cancel pending test',panel).onclick=()=>lab.cancel();
      node('p','Skill cooldown controls are in Combat. They require the patched module to report loaded.',panel);
      node('p','Restoring fields replaces them with pre-test values, not an entire account backup. A completed forge may have further effects that are not undone.',panel);
      node('pre',JSON.stringify({pending:status.pending,last:status.last},null,2),panel);
    } else if (activeView === 'Network') {
      node('p','HTTP success alone does not prove game-state validation. Status 0 indicates a network failure.',panel);
      table(panel, model.events.slice(0,20).map(e=>[`${new Date(e.at).toLocaleTimeString()} ${e.kind}`, `${e.httpStatus ?? 'pending'} · app ${e.appStatus ?? '—'} · ${e.durationMs ?? '—'}ms`]));
    }else if(activeView==='Loads'){
      node('p','Recent loaded responses are retained separately from outgoing saves. Modified means a one-shot operation ran in this session.',panel);
      node('pre',JSON.stringify(model.loads,null,2),panel);
    } else if (activeView === 'Snapshot') {
      node('pre', JSON.stringify(s, null, 2) || 'No snapshot yet', panel);
    } else if (s && activeView === 'Skill data') {
      node('p','Saved stars / level / duplicate progress. Active battle cooldowns are not present in saves.',panel);
      table(panel,Object.entries(s.skills?.skills || {}).map(([id,v])=>[`Skill ${id}`,`${fmt(v[0] ?? v[1])} / ${fmt(Array.isArray(v)?v[1]:v[2])} / ${fmt(Array.isArray(v)?v[2]:v[3])}`]));
    } else if (s && activeView === 'Timers') {
      const now=(Date.now()+(model.serverOffset || 0))/1000;
      node('p',model.serverOffset === null ? 'Estimates use your clock until a server time is observed.' : 'Estimates use the latest observed server-time offset; they do not change the game clock.',panel);
      table(panel,[['Forge upgrade', s.forge?.last ? duration(s.forge.last-now) : 'No saved deadline'],['Last offline collection',s.inventory?.charges ? new Date(s.inventory.charges*1000).toLocaleString() : 'Unknown']]);
      node('p','Research and hatch records (saved timestamps):',panel);
      node('pre',JSON.stringify({research:s.technos,hatching:s.pets?.processes},null,2),panel);
    } else if (s) {
      table(panel,[['Forge level',fmt(s.forge?.level)],['Campaign',`${s.core?.age ?? '—'}–${s.core?.level ?? '—'}`],['Arena league / points',`${fmt(s.arena?.league)} / ${fmt(s.arena?.points)}`],['Observed saves',fmt(model.totals.Save || 0)]]);
      node('h3','Balances',panel);
      table(panel,Object.entries(s.inventory?.items || {}).map(([k,v])=>{
        const old=model.previous?.inventory?.items?.[k]; const d=typeof old==='number'?v-old:0;
        return [k.replaceAll('_',' '),`${fmt(v)}${d ? ` (${d>0?'+':''}${fmt(d)})` : ''}`];
      }));
    }
  }
  function mount() {
    if (stopped || !document.documentElement) return;
    host=document.createElement('div'); host.id='autoforge-readonly-inspector';
    const root=host.attachShadow({mode:'open'});
    node('style',window.__autoForgeTheme,root);
    const details=node('details',undefined,root); details.open=false; details.className='trainer-shell';
    const title=node('summary',undefined,details); title.className='trainer-title';
    node('span','⚒',title).className='forge-emblem';
    node('span','AutoForge',title).className='brand-name';
    node('span',lab?'TRAINER':'INSPECTOR',title).className='brand-tag';
    const nav=node('nav',undefined,details);nav.setAttribute('aria-label','Trainer sections');
    const diagnostics=node('nav',undefined,details);diagnostics.className='diagnostic-nav';diagnostics.setAttribute('aria-label','Advanced diagnostics');
    panel=node('section',undefined,details);
    const foot=node('footer',undefined,details);
    const exportSnapshot=()=>{
      const report={...model,native:native?.summary(),previous:undefined};
      const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));
      const a=node('a',undefined,root);a.href=url;a.download='autoforge-inspection.json';a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    };
    function navigation(){
      nav.replaceChildren();diagnostics.replaceChildren();foot.replaceChildren();
      diagnostics.hidden=!advanced&&!!lab;
      const addTab=(name,parent)=>{
        const b=node('button',name,parent);b.setAttribute('aria-pressed',String(name===activeView));
        b.onclick=()=>{activeView=name;savePreferences();navigation();render(true);panel.scrollTop=0;};
      };
      if(lab)trainerViews.forEach(name=>addTab(name,nav));else nav.hidden=true;
      if(advanced||!lab)['Overview','Skill data','Timers','Network','Snapshot','Loads',...(window.__autoForgeRuntimeDiagnostic?['Runtime']:[]),...(lab?['Tests']:[])].forEach(name=>addTab(name,diagnostics));
      const toggle=node('button',advanced?'Advanced: ON':'Advanced',foot);toggle.setAttribute('aria-pressed',String(advanced));
      toggle.onclick=()=>{advanced=!advanced;if(!advanced&&!trainerViews.includes(activeView)&&lab)activeView='Progress';savePreferences();navigation();render(true);panel.scrollTop=0;};
      if(advanced||!lab){node('button','Export snapshot',foot).onclick=exportSnapshot;node('button','Stop inspector',foot).onclick=stop;}
      node('span','v'+model.version,foot).className='version';
      details.classList.toggle('advanced',advanced);
    }
    navigation();
    document.documentElement.appendChild(host);render();
    interval=setInterval(()=>{if(isTrainerView())safeRun(refreshReadouts);else if(!['Tests','Runtime'].includes(activeView))safeRun(render);},1000);
  }
  window.fetch=fetchWrapper; xp.open=openWrapper; xp.send=sendWrapper;
  if(lab && originalHeader) xp.setRequestHeader=headerWrapper;
  if(lab && originalResponseHeader) xp.getResponseHeader=responseHeaderWrapper;
  window[KEY]={stop, getReport: () => JSON.parse(JSON.stringify({...model,native:native?.summary(),previous:undefined}))};
  if (document.documentElement) mount(); else document.addEventListener('DOMContentLoaded',mount,{once:true});
})();
