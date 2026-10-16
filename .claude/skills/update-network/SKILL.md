---
name: update-network
description: Use whenever Aryan shares new information, answers a lesson, corrects something, or asks to add, change or delete anything in the Personal Brand neural network; also for relink passes, pattern passes and mix tests. Updates data/network.json and the changelog, builds the page, commits and pushes.
---

# Update the network

The standing rule: every new fact, edit or deletion in this project goes into `data/network.json`. Read `CLAUDE.md` for the data rules; this is the procedure.

## 1. Decide what kind of change it is

| what happened | action |
|---|---|
| Aryan stated something about himself | ADD a ball, layer `aryan`, parent `h-aryan`, source `chat YYYY-MM-DD` |
| He answered or tried a lesson, or you corrected a mistake | ADD a ball, layer `practice`, parent `h-practice` |
| A new technique from a creator or source | ADD layer `framework` with creator and a source file section, or EDIT the existing ball if the idea is already there |
| He corrected a ball | EDIT in place, keep the id |
| He said delete | DELETE (soft): `status: "deleted"`, `deleted`, `deleted_reason`; drop links to it |
| You tested a mix | MIX: append to `combos` with name, oneLine, howItWorks, recipe, test {verdict, why, risk}, example, parents, linksTo |
| Nothing new | say so, change nothing |

## 2. Before adding, search

`grep -i` the keywords in `data/network.json`. If the idea exists, edit that ball (add the creator, sharpen the text) instead of duplicating it.

## 3. Write the change

- New id: `x` plus the number from `meta.next_id`, zero-padded to 3 digits. Increment `meta.next_id`.
- One idea per ball. Plain words. No content suggestions inside facts.
- At least one link to a non-parent ball. If none is honest, leave `links` empty.
- Set `meta.updated` to today.

## 4. Log, check, build, ship

1. Add bullets under today's `## YYYY-MM-DD` in `data/changelog.md`.
2. `node scripts/validate.mjs` must print OK.
3. `node scripts/build.mjs`.
4. Commit (`network: <what>`), push.
5. Republish `dist/story-network.html` to `meta.page_artifact` if you can; otherwise log `NOTE page not republished`.
6. Tell Aryan in one line what changed, e.g. "Added x019 (doubt night, follow-up), linked to Stakes and Thoughts & emotions."

## 5. Relink, pattern and mix passes

Run `node scripts/health.mjs`.
- Relink: string each unlinked ball to the 1-3 balls it honestly relates to; log RELINK.
- Pattern: if 3 or more creators teach the same idea, add a `pattern` ball under that principle, link it to each source ball, log it.
- Mix: pick 2-4 balls from different principles or creators, combine into one move, test it honestly, save in `combos`. A weak verdict is a valid, useful result.
