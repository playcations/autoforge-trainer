(() => {
  'use strict';
  window.__autoForgeNativePatchFactory = function(changed) {
    const payload=window.__autoForgeNativePayload;
    const flags={hp:false,cd:false,arena:false,speed:1,ready:{},mark(name){if(['hp','cd','arena','speed'].includes(name)){flags.ready[name]=1;changed();}}};
    window.__afNative=flags;
    let stopped=false, served=0, error=null, seen=0;
    const fetch0=window.fetch, xp=window.XMLHttpRequest.prototype, open0=xp.open;
    const descriptor=Object.getOwnPropertyDescriptor(xp,'response');
    const requests=new WeakMap();
    const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
    const patches=payload.patches.map(p=>({...p,before:decode(p.before),after:decode(p.after)}));
    function target(value) {
      try { const u=new URL(typeof value==='string'?value:value.url,location.href);
        if(u.origin!=='https://autoforgegame-j101p8-0-0-19-webview.devvit.net'||!u.pathname.endsWith('/game0.arcd'))return false;
        seen++;
        if(u.pathname!=='/'+payload.build+'/game0.arcd'){error='This game build is not supported by the combat patch. Saved-state controls are separate.';changed();return false;}
        return true;
      } catch { return false; }
    }
    function apply(buffer) {
      if(stopped)return buffer;
      const bytes=new Uint8Array(buffer);
      if(bytes.byteLength!==payload.length || !patches.every(p=>p.before.length===p.after.length && p.before.every((v,i)=>bytes[p.offset+i]===v))) {
        error='Game archive differs from the inspected build; native patch skipped.';changed();return buffer;
      }
      const copy=bytes.slice();for(const p of patches)copy.set(p.after,p.offset);
      served++;changed();return copy.buffer;
    }
    function open(method,url) {
      const old=requests.get(this);
      if(old && Object.getOwnPropertyDescriptor(this,'response')?.get===old.get)delete this.response;
      const result=Reflect.apply(open0,this,arguments);
      if(!stopped && target(url) && descriptor?.get) {
        const xhr=this,info={done:false};
        info.get=function(){
          const raw=descriptor.get.call(xhr);
          if(stopped || xhr.readyState!==4 || xhr.responseType!=='arraybuffer' || xhr.status!==200)return raw;
          if(!info.done){info.value=apply(raw);info.done=true;}
          return info.value;
        };
        requests.set(this,info);Object.defineProperty(this,'response',{configurable:true,get:info.get});
      }
      return result;
    }
    function fetch(input,init) {
      const result=Reflect.apply(fetch0,this,arguments);
      if(stopped || !target(input))return result;
      return result.then(async response=>{
        if(response.status!==200)return response;
        try {const raw=await response.clone().arrayBuffer(),out=apply(raw);
          if(out===raw)return response;
          const headers=new Headers(response.headers);headers.delete('Content-Encoding');headers.set('Content-Length',String(out.byteLength));
          return new Response(out,{status:response.status,statusText:response.statusText,headers});
        }catch{error='Native archive patch could not be applied.';changed();return response;}
      });
    }
    window.fetch=fetch;xp.open=open;
    return {
      summary:()=>({build:payload.build,seen,served,error,ready:{...flags.ready},hp:flags.hp,cd:flags.cd,arena:flags.arena,speed:flags.speed}),
      status:()=>stopped?'Combat hooks stopped. Reload the game to enable them again.':error||(!served?(seen?'The game archive was requested but has not been patched yet.':'Waiting for the game archive. If the game is already running, use Reload game to initialize combat.'):`Combat modules: HP ${flags.ready.hp?'ready':'waiting'} · skills ${flags.ready.cd?'ready':'waiting'} · Arena ${flags.ready.arena?'ready':'waiting'} · speed ${flags.ready.speed?'ready':'waiting'}.`),
      set(name,value){
        if(!['hp','cd','arena','speed'].includes(name)||!flags.ready[name]||stopped)return false;
        if(name==='speed'){if(![1,2,3,5].includes(value))return false;flags.speed=value;}
        else flags[name]=Boolean(value);
        changed();return true;
      },
      stop(){stopped=true;flags.hp=false;flags.cd=false;flags.arena=false;flags.speed=1;if(window.fetch===fetch)window.fetch=fetch0;if(xp.open===open)xp.open=open0;changed();}
    };
  };
})();
