(() => {
  'use strict';
  window.__autoForgeTheme = `
    :host {
      --ink:#35303d; --muted:#665e6b; --paper:#eeeee4; --edge:#49404e;
      --purple:#8d7fb2; --blue:#43b3f1; --gold:#ffd575;
      position:fixed; top:8px; right:8px; z-index:2147483647;
      color:var(--ink); font:13px/1.45 "Trebuchet MS",Arial,sans-serif;
      color-scheme:light; text-align:left;
    }
    *,*::before,*::after { box-sizing:border-box; }
    [hidden] { display:none !important; }
    details.trainer-shell {
      --panel-height:min(360px,46vh,calc(100dvh - 125px));
      width:min(332px,calc(100vw - 16px)); background:var(--paper);
      border:2px solid var(--edge); border-radius:13px;
      box-shadow:0 4px 0 #302937,0 10px 24px #17131e55,inset 0 0 0 3px #fffaf0;
      overflow:hidden;
    }
    .trainer-title {
      position:relative; display:flex; align-items:center; gap:9px;
      min-height:31px; padding:3px 8px; cursor:pointer; list-style:none;
      background:linear-gradient(#a698c9,#8274a8); color:#fff;
      border-bottom:2px solid var(--edge); box-shadow:inset 0 2px 0 #d4c9ec;
      user-select:none;
    }
    .trainer-title::-webkit-details-marker { display:none; }
    .trainer-title::after {
      content:'−'; margin-left:auto; display:grid; place-items:center;
      width:21px; height:21px; border:1.5px solid var(--edge); border-radius:5px;
      background:#e8e1f3; color:var(--ink); font:bold 19px/1 Arial,sans-serif;
      box-shadow:0 2px 0 #53465f;
    }
    details:not([open])>.trainer-title { border-bottom:0; }
    details:not([open])>.trainer-title::after { content:'+'; }
    .forge-emblem {
      display:grid; place-items:center; flex:none; width:23px; height:23px;
      border:2px solid #4a3c51; border-radius:9px; background:var(--gold);
      color:#51445d; font-size:19px; line-height:1; box-shadow:inset 0 2px 0 #fff0b8;
    }
    .brand-name { font-size:18px; font-weight:900; letter-spacing:-.6px;
      text-shadow:1px 1px 0 #463650,-1px -1px 0 #463650,1px -1px 0 #463650,-1px 1px 0 #463650,0 2px 0 #463650; }
    .brand-tag {
      padding:2px 6px; border:1px solid #514255; border-radius:5px;
      background:#f7d583; color:#493b4f; font-size:9px; font-weight:900; letter-spacing:.7px;
    }
    nav {
      display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:3px;
      padding:4px; background:#dedbd0; border-bottom:1px solid #b3acaa;
      box-shadow:inset 0 1px 0 #fff8e7;
    }
    button,input,select { font:inherit; }
    button {
      cursor:pointer; color:#fff; font-weight:800; line-height:1.3;
      border:1.5px solid var(--edge); border-radius:7px;
      padding:6px 9px; background:linear-gradient(#65c5f8,var(--blue));
      box-shadow:inset 0 2px 0 #c6edff,0 2px 0 #766b77;
      text-shadow:0 1px 1px #254f6d; overflow-wrap:anywhere;
      transition:filter .12s,transform .12s,box-shadow .12s;
    }
    button:hover:not(:disabled) { filter:brightness(1.08); }
    button:active:not(:disabled) { transform:translateY(2px); box-shadow:inset 0 1px 0 #ffffff80; }
    button:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible {
      outline:3px solid #724ec4; outline-offset:3px;
    }
    nav button {
      padding:3px 1px; min-height:23px; background:#efeee8; color:#5b5362;
      font-size:10px; letter-spacing:-.2px; white-space:nowrap; text-shadow:none; box-shadow:inset 0 1px 0 #fff,0 2px 0 #aaa0aa;
    }
    nav button[aria-pressed=true] {
      background:linear-gradient(#b6a1df,#9a80c5); color:#fff;
      text-shadow:0 1px 1px #49375c; box-shadow:inset 0 2px 0 #dbcaee,0 2px 0 #61506f;
    }
    .diagnostic-nav { grid-template-columns:repeat(4,minmax(0,1fr)); background:#d3cbdc; }
    .diagnostic-nav button { font-size:10px; min-height:25px; padding:4px 2px; background:#e4e0d8; }
    .diagnostic-nav button[aria-pressed=true] { background:#9a80c5; }
    section {
      padding:0 8px 6px; max-height:var(--panel-height); min-height:60px;
      overflow:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:#a99bb8 #e0dcd7;
    }
    .advanced { --panel-height:min(360px,46vh,calc(100dvh - 205px)); }
    section.research-view { height:var(--panel-height); display:flex; flex-direction:column; overflow:hidden; padding:0 7px 3px; }
    .research-view>.status-banner { flex:none; }
    p { color:var(--muted); margin:5px 0; font-size:11px; line-height:1.35; overflow-wrap:anywhere; }
    .snapshot-meta { font-size:10px; padding-bottom:8px; border-bottom:1px dashed #c5bdc6; }
    .status-banner {
      padding:4px 6px; background:#e2ebd3; border:1px solid #a7b48f; border-radius:5px;
      color:#455137; box-shadow:inset 0 1px 0 #f5fbe9; font-weight:700;
    }
    .status-banner[data-kind=error] { background:#f7d9d3; border-color:#c78d86; color:#792e2e; }
    .status-banner[data-kind=pending],.status-banner[data-kind=applied] { background:#faedc9; border-color:#c5ae70; color:#655025; }
    .current-value { color:#614974; font-weight:700; font-size:10px; padding-left:2px; }
    .current-account { padding:4px 6px; background:#e3dced; border:1px solid #bdafcb; border-radius:5px; color:#50405e; font-weight:700; font-size:10px; }
    .research-editor { display:flex; flex-direction:column; flex:1; min-height:0; }
    .research-header { position:relative; flex:none; z-index:3; background:var(--paper); padding:4px 0; border-bottom:1px solid #c4b9ca; }
    .research-topline { display:flex; align-items:center; gap:4px; }
    .research-tabs { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:3px; flex:1; }
    .research-tabs button { padding:3px 2px; min-height:23px; font-size:11px; color:#5b5362; background:#e4dfeb; text-shadow:none; box-shadow:inset 0 1px 0 #fff; }
    .research-tabs button[aria-selected=true] { background:#947eb7; color:white; }
    .research-header p { margin:3px 0; font-size:10px; }
    .research-help summary { width:22px; height:22px; text-align:center; cursor:pointer; list-style:none; border:1px solid #a59bb4; border-radius:5px; font-weight:800; color:#614974; }
    .research-help summary::-webkit-details-marker { display:none; }
    .research-help p { position:absolute; right:0; top:28px; width:min(270px,100%); z-index:5; padding:8px; background:#fff8e7; border:1px solid #b7a78a; border-radius:5px; box-shadow:0 3px 8px #51445544; }
    .research-actions { display:flex; gap:4px; margin-top:4px; }
    .research-actions button { font-size:10px; padding:3px 6px; min-height:23px; }
    .research-actions button:first-child { flex:1; }
    .research-timer { white-space:nowrap; }
    .research-warning { color:#792e2e; }
    .research-scroll { flex:1; min-height:0; overflow:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:#a99bb8 #e0dcd7; padding:6px 2px 0; }
    .research-tree { position:relative; margin:2px 0; }
    .research-tree svg { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
    .research-tree path { fill:none; stroke:#c3b7cc; stroke-width:2; }
    .research-tree path.unlocked { stroke:#9276ae; }
    .research-node,.research-node:disabled { position:absolute; transform:translateX(-50%); height:48px; padding:3px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; font-size:10px; line-height:1.15; background:#e5dcec; color:#51405e; border:1px solid #9b86af; border-radius:5px; box-shadow:inset 0 1px 0 #fff,0 1px 0 #aaa0aa; text-shadow:none; }
    .research-node:active:not(:disabled) { transform:translate(-50%,2px); }
    .research-node[data-state=queued] { background:#faedc9; border-color:#c49b3c; color:#655025; }
    .research-node[data-state=maxed] { background:#e2ebd3; border-color:#a7b48f; color:#455137; }
    .research-node[data-state=locked] { background:#e5e1df; border-color:#b8afb9; color:#817888; }
    .research-node-name { font-weight:800; overflow-wrap:normal; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .research-node-level { font-size:10px; font-variant-numeric:tabular-nums; }
    h3 {
      margin:8px 0 5px; padding:3px 6px; border:1px solid #a59bb4; border-radius:5px;
      background:linear-gradient(#e0d8ec,#d1c7e1); color:#51445f;
      font-size:12px; font-weight:900; box-shadow:inset 0 1px 0 #f6f0ff;
    }
    h3::before { content:'◆'; margin-right:7px; color:#8a71aa; font-size:10px; }
    label { display:block; margin:6px 0 4px; font-size:11px; font-weight:800; color:#55495e; }
    input,select {
      display:block; width:100%; min-width:0; max-width:100%; margin-top:3px; padding:5px 7px;
      background:#fffdf5; color:#38303f; border:1.5px solid #9c929e; border-radius:6px;
      box-shadow:inset 0 2px 2px #65526712; font-size:12px; font-weight:600;
    }
    input:hover,select:hover { border-color:#79638e; }
    select { text-overflow:ellipsis; }
    section>button { display:block; width:100%; margin:4px 0; min-height:26px; padding:4px 7px; }
    section>button.secondary-action { background:#e4dfd8; color:#62556a; text-shadow:none; font-size:11px; box-shadow:inset 0 1px 0 #fff9ec,0 2px 0 #a99ea8; }
    button.combat-toggle { text-align:left; background:linear-gradient(#ddd5e6,#c5b9d3); color:#584965; text-shadow:none; box-shadow:inset 0 2px 0 #f4edfa,0 2px 0 #8a7c93; }
    button.combat-toggle[aria-pressed=true] { background:linear-gradient(#a3e685,#72ca62); color:#274b29; box-shadow:inset 0 2px 0 #d1fbb4,0 2px 0 #65895a; }
    button:disabled { background:#d3d0cb; color:#77716f; text-shadow:none; box-shadow:inset 0 1px 0 #f0ece4; border-color:#aca4a8; cursor:not-allowed; }
    table { width:100%; border-collapse:collapse; font-size:12px; font-variant-numeric:tabular-nums; }
    td { padding:8px 2px; border-bottom:1px solid #d4cdd2; overflow-wrap:anywhere; }
    td:last-child { text-align:right; font-weight:800; color:#68527e; padding-left:12px; }
    pre { margin:10px 0; padding:10px; border:1px solid #c7beca; border-radius:6px; background:#e3dedf; color:#514455; white-space:pre-wrap; font:10px/1.5 Consolas,monospace; overflow-wrap:anywhere; }
    footer { display:flex; align-items:center; flex-wrap:wrap; gap:4px; padding:3px 5px; border-top:1px solid #b7a89d; background:linear-gradient(#deb386,#cd9a68); box-shadow:inset 0 2px 0 #f6d5ae; }
    footer button { padding:3px 6px; font-size:10px; background:#f6e8cf; color:#624d48; text-shadow:none; box-shadow:inset 0 1px 0 #fff8e6,0 1px 0 #9d765d; }
    .version { margin-left:auto; font-size:10px; font-weight:800; color:#644c4a; }
    .gear-fields { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:5px; }
    .gear-editor label { margin:3px 0 2px; }
    .gear-editor input,.gear-editor select { margin-top:2px; padding:3px 5px; font-size:11px; }
    .gear-preview summary { cursor:pointer; font-size:10px; color:#68527e; }
    .gear-fields label { min-width:0; }
    .gear-fields button { margin:3px 0; padding:5px 3px; font-size:11px; }
    .gear-preview { margin:4px 0; padding:5px 7px; border:1px solid #bbaacb; border-radius:5px; background:#eee6f6; font-size:11px; line-height:1.4; }
    .gear-preview strong,.gear-preview small,.gear-batch small { display:block; }
    .gear-preview small { color:#6c6175; font-size:10px; }
    .gear-custom,.gear-upgrade { margin:4px 0; }
    .gear-custom>summary,.gear-upgrade>summary { display:list-item; padding:3px 0; background:none; color:#68527e; font-size:11px; border:0; box-shadow:none; text-shadow:none; cursor:pointer; }
    .gear-batch { list-style:none; margin:4px 0; padding:0; }
    .gear-batch li { display:flex; align-items:center; justify-content:space-between; gap:4px; padding:4px; border-bottom:1px solid #d2c6da; font-size:11px; }
    .gear-batch li div { min-width:0; overflow-wrap:anywhere; }
    .gear-batch button { flex:0 0 23px; width:23px; padding:2px; margin:0; }
    .gear-batch small,.gear-note { font-size:10px; color:#6c6175; }
    @media(max-width:380px) { :host{top:5px;right:5px} details.trainer-shell{width:min(332px,calc(100vw - 10px))} nav button{font-size:9px} }
    @media(prefers-reduced-motion:reduce) { button{transition:none} }
  `;
})();
