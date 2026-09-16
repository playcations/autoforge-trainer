(() => {
  'use strict';
  // Inspect descriptors only: do not invoke getters, engine callbacks or read memory contents.
  window.__autoForgeRuntimeDiagnostic = function () {
    function own(obj, key) {
      if (!obj || !['object','function'].includes(typeof obj)) return undefined;
      const d=Object.getOwnPropertyDescriptor(obj,key);
      return d && 'value' in d ? d.value : undefined;
    }
    function describe(name) {
      const value=own(window,name);
      if (!value) return {name,available:false};
      const descriptors=Object.getOwnPropertyDescriptors(value);
      const functions=Object.entries(descriptors).filter(([,d])=>'value' in d && typeof d.value==='function').map(([k])=>k).sort();
      const objects=Object.entries(descriptors).filter(([,d])=>'value' in d && d.value && typeof d.value==='object').map(([k])=>k).sort();
      return {name,available:true,functions,objects,accessorsSkipped:Object.values(descriptors).filter(d=>!('value' in d)).length};
    }
    const mod=own(window,'Module');
    const heap=own(mod,'HEAPU8');
    const memory=own(mod,'wasmMemory');
    return {at:new Date().toISOString(),mode:'Read-only descriptors; no engine calls or memory contents',
      engineStarted:own(mod,'calledRun')===true,
      byteHeapExposed:typeof Uint8Array!=='undefined' && heap instanceof Uint8Array,
      wasmMemoryExposed:typeof WebAssembly!=='undefined' && memory instanceof WebAssembly.Memory,
      surfaces:['Module','JsToDef','wasmExports','Lua','lua','Defold'].map(describe)};
  };
})();
