// Prints what the network needs next. Run at the start of every session: node scripts/health.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const d = JSON.parse(fs.readFileSync(path.join(root, "data/network.json"), "utf8"));
const live = (r) => r.status !== "deleted";
const nodes = d.nodes.filter(live);
const byId = new Map([...d.principles, ...d.nodes, ...(d.combos || [])].map((r) => [r.id, r]));
const name = (id) => byId.get(id)?.name || d.creators.find((c) => c.id === id)?.name || id;

console.log(`Network last updated ${d.meta.updated}. Next free id: x${String(d.meta.next_id).padStart(3, "0")}`);

// counts by layer
const layers = {};
nodes.forEach((n) => (layers[n.layer] = (layers[n.layer] || 0) + 1));
console.log("Balls by layer:", Object.entries(layers).map(([k, v]) => `${k} ${v}`).join(", "), `| mixes ${(d.combos || []).filter(live).length}`);

// inbound link counts: which balls everything points at
const inbound = {};
const bump = (id) => (inbound[id] = (inbound[id] || 0) + 1);
nodes.forEach((n) => (n.links || []).forEach(bump));
(d.combos || []).filter(live).forEach((c) => [...(c.parents || []), ...(c.linksTo || [])].forEach(bump));
const top = Object.entries(inbound).sort((a, b) => b[1] - a[1]).slice(0, 8);
console.log("\nMost linked-to (the network's centres of gravity):");
top.forEach(([id, n]) => console.log(`  ${n}  ${id}  ${name(id)}`));

// balls nothing points at and that point nowhere: relink candidates
const orphans = nodes.filter((n) => !(n.links || []).length && !inbound[n.id]);
console.log(`\nUnlinked balls (no strings except their parent): ${orphans.length}`);
orphans.slice(0, 25).forEach((n) => console.log(`  ${n.id}  [${n.layer}]  ${n.name}`));

// non-framework facts that don't touch any framework ball
const facts = nodes.filter((n) => n.layer !== "framework");
const touchesMethod = (l) => l === "core" || (byId.get(l) && (byId.get(l).layer === "framework" || (byId.get(l).kind === "principle" && byId.get(l).layer !== "aryan" && byId.get(l).layer !== "practice")));
const noMethod = facts.filter((n) => !(n.links || []).some(touchesMethod));
console.log(`\nFacts not yet strung to any storytelling ball: ${noMethod.length}`);
noMethod.forEach((n) => console.log(`  ${n.id}  ${n.name}`));

// creator coverage per principle
console.log("\nCreator coverage per principle (balls each creator feeds):");
for (const p of d.principles.filter((p) => p.kind === "principle" && live(p))) {
  const row = d.creators.map((c) => `${c.name.split(" ")[0]} ${nodes.filter((n) => n.parent === p.id && (n.creators || []).includes(c.id)).length}`);
  console.log(`  ${p.id.padEnd(4)} ${p.name.padEnd(26)} ${row.join("  ")}`);
}

// thin principles
const thin = d.principles.filter((p) => live(p) && p.kind === "principle").map((p) => [p, nodes.filter((n) => n.parent === p.id).length]).filter(([, c]) => c < 8);
if (thin.length) console.log("\nThin principles (under 8 balls):", thin.map(([p, c]) => `${p.name} (${c})`).join(", "));

// recent changelog
const log = fs.existsSync(path.join(root, "data/changelog.md")) ? fs.readFileSync(path.join(root, "data/changelog.md"), "utf8") : "";
const entries = log.split(/\n(?=## )/).filter((e) => e.startsWith("## ")).slice(0, 3);
console.log("\nLatest changelog entries:\n" + entries.join("\n").slice(0, 1500));
