# Handoff: Personal Brand chat to Claude Code

Written 2026-10-16 from the claude.ai "Personal Brand" Project chat.

## Who and what

Aryan Thakkar, 19, BBA Marketing student in Thane, India, and a founder (B2B growth agency, about 3 months old). He wants to build a personal brand from a brand-new Instagram account (0 followers, 0 following), starting after exams end on 4 Nov 2026, with 90 days on camera. His main mission now is to become an excellent storyteller. Full facts are in `sources/aryan-source-file.md` and the `h-aryan` hub in the network.

## What exists

| thing | where |
|---|---|
| The network (source of truth) | `data/network.json` (99 technique balls, 15 Aryan facts, 4 practice balls, 5 pattern balls, 4 mixes; as of 2026-10-16) |
| Change log | `data/changelog.md` |
| The page | `dist/story-network.html`, built from `site/template.html`. Published as a private artifact: https://claude.ai/artifact/2h5rxSpBRU2STmdwqUNYwy |
| Storytelling playbook (70K chars, 9 sections) | `sources/storytelling-playbook.md` |
| Raw research per creator | `sources/research/notes_*.md` |
| Everything Aryan said in the chat | `sources/aryan-source-file.md` |
| Scripts | `scripts/validate.mjs`, `build.mjs`, `health.mjs` |
| Update skill | `.claude/skills/update-network/SKILL.md` |
| Rules | `CLAUDE.md` (auto-loaded) |

## What Claude Code cannot see

- The chat history. Everything that matters from it is in `sources/` and the network.
- The claude.ai Project docs. Copies are in `sources/`.
- The published page's database. Saved mixes made inside the page live there. The one existing mix is already copied into `combos`.

## State of the teaching

Teaching happens in the claude.ai chat only. Claude Code sessions do not teach (see the role split in `CLAUDE.md`). This section is for chat sessions.

Aryan wants to learn how storytelling works, not what to post. The teaching path has six layers: brain, atom, engine, door, feeling, meaning. Lesson 1 ("the brain predicts") is open and he has not answered. The question:

- A: "Today I'll tell you how I saved money."
- B: "I saved ₹40,000 this year by doing one thing every bank tells you not to."

Which one makes the brain guess, and which of the four curiosity inputs (knowledge gap, belief it will be filled, novelty, relevance) does B add? Continue from here. Teach with a real example and one question at a time. Record his answer and how he did in the `practice` hub.

## Known gaps (first jobs)

1. ~~22 balls are unlinked.~~ Done 2026-10-16: 0 unlinked, first pattern pass added x022-x026.
2. **The network is still Kallaway-heavy.** Caleb has 1 ball in p1, p2, p3 and p5; Sam has 1 in p2 and p3; Aayush has 1 in p5 and p6. The playbook and research notes hold more. Run a gap pass.
3. ~~Aayush Swamy's 1.5-year-old reels.~~ Done 2026-10-16 through web search plus vidIQ watch (no browser needed). See `sources/research/notes_aayush.md` §Old reels.
4. **Open brand questions:** is he comfortable talking to shop owners now (his answer was ambiguous), what kind of shop was the first one, main viewer, handle, third recurring signature, first offer. Ask over time, not all at once.
5. **Layout:** each principle's balls sit on an arc. Past about 12 balls per principle the arcs get crowded. Improve the layout when that happens.
6. **Memory:** the Claude memory store is shared across Claude surfaces. If memory tools are available in this session, check that the project note for this repo is visible.

## First session checklist

1. Read `CLAUDE.md` and this file.
2. `node scripts/validate.mjs && node scripts/health.mjs`.
3. Test what you can do: can you publish artifacts (to republish the page to the URL above)? Can you reach memory? Can you open a browser? Write the answers into the changelog as a `NOTE`.
4. Ask Aryan: "Anything from chat since 2026-10-16 that is not in the network yet?"
5. In Code: run the loop jobs (relink, pattern, gap, mix tests) and keep the page working. In chat: continue Lesson 1. Both update the network as they go.

## Paste this as the first message in Claude Code

```
Read CLAUDE.md and HANDOFF.md, then run the first session checklist. Update the network as we talk. Start by telling me in three lines what state the network is in and what you can and cannot do from here.
```

## Rebuild the page

```
node scripts/validate.mjs && node scripts/build.mjs
```

Requires Node 18 or later. No dependencies. The page loads d3 from cdnjs and optional fonts from Google Fonts.
