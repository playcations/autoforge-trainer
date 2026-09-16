# Release notes

## 1.0.0

First public release, consolidating the development history into one commit.

### Included

- One standalone Tampermonkey script; no local server or build tools required to use it.
- Compact game-themed panel, collapsed on startup, with ten game-section tabs and optional Advanced diagnostics.
- Campaign and forge progression, resources, skills, pets, eggs, mounts, research, adventures, gear, and skins.
- Combat speed options (1×/2×/3×/5×), HP protection, skill reuse, and Arena controls for the supported game build.
- Gear selection by era and slot, actual item names, bonus-stat previews, and batches of up to four items.
- Four research sub-tabs with clickable nodes and queued upgrades.
- Automatic reload after Apply, account-bound edits, and shared save recovery to protect consecutive changes from older loads.
- Fractional resource balances rounded up before additions, matching previews, and adventure-specific age and level limits.

### Compatibility and validation

- Native patches target archive build `1788851099`; future game updates may need new patches.
- The complete automated suite passes. Browser fixtures cover resource additions, adventure limits, gear batches, and reload behavior; gear bonus calculations match 186 native-code results.
- Packaging is portable. Live verification of every feature on macOS/Safari is not complete.
- Changes can autosave. A locally applied edit is distinct from later server confirmation.
- Paid battle-pass access is not included.

### Install or update

Download `autoforge-inspector.user.js` from the release. For an existing installation, replace the contents of the existing **AutoForge Read-only Inspector** entry in Tampermonkey, save, and reload the game. Keep one enabled copy. The existing script name and namespace are preserved for compatibility; updates remain manual.
