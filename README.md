# Personal Brand Neural Network

Private. A self-updating storytelling knowledge network for Aryan Thakkar.

- `CLAUDE.md`: the standing rules (auto-loaded by Claude Code)
- `HANDOFF.md`: current state and first-session checklist
- `data/network.json`: the network (source of truth) · `data/changelog.md`: every change
- `site/template.html` + `scripts/build.mjs` → `dist/story-network.html`: the interactive page
- `scripts/validate.mjs`: consistency check · `scripts/health.mjs`: what to fix or link next
- `sources/`: the playbook, Aryan's source file, and per-creator research notes
- `.claude/skills/update-network/`: the update procedure as a skill

```
node scripts/validate.mjs && node scripts/build.mjs && node scripts/health.mjs
```
