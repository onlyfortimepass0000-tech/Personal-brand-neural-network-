// Builds dist/story-network.html from site/template.html + data/network.json.
// Run after every data change: node scripts/build.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tpl = fs.readFileSync(path.join(root, "site/template.html"), "utf8");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/network.json"), "utf8"));

const marker = "/*__NETWORK_JSON__*/null";
if (!tpl.includes(marker)) throw new Error("template is missing the " + marker + " marker");

// Keep the data inert inside <script>: escape anything that could close the tag or start a comment.
const LS = String.fromCharCode(0x2028), PS = String.fromCharCode(0x2029);
const json = JSON.stringify(data).replace(/</g, "\\u003c").split(LS).join("\\u2028").split(PS).join("\\u2029");
const out = tpl.replace(marker, () => json);

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
const file = path.join(root, "dist/story-network.html");
fs.writeFileSync(file, out);
console.log(`built dist/story-network.html (${(out.length / 1024).toFixed(1)} KB)`);
