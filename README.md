# AutoForge Trainer

A standalone Tampermonkey userscript with game-themed controls, saved-state inspection, and build-specific live combat switches. Current release: **1.0.0**.

[Download v1.0.0](https://github.com/playcations/autoforge-trainer/releases/download/v1.0.0/autoforge-inspector.user.js) · [Release notes](CHANGELOG.md)

## Install on Mac, Windows, or Linux

**You only need Tampermonkey and one file: [autoforge-inspector.user.js](autoforge-inspector.user.js).** No Node.js, terminal, local server, repository clone, or Windows scripts are required.

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Chrome on your computer.
2. Download the release above, or open [autoforge-inspector.user.js](autoforge-inspector.user.js) and select **Raw**. If Tampermonkey offers an installation page, choose **Install**. Otherwise, copy the entire file, including its userscript header, and continue below.
3. Open Tampermonkey's dashboard and choose **Create a new script** (the + tab).
4. Replace all the starter code with the copied script. Use **File > Save** in the editor and make sure the script is enabled.
5. Open Reddit's AutoForge game, or reload it if already open.

If Chrome asks for it, enable **Allow User Scripts** in Tampermonkey's extension details. See [Tampermonkey's instructions](https://www.tampermonkey.net/faq.php?locale=en&q=Q209).

The script bundles its interface, theme, catalogs, and native patches in that one file. It contains no external script imports, machine-specific paths, or localhost dependencies. Browser execution has been tested in Chrome on Windows; this portable packaging has not yet been live-tested on macOS or Safari.

### Update an existing installation

Open the existing **AutoForge Read-only Inspector** script in Tampermonkey, replace its entire contents with the newest `.user.js` file, save, and reload the game. Keep one enabled copy. Updates are manual; the script no longer checks a local server.

The installed userscript retains the name **AutoForge Read-only Inspector** so existing installations keep their update identity. It includes optional controls that change game state.

Refreshing the game reruns the installed version; it does not install a newer one.

## Using the trainer

Choose a game-section tab, enter a value, and press the corresponding action button. A valid operation is saved locally, then the embedded game reloads automatically into the same tab. Changes apply once to the next matching player load. Use the game's normal buttons afterward to equip, summon, hatch, claim rewards, or upgrade skills.

| Tab | Actions |
| --- | --- |
| Progress | Campaign stage, forge level, and forge deadline |
| Combat | 1×/2×/3×/5× combat speed, HP protection, and skill reuse |
| PvP | Weaker Arena opponents and Arena rank |
| Resources | Coins, hammers, currencies, horseshoes, and Arena tickets |
| Gear | Era/slot gear builder, stat previews, batches of up to four items, equipped levels, and skins |
| Skills | Skill cards and summon level |
| Eggs | Raise all hatched pets, inventory eggs, incubation, and hatch deadlines |
| Mounts | Mounts, owned levels, and summon odds |
| Research | Clickable Forge, Power, Skills, and Pets trees; queued node upgrades and deadlines |
| Adventures | Adventure keys and stage targets, including Creature Nest egg rewards |

Typed values survive switching tabs in the same session. The selected game tab and Advanced preference are remembered across reloads on that browser.

**Advanced** in the footer is OFF by default. Enable it when troubleshooting to reveal Overview, Skill data, Timers, Network, Snapshot, Loads, Runtime, and Tests, plus Export snapshot and Stop inspector. Field restoration is under **Advanced → Tests**. Turning Advanced off returns to a game tab and hides those tools again. Everything is bundled in the same script; no second installation is required.

The trainer starts collapsed on every page load, including after Apply. Click the header to expand its narrower 332px panel. Current account values appear at the top and beside the relevant controls. These values come from the latest observed load or outgoing save; they are not a direct view of every frame of gameplay. Live combat switches take effect without a reload and reset to OFF when the game reloads.

Resource additions show the previous and new balance after applying. An applied message does not prove server persistence. After a normal game save and a later reload, a matching unmodified server load produces a confirmation message. Failed operations remain visible after reload.

### Combat speed

Open **Combat → Combat speed** and select **1×, 2×, 3×, or 5×**. Changes take effect immediately during a fight. Start with 2×; faster settings perform more simulation work and may be limited by your computer's performance. Select 1× to return to normal. Reloading the game or stopping the trainer resets speed to 1×.

The patch accelerates the shared battle loop used by campaign, adventures, and Arena. Both sides, skills, waves, and the battle countdown advance together. It repeats normal simulation updates and checks the original pause/win/loss/timeout logic between updates, preserving the game's fixed simulation step and single result callback. Reward screens, menus, wall-clock deadlines, and inter-battle interface delays retain their original timing.

The selector enables only after the patched battle module reports ready and account data has loaded. After installing this version, reload the game to load the new native patch. If it stays unavailable, use **Reload game to initialize combat**; a hard refresh can clear a cached old archive. An unsupported game build still requires a new compatible patch.

The speed patch passed native-code and browser-control fixture tests. Live fighting on the user's Mac, including engine animation timing at faster speeds, has not yet been verified.

### Consecutive changes and older saves

All saved-state actions use one shared Apply/reload pipeline. Before reload and after an edit, it retains a full, account-bound copy of the latest game state in this browser. If a later load returns an older save, the trainer restores that copy before applying the next operation. This prevents the reported forge 25 → 26 → 25 rollback and also preserves earlier changes in other sections.

Recovery restores the complete snapshot once; it does not repeat resource additions, egg creation, or other actions. Newer outgoing game saves refresh the copy, including normal spending, hatching, and unrelated progress. Save selection follows the game's campaign-progress, play-time, and timestamp precedence. A matching or newer server load retires the local copy. Ties use the server and retain field-specific checks for ambiguous regressions.

**Kept your newer local progress** means the browser recovered a local copy. It is not server confirmation. The copy stays in this browser's game-origin storage and does not synchronize to another computer. If storage cannot retain an edit, the trainer reports failure instead of delivering an unprotected new edit. Recovery cannot reconstruct changes lost before this version was installed.

Resource additions no longer have a 100,000 cap. Millions and billions are accepted for coins and the other listed resources. The inspected inventory code has no explicit currency cap; the trainer limits the resulting balance to **9,007,199,254,740,991**, JavaScript's largest safe integer, so whole-number arithmetic remains exact. The maximum addition is that limit minus your current balance and is checked again against the loaded save. This precision boundary is not a verified server-side gameplay cap.

Resource additions accept fractional balances. Applying an addition rounds the selected balance up first (for example, 1,234.25 + 100 becomes 1,335); the preview shows the same calculation. An absent currency entry in a loaded inventory starts at zero, matching the game. Other balances remain unchanged. Missing inventory data, malformed balances, and amounts above the precision limit have distinct errors. Adventure-key additions and the legacy coin action use this same calculation.

**Adventures** now restricts the age selector and level limit to the chosen adventure. Creature Nest has **age 1, levels 1–130**. Portal of Ages, Undead Horde, and Mutant Lab have **ages 1–5, levels 1–10 per age**. Switching adventures resets the target to that adventure's observed progress; switching ages adjusts the level limit. Invalid or lower targets are rejected before reload with a specific message. 130 is a Creature Nest level, not an adventure age.

Skill-card additions use the same exact-integer boundary, calculated against both owned duplicates and all affected summon counters. The old 1,000-card cap is removed. Pet/mount identifiers no longer stop at one million. Gear and egg seeds accept the native generator's full 32-bit seed space rather than the previous ±100,000 input restriction.

The audit retained limits backed by game definitions: gear/pet/mount level 100, forge level 34, summon odds tier 40, campaign 20–20, each research node's configured cap, adventure stages, and Arena promotion thresholds. Gear limits now come from the catalog; research layer validation comes from the selected tree. These limits prevent selecting levels for which the inspected game has no corresponding progression data.

### Gear builder

1. Open **Gear**, choose an **era**, then an **equipment slot**. **Item appearance** lists the game's English names, such as Hacker Visor, Moon Boots, and Ray Gun.
2. Choose the new item's level and **Bonus stat**. The preview shows its base HP/damage and the bonus percentage before anything is added. The bonus selector chooses a high-roll seed for that stat in the selected era. **Custom seed** lets you enter a seed and see its actual result instead.
3. Use **Details & equipped item** for the seed, weapon type/base attack interval, and your currently equipped piece. Base stat previews exclude research and loadout modifiers; percentages are rounded for display.
4. Click **Add to batch**, then choose another item. Remove individual entries with ×. Drafts survive section switches until Apply or reload and clear when the account changes.
5. Empty the game's stash with its normal Equip/Sell buttons, then press **Create batch (N/4)**. All queued items are added together and the game reloads. Equip or sell them normally afterward. The game sorts the stash by era.

**Four is the supported maximum in the inspected build.** Although the save array can hold more, the forge display defines positions for only four items; a fifth can break its display. The trainer checks both batch validity and an empty stash before reload and again on the incoming save. An invalid batch applies nothing. **Raise equipped gear levels** remains available in a collapsed section below the builder.

Validation includes 186 bonus results compared with the game's native Lua calculation, native item/stat and stash behavior, atomic batch/reload tests, and a browser fixture exercising four distinct items, custom seeds, section switching, and occupied-stash protection. This version's new gear workflow has not yet been tested against the live game on macOS.

### Skins

Open **Gear → Unlock all skin pieces**. The preview shows how many of the **31 pieces across four sets** are owned. Apply adds only missing pieces to their native slot lists and automatically reloads. Choose and equip them in the game's **Skins** screen; existing equipment and visibility settings stay intact. The game grants normal stat and set bonuses when pieces are equipped. The operation does not change currency balances, purchase records, or battle-pass access.

This supports the inspected build's Vampire, Shadow, Robobot, and Lemon sets, including their defined mount appearances. It does not invent pieces absent from that catalog. Missing, malformed, or older collection data blocks the operation. Advanced field restoration can restore the last changed skin lists.

### Research tree editor

The four tree tabs are nested inside **Research** and hidden in every other game section. Arrow keys switch between these sub-tabs when one is focused. The compact two-row toolbar stays above a separately scrolling tree; use **?** for instructions. Nodes are 48px tall, with tighter spacing. Long names are shortened to two lines; hover for the full name and prerequisite details.

1. Open **Research**, then choose **Forge**, **Power**, **Skills**, or **Pets**.
2. Each node shows its name and current level out of its maximum. Lines show its prerequisites. Completed earlier layers display as maxed even when the game has compacted their save records.
3. Click an available node to queue **+1 level**. Gold nodes show the current and queued levels separately. You can queue upgrades across all four tabs.
4. **Undo** removes the last queued click; **Reset** clears the whole draft. Neither changes the game.
5. Press **Apply +N** to apply the queued levels together and reload. The trainer starts collapsed and remembers the selected research tree.

A prerequisite needs level 1, matching the inspected game. Queuing that level unlocks its connected child in the draft. Node limits and prerequisites are checked again against the loaded save; invalid batches apply nothing. Newer levels are preserved, and older research saves are rejected. Queued changes last for the current page session and clear if the account changes or the page reloads.

**Finish timers** appears in the toolbar only when timers exist. Finish the timer and collect its upgrade in the game before editing that tree. Apply or reset other queued edits before using the timer shortcut, because it reloads the game.

### Eggs and incubation

**Add selected pet egg** adds an egg to inventory. An inventory egg has no running hatch timer yet.

- **Start and finish waiting eggs** puts inventory eggs into free incubation slots and makes them ready to collect. It also finishes timers in occupied slots. It respects the game's two normal slots, or three if the extra slot is already unlocked.
- **Finish incubating eggs** skips timers for eggs already in slots. If only inventory eggs exist, it explains that they need to start first and does not reload.
- Collect ready eggs using the game's normal button. Ready eggs occupy their slots until collected; then use Start and finish again for the next batch.

The trainer shows inventory, incubating, ready, and free-slot counts. Added incubation records use numeric slot arrays, and completed deadlines use an absolute past time so response clock units cannot accidentally produce another full timer. Older loads that would lose an observed egg, reverse hatching, or restore a longer observed timer are rejected before changes apply.

**Raise all hatched pets** is the first control in Eggs. Enter a **Target pet level** to raise every collected pet below that level. The initial target is one above your highest observed pet level, capped at 100. The preview shows how many pets will rise and how many are already at or above the target. Higher-level pets remain unchanged. Hatch and collect eggs first. The trainer accepts fractional merge progress and preserves it below the maximum level. Invalid records identify the affected pet before any reload or changes. Mount leveling uses the same validation fix.

**Creature Nest (egg rewards)** is under Adventures. It changes the dungeon stage that determines egg rewards and enemy difficulty. Pet levels are controlled separately in Eggs.

After pet Apply, the first message only confirms an edit to the incoming data. The next observed outgoing save reports whether the game actually kept those pet levels. An older outgoing save cannot replace the retained copy; the newer pet state is recovered on reload. If a genuinely newer save still contains lower or missing pets, the trainer reports that the edited load was not kept; Apply can be retried from that current save. A later unmodified server load remains the separate persistence check. An outgoing save alone is not proof that the server accepted it.

### Version 0.8.0 fixes

- Removes the leftover forge-level-1–5 restriction that blocked advanced accounts, resource additions, and combat controls.
- Replaces the fixed stage 3–15 unlock with a campaign target up to **20–20**, and adds a forge target up to **34**, based on the inspected game catalog.
- Displays current balances, campaign, forge, Arena rank, and other progression values; defaults target controls to current values where available.
- Blocks campaign, forge, and Arena regression before reload, and rejects loaded saves that are older than the observed progress or selected resource balance.
- Updates balances and combat readiness while a form control has focus, without erasing typed values.
- Explains why combat modules are unavailable and provides **Reload game to initialize combat**. Refresh native status only rechecks readiness; it cannot initialize a missed module or support a different game build.

### Controls

- Campaign stage targets up to 20–20, forge targets up to 34, coins, hammers, skill currency, technology points, horseshoes, adventure keys, and Arena tickets.
- Equipped gear levels and selected items in an empty stash.
- Skill cards and skill summon levels; use the native Upgrade button to level a skill.
- Pet eggs, hatch deadlines, owned pet levels, and egg adventure progression.
- Mount selection, owned mount levels, and mount summon tiers.
- Research deadlines and levels for a selected research tree.
- Adventure ages and levels.
- Live-tested HP protection and repeated skill use after the active effect ends, limited to the inspected build.
- Arena opponent-strength toggle and league/points progression controls.
- Forge deadline completion and single-level forge increases, under Tests.

Paid battle pass access is not included.

### Arena controls

**Weaker Arena opponents** is a live toggle. Turn it ON before pressing the game's Challenge button. For opponents generated while enabled, HP and damage are capped at 10% of the player's current values, with minimums of 1 HP and 0.01 damage. Active skills, pets, mounts, and selected combat bonuses are removed from those generated opponents. Existing opponent lists are unchanged. Turning the switch OFF restores normal generation for subsequent lists; reload and Stop also turn it OFF.

**Raise Arena rank** sets a higher league and/or more points in the current league, then automatically reloads the game. The target uses the inspected game's 17 league definitions, with points below the selected league's promotion threshold. It does not award match rewards, spend tickets, or fabricate match history. Use normal matches afterward to earn rewards and further points.

The new Arena controls have passed automated tests, including the patched native opponent factory, real equipment calculations, and native league promotion/reward logic. Live browser verification of those controls is still pending.

## Validation and limits

Version 0.12.0 passed the full automated suite, archive-byte guards, numeric bridge compatibility, speed readiness/validation, and reset-on-stop checks. Isolated tests ran the original and patched battle core with the original fixed-step update loop at 120, 60, 30, and 12.5 FPS: 1×/2×/3×/5× produced matching simulation/draw call sequences and countdown results in fewer outer frames, with single win/loss/timeout callbacks, safe finalization, and respected pauses. Browser fixtures verified the bundled selector's readiness gate, immediate flag changes, tab switching, and reset to 1× on reload. Engine rendering and network services were mocked in those checks; this is not live Mac combat verification.

Version 0.11.1 passed the full automated suite and a browser fixture deliberately returning the same old server save on every reload. Using the bundled script's buttons, forge 25 → 26 → 27 → 28, two consecutive coin additions, normal coin spending, and pet 1 → 9 → 12 all preserved earlier changes. After the fixture server caught up, the trainer showed server confirmation. Automated regressions additionally cover mixed skills/mounts/eggs, repeated reloads without duplicate additions, delayed saves, unknown fields, genuinely newer server progress, account isolation, expiry, and storage failure. These are reproducible local tests, not verification of the user's Mac account or live server acceptance.

Version 0.11.0 passed the automated suite, including large skill-card additions, numeric overflow, identifier exhaustion, all 31 skin IDs, native slot layout, existing ownership/equipment/visibility preservation, malformed and stale saves, and restoration. An isolated run of the original game's skin module recognized and equipped every added piece and activated a complete set's bonuses. Browser fixtures verified skin unlocks and a one-million-card addition across automatic reloads. These checks do not establish live server persistence on the user's Mac account.

Version 0.10.5 passed the automated suite, including million/billion additions, the exact integer boundary, overflow rejection, and a balance increasing between Apply and load. Browser fixture testing verified adding 1,000,000,000 coins and the resulting 1,000,450,000 balance after automatic reload. This was a simulated account, not a live server-limit test.

Version 0.10.4 clarifies pet versus dungeon controls and replaces indefinite pet-save waiting with observed success/failure feedback. Automated tests cover a matching outgoing save, a save with the original pet levels, and retry eligibility. Browser fixture testing raised pets from levels 9 and 12 to 13 and verified the new outgoing-save message. This improves diagnosis; the cause of the user's live Mac save being discarded remains unverified.

Version 0.10.3 fixes whole-batch rejection of valid fractional pet/mount merge progress. The inspected game's merge calculations use fractional factors without rounding. Automated checks cover mixed levels, retained fractional progress, maximum-level cleanup, invalid records, and no-op targets. A browser fixture with levels 1 and 12 verified a target of 9 raised only the level-1 pet, displayed the correct preview, and survived the automatic reload and a later reload. This reproduces one possible cause of the reported failure; the user's exact save and error message have not been verified.

Version 0.10.2 passed the automated suite and browser layout checks inside short game-sized frames, including 500×360, 500×500, and 320×400. Checks covered visible tree nodes, queued upgrades, Undo/Reset, preserved tree scroll position after clicking a node, optional help, and the Eggs section. Header, navigation, fields, and footer use less space throughout the trainer. Routine status messages and inactive timer controls no longer consume the Research viewport. These are local fixture checks, not a new live Mac test.

Version 0.10.1 passed the automated suite, an isolated check against the original game's egg-state Lua module, and browser fixture tests. Checks covered an active full timer becoming ready, adding two further eggs without restarting the first timer, slot capacity, normal collection, the next batch, later reload persistence, and Research-only sub-tabs. These are local compatibility and fixture tests, not verification on the user's live Mac session.

Version 0.10.0 passed automated checks for individual node drafts, native prerequisites, all four trees, undo/reset, atomic batches, limits, compacted layers, stale saves, active research, restoration, and later-load verification. Browser tests using the simulated account verified six upgrades across all four trees in one Apply, displayed levels after reload, Undo/Reset, and node layout without clipped labels. These are fixture checks, not a new live-server test.

Version 0.9.0 passed the existing automated suite and browser checks for all ten game sections, hidden diagnostics, Advanced preference persistence, retained form values across tab switches, combat controls, and resource Apply returning to the selected tab. Browser checks used the bundled script with the simulated advanced account.

Live testing on the test account verified pet and mount levels, Mythical mount equipment, level-40 summon tiers, native Mythical skill rolls, completed Power research, adventure rewards, higher-rarity eggs, and extra Arena matches. These results were checked against subsequent unmodified server loads. Live combat switches were tested separately.

Controls require an identified account and a complete game snapshot. Plans are account-bound, expire after five minutes, and apply once. Invalid selections do not reload the game. Older loads recover the retained snapshot when its metadata proves it is newer; ambiguous field regressions still block the new operation. The save-selection play-time marker is advanced for each new edit so the game can select the modified load over its cached copy. Recovery alone never advances that marker.

Version 0.8.0 passed automated tests and browser tests of the bundled script against a simulated forge-level-24 account: combat readiness, hammer addition and reload persistence, current-value updates, campaign 20–20, and blocked backward targets. This simulation is not live server or macOS verification. The updated script still needs verification in the user's Mac browser; native switches remain unavailable until the matching patched game modules report ready.

**Changes may autosave.** This is not a temporary preview or a save-isolated mode. Restore only replaces the last changed fields; it cannot undo related rewards, subsequent upgrades, or the play-time marker.

The inspected mount odds stop at summon level 40, although native progression can advance beyond 40. **Restore mount summon odds** returns that tier to 40. It does not automatically prevent later progression beyond 40.

Compatibility is limited to the inspected game host and native archive build `1788851099`. Native patches check the expected archive length and original bytes before applying. Future game updates may require new compatibility work.

## Development (optional; not needed to install)

Only contributors building or testing the source need Node.js 20 or newer. No npm dependencies are required. These commands work across operating systems:

```sh
npm test
npm run build
npm start
```

- `inspector.js`: network observation, sanitized snapshots, trainer UI, and automatic reload.
- `trainer-theme.js`: theme and responsive layout.
- `research-editor.js`: research tree display, local drafts, and per-node batch validation.
- `test-lab.js`: shared account-bound save recovery and one-shot saved-state operations.
- `trainer-catalog.js`: supported items and progression bounds for the inspected build.
- `native-patch.js` / `native-payload.js`: guarded native combat patches.
- `native-combat-speed.lua`: source for the speed wrapper included in the inspected battle module's archive patch. The standard userscript build bundles its generated bytes in `native-payload.js`.
- `runtime-diagnostic.js`: exposed runtime-name inspection.
- `fixtures/noeval-bridge.js`: inspected engine bridge excerpt used by compatibility tests.
- `save-recovery-tests.cjs`: consecutive Apply/reload and stale-save regression tests.
- `fixtures/stale-save-server.cjs`: manual browser fixture; run with Node and open `http://127.0.0.1:8885/` to test delayed server saves.
- `build-userscript.cjs`: assembles the generated `.user.js` and `.meta.js` files.

Update the version in `inspector.js` and `package.json`, run the tests, then rebuild. Commit both source and generated userscript files. `npm start` optionally serves the two generated files at <http://127.0.0.1:8767> for local development. `Start-Updates.ps1` is an optional Windows development shortcut; users do not need it.

Automated checks cover request transparency, account binding, expiry, reload behavior, one-shot consumption, progression bounds, field restoration, archive guards, and bridge compatibility. They do not replace live verification after a game update.

## Data handling

The trainer observes existing requests and derives a local account-comparison tag from the account header. It stores pending operations, the last changed fields, and a full game-state recovery snapshot in game-origin local storage. The recovery snapshot includes game-state strings but excludes the enclosing response's authentication/session fields, and is not included in trainer exports. Exports retain sanitized numeric game fields, excluding authentication tokens and player-profile strings. Stop inspector removes hooks and cancels pending operations; it leaves the recovery snapshot stored for the next session.

Local session reports, exported snapshots, credentials, and the full engine reference are excluded from this repository.
