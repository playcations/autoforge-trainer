const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, 'inspector.js'), 'utf8');
const version = source.match(/version: '([0-9.]+)'/)[1];
const header = `// ==UserScript==
// @name         AutoForge Read-only Inspector
// @namespace    local.shaaheen.autoforge
// @version      ${version}
// @description  Standalone AutoForge trainer and save inspector. Paste this entire file into Tampermonkey.
// @match        https://autoforgegame-j101p8-0-0-19-webview.devvit.net/index.html*
// @run-at       document-start
// @sandbox      raw
// @grant        none
// @updateURL    none
// @downloadURL  none
// ==/UserScript==
`;
const lab=fs.readFileSync(path.join(__dirname,'test-lab.js'),'utf8');
const diagnostic=fs.readFileSync(path.join(__dirname,'runtime-diagnostic.js'),'utf8');
const extra=['trainer-catalog.js','trainer-theme.js','research-editor.js','gear-editor.js','skins.js','native-payload.js','native-patch.js'].map(f=>fs.readFileSync(path.join(__dirname,f),'utf8')).join('\n');
fs.writeFileSync(path.join(__dirname, 'autoforge-inspector.user.js'), header + '\n' + extra + '\n' + lab + '\n' + diagnostic + '\n' + source);
fs.writeFileSync(path.join(__dirname, 'autoforge-inspector.meta.js'), header);
console.log('Built Tampermonkey inspector ' + version);
