// Checks data/network.json is consistent. Run before every commit: node scripts/validate.mjs
// Exits 1 on any error. Warnings are printed but do not fail.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const d = JSON.parse(fs.readFileSync(path.join(root, "data/network.json"), "utf8"));
const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

const LAYERS = ["framework", "aryan", "practice", "pattern"];
const STATUSES = ["active", "deleted"];
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

const ids = new Map(); // id -> record (every kind, including deleted)
const add = (kind, r) => { // _k is the record type; r.kind on principles means principle or hub
  if (!r.id) return err(`${kind} without id: ${JSON.stringify(r).slice(0, 80)}`);
  if (ids.has(r.id)) return err(`duplicate id "${r.id}"`);
  ids.set(r.id, { ...r, _k: kind });
};
d.creators.forEach((c) => add("creator", c));
add("core", d.core);
d.principles.forEach((p) => add("principle", p));
d.nodes.forEach((n) => add("node", n));
(d.combos || []).forEach((c) => add("combo", c));

const live = (id) => ids.has(id) && ids.get(id).status !== "deleted";

for (const r of ids.values()) {
  if (r._k === "creator" || r._k === "core") continue;
  if (!STATUSES.includes(r.status || "active")) err(`${r.id}: bad status "${r.status}"`);
  if (r.status === "deleted") {
    if (!r.deleted_reason) err(`${r.id}: deleted without deleted_reason`);
    if (!ISO_DAY.test(r.deleted || "")) err(`${r.id}: deleted needs a YYYY-MM-DD "deleted" date`);
  }
  if (r._k === "principle") {
    if (!r.name || !r.desc) err(`${r.id}: principle needs name and desc`);
    if (r.layer && !LAYERS.includes(r.layer)) err(`${r.id}: bad layer "${r.layer}"`);
  }
  if (r._k === "node") {
    if (!r.name || !r.desc) err(`${r.id}: needs name and desc`);
    if (!LAYERS.includes(r.layer)) err(`${r.id}: bad layer "${r.layer}"`);
    if (!r.parent || !ids.has(r.parent) || ids.get(r.parent)._k !== "principle") err(`${r.id}: parent "${r.parent}" is not a principle or hub`);
    else if (r.status !== "deleted" && !live(r.parent)) err(`${r.id}: parent "${r.parent}" is deleted but node is active`);
    if (!r.source) err(`${r.id}: missing source`);
    if (!ISO_DAY.test(r.added || "")) err(`${r.id}: needs a YYYY-MM-DD "added" date`);
    for (const c of r.creators || []) if (!ids.has(c) || ids.get(c)._k !== "creator") err(`${r.id}: unknown creator "${c}"`);
    if (r.layer === "framework" && !(r.creators || []).length) err(`${r.id}: framework ball needs at least one creator`);
    for (const l of r.links || []) {
      if (!ids.has(l)) err(`${r.id}: link to unknown id "${l}"`);
      else if (r.status !== "deleted" && !live(l)) warn(`${r.id}: links to deleted "${l}" (drop the link)`);
      if (l === r.id) err(`${r.id}: links to itself`);
    }
  }
  if (r._k === "combo") {
    for (const l of [...(r.parents || []), ...(r.linksTo || [])]) if (!ids.has(l)) err(`combo ${r.id}: unknown id "${l}"`);
    if (!r.name || !r.test) err(`combo ${r.id}: needs name and test`);
  }
}

// next_id must be ahead of every x### id
const maxX = Math.max(0, ...[...ids.keys()].filter((i) => /^x\d+$/.test(i)).map((i) => +i.slice(1)));
if (!(d.meta.next_id > maxX)) err(`meta.next_id (${d.meta.next_id}) must be greater than the highest x id (${maxX})`);

// changelog must mention the date in meta.updated
const log = fs.existsSync(path.join(root, "data/changelog.md")) ? fs.readFileSync(path.join(root, "data/changelog.md"), "utf8") : "";
if (!log.includes(`## ${d.meta.updated}`)) err(`data/changelog.md has no "## ${d.meta.updated}" entry (meta.updated). Log what changed.`);

// every principle (not hub) should be taught by all four creators: warn if not
for (const p of d.principles.filter((p) => p.kind === "principle" && p.status !== "deleted")) {
  const cs = new Set(d.nodes.filter((n) => n.parent === p.id && n.status !== "deleted").flatMap((n) => n.creators || []));
  const missing = d.creators.filter((c) => !cs.has(c.id)).map((c) => c.name);
  if (missing.length) warn(`${p.id} "${p.name}": no ball from ${missing.join(", ")}`);
}

const live_nodes = d.nodes.filter((n) => n.status !== "deleted").length;
console.log(`${ids.size} records, ${live_nodes} live balls, ${(d.combos || []).length} saved mixes`);
warns.forEach((w) => console.log("warn: " + w));
if (errors.length) {
  errors.forEach((e) => console.log("ERROR: " + e));
  process.exit(1);
}
console.log("validate: OK");
