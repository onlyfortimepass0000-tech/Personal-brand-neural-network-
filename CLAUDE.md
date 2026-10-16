# Personal Brand Neural Network

Private repo. Aryan Thakkar's storytelling knowledge network: four creators (Kallaway, Caleb Ralston, Sam Gaudet, Aayush Swamy) feed one core, which spins out 10 principles and 2 hubs, each holding balls (techniques, facts, practice). Strings link every ball to its parent, to related balls and to the creators who teach it.

Read `HANDOFF.md` first for the current state. This file is the standing rules.

## The standing rule (Aryan, 2026-10-16)

> Whenever we talk in this project, whenever we add something new, find out anything new, edit anything, or I tell you to delete anything, the network gets updated. Every bit of information goes in. Only then it becomes a self-improving network I can use as a competitive edge.

So in every session, before you finish a turn that produced anything new, changed or removed, update the network. Do not wait to be asked, do not batch it for later, and do not ask permission for routine updates. Say in one line what you added, edited or removed.

What counts as an update:
- New fact Aryan states about himself, his stories, beliefs, constraints, setup, audience, taste. Layer `aryan`.
- A lesson taught, a question he answered, a test he ran, a correction, a mistake the model made. Layer `practice`.
- A new framework, technique or idea from any creator or source. Layer `framework`, attributed to a creator and traceable to `sources/`.
- A pattern shared by several creators. Layer `pattern`.
- An edit to anything already in the network. Keep the id, change the content, log it.
- A deletion. Soft delete only (see below).
- A mix of balls that you tested. Goes in `combos`.

## Mission context (do not drift)

Aryan's main mission right now is to become an excellent storyteller. He wants to learn how storytelling works. He does NOT want content ideas, scripts or "what to post" while he is in this phase. He said so on 2026-10-16: "your job right now is not to focus on what I can do, it is to focus on what I should know in the world of storytelling." Teach frameworks. Only discuss his own content when he asks.

He launches a new Instagram account from 0 after his exams end on 4 Nov 2026.

## How to work with Aryan

- Concise, pure English, human-sounding. Short replies. He is 19, a BBA Marketing student and founder.
- Dissect each question to find the real problem and ask sharp questions before solving, but do not ask clarifying questions when his intent is clear.
- Blunt, evidence-based pushback. No cushioning, no flattery. Co-founder plus devil's advocate.
- Flag any unspecified decision point immediately. Do not decide it silently.
- Prefer practical, visual, interactive, game-like learning over quizzes.
- Use skills first, and suggest new skills when a workflow repeats. This repo has one: `/update-network`.
- Ask psychological and situational questions over time, look for patterns, double down on what repeats.

## Layers

| layer | meaning | parent |
|---|---|---|
| framework | a technique from a creator or source | one of p1-p10 |
| aryan | a fact Aryan said about himself | `h-aryan` |
| practice | what he was taught, tried, answered or tested | `h-practice` |
| pattern | an idea that 3 or more creators converge on | the principle it belongs to |

## Data rules (`data/network.json`)

- Source of truth. Never edit `dist/` by hand; it is built.
- Ids are permanent. Never renumber or reuse an id. Framework balls from the first export keep ids like `p3e`. New balls use `x###` from `meta.next_id` (then increment it).
- Every ball needs: `id, type, layer, parent, name, desc, creators, links, source, added, status`. `source` names a file and section (`sources/aryan-source-file.md §10.1`) or `chat YYYY-MM-DD`. A framework ball with no traceable source is not allowed; put it in `practice` marked unverified or find the source.
- Search before adding. If the idea already exists, edit that ball and add the new creator to its `creators` instead of adding a duplicate. Same idea from several creators is how patterns surface.
- Every new ball gets at least one string to a ball other than its parent. If you cannot honestly link it, leave `links` empty so `health.mjs` lists it as unlinked for the next relink pass.
- Quality over volume: one idea per ball, written plainly, no content suggestions inside facts.
- Soft delete: set `status: "deleted"`, `deleted: "YYYY-MM-DD"`, `deleted_reason`. Remove other balls' links to it. Never remove the record and never rewrite git history or force-push. Deleting a hub or principle is allowed only if Aryan asks by name.
- Edits: change `desc` or `name` in place and note before and after in the changelog.
- Do not store things Aryan did not say. Do not store payment card, ID or account numbers, passwords, or anything he asked you not to save. Brand limits he set: no family on camera, no revenue numbers.

## Every update, in this order

1. `node scripts/health.mjs` (at session start) to see unlinked balls, thin spots and recent changes.
2. Edit `data/network.json`.
3. Add bullets to today's entry in `data/changelog.md` (`ADD | EDIT | DELETE | RELINK | MIX | NOTE`, the id, what, why or source). Set `meta.updated` to today.
4. `node scripts/validate.mjs` must print OK.
5. `node scripts/build.mjs` regenerates `dist/story-network.html`.
6. Commit with a plain message such as `network: add x019-x021 (doubt night follow-up)` and push. Follow the attribution the session gives you for commit trailers.
7. If you can publish artifacts, republish `dist/story-network.html` to the URL in `meta.page_artifact` and keep that URL. If you cannot, add `NOTE page not republished` to the changelog so the next session does it.

## Keeping chat and Code in sync

Aryan uses two places: claude.ai chat in the "Personal Brand" Project, and Claude Code on this repo. Neither sees the other's conversation. This repo is the bridge.

- Chat sessions attach this repo, read `HANDOFF.md` and the top of `data/changelog.md`, and push their updates here.
- Code sessions read the same files and push the same way.
- Project memory holds a pointer to this repo and the standing rule.
- At the start of a session, if the last changelog date is older than the last thing Aryan tells you happened, ask him in one line: "Anything from chat since <date> that is not in the network yet?" and ingest what he pastes.
- Saved mixes made inside the published page live in that page's database, not in git. When the page database is reachable, copy them into `combos` (same schema). If not, ask Aryan to paste them.

## Loop jobs (run when asked, and after any ingest of 5 or more balls)

- Relink pass: take each ball from `health.mjs` "unlinked" and string it to the 1-3 balls it honestly relates to. Find the same idea across creators and merge it or link it.
- Pattern pass: when 3 or more creators teach the same idea, add a `pattern` ball under that principle, link it to each source ball, and log it.
- Mix test: pick 2-4 balls, combine into one move, test whether it holds (strong, works with care, weak) and why, then save it in `combos` with `parents` and `linksTo`. Be honest; weak is a valid result.
- Gap pass: look at `health.mjs` creator coverage. Aryan's network is Kallaway-heavy today. Mine `sources/research/` and `sources/storytelling-playbook.md` for what is missing from Caleb, Sam and Aayush.

## Privacy

Private repo. It holds Aryan's family and origin details. Never make it public, never paste its contents into a public place, never include it in a public artifact.
