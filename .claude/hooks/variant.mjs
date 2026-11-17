// Switches the repo from the Movie Diary to the Pokédex.
//
//   node .claude/hooks/variant.mjs pokedex          describe what would change
//   node .claude/hooks/variant.mjs pokedex --yes    make the changes
//
// Run without --yes it touches nothing. It prints every rename, deletion and
// rewording it would do, and anything it expects to find but cannot.
//
// The switch is one way. Going back to the Movie Diary means starting again from
// a fresh copy of the template, so do it once, as a group, before anyone writes
// code. Run on a repo that is already the Pokédex, it stops and says so.
//
// What changes:
//   - journal.html / journal.js become pokedex.html / pokedex.js
//     (and src/journal.js becomes src/pokedex.js, if the week 2 split exists)
//   - titles and comments say Pokémon instead of movies
//   - the TMDB token setup goes: config.example.js, the config.js script tag, its
//     .gitignore entry and the README section. PokéAPI needs no token.
//   - `variant` and the task files in .claude/harness/config.json follow along

import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const apply = args.includes("--yes");
const target = args.find((a) => !a.startsWith("--"));

if (target !== "pokedex") {
  console.error("Usage: node .claude/hooks/variant.mjs pokedex [--yes]");
  console.error("Pokédex is the only variant this repo can switch to.");
  process.exit(1);
}

const CONFIG = ".claude/harness/config.json";
const current = JSON.parse(readFileSync(join(root, CONFIG), "utf8")).variant;
if (current === "pokedex") {
  console.log("This repo is already the Pokédex. Nothing to do.");
  process.exit(0);
}
if (current !== "movie-diary") {
  console.error(`Expected "variant": "movie-diary" in ${CONFIG}, found ${JSON.stringify(current)}.`);
  process.exit(1);
}

const path = (rel) => join(root, rel);

// ─── Renames ─────────────────────────────────────────────────────────────────

const renames = [
  ["journal.html", "pokedex.html"],
  ["journal.js", "pokedex.js"],
  ["src/journal.js", "src/pokedex.js"],
].filter(([from]) => existsSync(path(from)));

// ─── Deletions ───────────────────────────────────────────────────────────────

const deletions = ["config.example.js", "config.js"].filter((f) => existsSync(path(f)));

// ─── Rewording ───────────────────────────────────────────────────────────────
// Each edit says which file it applies to, by its name *after* the renames.
// `all` replaces every occurrence. An edit that finds nothing is reported, not
// fatal: a student may already have reworded a line.

const edits = [
  // Harness config
  { file: CONFIG, from: "JavaScript Modules — Movie Diary", to: "JavaScript Modules — Pokédex" },
  { file: CONFIG, from: '"variant": "movie-diary"', to: '"variant": "pokedex"' },
  { file: CONFIG, from: '  "localFile": "config.js",\n', to: "" },
  { file: CONFIG, from: "journal.js", to: "pokedex.js", all: true },
  { file: CONFIG, from: "Fetch popular movies", to: "Fetch popular Pokémon" },
  { file: CONFIG, from: "Movie cards", to: "Pokémon cards" },
  { file: CONFIG, from: "Journal page display", to: "Pokédex page display" },
  { file: CONFIG, from: "Remove a film from the journal", to: "Remove a Pokémon from the Pokédex" },
  { file: CONFIG, from: "Convert journal page to ES modules", to: "Convert Pokédex page to ES modules" },
  { file: CONFIG, from: "Refactor journal page for readability", to: "Refactor Pokédex page for readability" },

  // Homepage
  { file: "index.html", from: "<title>Movie Diary</title>", to: "<title>Pokédex</title>" },
  { file: "index.html", from: "the movie cards", to: "the Pokémon cards" },
  {
    file: "index.html",
    from: /\n    <!-- Your TMDB token[\s\S]*?-->\n    <script src="config\.js"><\/script>/,
    to: "",
  },

  // Pokédex page
  { file: "pokedex.html", from: "Movie Diary — Journal", to: "Pokédex — Collection" },
  { file: "pokedex.html", from: "Journal page.", to: "Pokédex page." },
  { file: "pokedex.html", from: "journal.js", to: "pokedex.js" },

  // main.js
  { file: "main.js", from: "Fetch popular movies", to: "Fetch popular Pokémon" },
  {
    file: "main.js",
    from: "Fetch the popular movies from TMDB and show them on this page.",
    to: "Fetch a list of Pokémon from PokéAPI and show them on this page.",
  },
  { file: "main.js", from: "Movie cards", to: "Pokémon cards" },
  { file: "main.js", from: "One card per movie:", to: "One card per Pokémon:" },
  { file: "main.js", from: "The movie is stored", to: "The Pokémon is stored" },
  { file: "main.js", from: "the Journal page reads", to: "the Pokédex page reads" },
  { file: "main.js", from: "the films cannot be loaded — TMDB is down, the token is wrong, the wifi", to: "the Pokémon cannot be loaded — PokéAPI is down, the URL is wrong, the wifi" },
  { file: "main.js", from: "whether that film is already in the journal", to: "whether that Pokémon is already in the Pokédex" },

  // pokedex.js
  { file: "pokedex.js", from: "// journal.js — Journal page", to: "// pokedex.js — Pokédex page" },
  { file: "pokedex.js", from: "Journal page display", to: "Pokédex page display" },
  { file: "pokedex.js", from: "note on a movie", to: "note on a Pokémon" },
  { file: "pokedex.js", from: "Remove a film", to: "Remove a Pokémon" },
  { file: "pokedex.js", from: "Take a film back out of the journal", to: "Take a Pokémon back out of the Pokédex" },

  // .gitignore: the token file is gone, so is its entry
  { file: ".gitignore", from: /\n# Your TMDB token\.[^\n]*\n[^\n]*\nconfig\.js\n/, to: "\n" },

  // README
  { file: "README.md", from: "# Movie Diary", to: "# Pokédex" },
  { file: "README.md", from: /\nDoing the Pokédex instead\?[\s\S]*?`src\/journal\.js`\.\n/, to: "" },
  { file: "README.md", from: "navbar on **both** pages, switching between the homepage and the journal.", to: "navbar on **both** pages, switching between the homepage and the Pokédex." },
  { file: "README.md", from: "Fetch and render popular movies or Pokémon dynamically on load.", to: "Fetch and render a list of Pokémon dynamically on load." },
  { file: "README.md", from: "Each movie's image, title and info", to: "Each Pokémon's image, name and info" },
  { file: "README.md", from: "stores the movie as an object", to: "stores the Pokémon as an object" },
  { file: "README.md", from: "When the films cannot be loaded", to: "When the Pokémon cannot be loaded" },
  { file: "README.md", from: "whether that film is already in your journal", to: "whether that Pokémon is already in your Pokédex" },
  { file: "README.md", from: "The journal page lists the favourite movies", to: "The Pokédex page lists the favourite Pokémon" },
  {
    file: "README.md",
    from: /TMDB needs a free signup\. \[TMDB docs\]\([^)]*\)\n· \[PokéAPI\]\(https:\/\/pokeapi\.co\/\) \(no signup\) · /,
    to: "[PokéAPI](https://pokeapi.co/) (no signup) · ",
  },
  { file: "README.md", from: /## The setup\n\n\*\*Your TMDB token\*\*[\s\S]*?nothing about the token changes in the refactor\.\n\n/, to: "## The setup\n\nPokéAPI needs no signup and no token, so there is nothing to set up\nbefore you start.\n\n" },
  { file: "README.md", from: "`journal.html` ↔ `journal.js`).js`.", to: "`pokedex.html` ↔ `pokedex.js`)." },
  { file: "README.md", from: "`index.html` and `journal.html` as", to: "`index.html` and `pokedex.html` as" },
  { file: "README.md", from: "Convert the journal page", to: "Convert the Pokédex page" },
  { file: "README.md", from: "Restructure journal logic", to: "Restructure Pokédex logic" },
  { file: "README.md", from: "`index.html`, `journal.html`", to: "`index.html`, `pokedex.html`" },
  { file: "README.md", from: "not only saving a film but taking it", to: "not only saving a Pokémon but taking it" },
  { file: "README.md", from: "which fields of the\nfilm get stored, and what \"the film\" means", to: "which fields of the\nPokémon get stored, and what \"the Pokémon\" means" },
  { file: "README.md", from: "the journal reads\nthose fields back", to: "the Pokédex page reads\nthose fields back" },
  { file: "README.md", from: "recognise a film it\nhas seen before", to: "recognise a Pokémon it\nhas seen before" },
  { file: "README.md", from: "favourites/journal storage logic", to: "favourites/Pokédex storage logic" },
  { file: "README.md", from: "`main.js`/`journal.js`", to: "`main.js`/`pokedex.js`" },
  { file: "README.md", from: "against three in\n`journal.js`", to: "against three in\n`pokedex.js`" },
  { file: "README.md", from: "`src/home.js` / `src/journal.js`", to: "`src/home.js` / `src/pokedex.js`" },
  { file: "README.md", from: "Fetch popular movies (FR009)", to: "Fetch popular Pokémon (FR009)" },
];

// ─── Plan ────────────────────────────────────────────────────────────────────

const inverse = new Map(renames.map(([from, to]) => [to, from]));
// Where a file lives *now*, given the name the edits use for it.
const onDisk = (file) => (existsSync(path(file)) ? file : inverse.get(file) ?? file);

const contents = new Map();
const report = [];
const missing = [];

for (const edit of edits) {
  const real = onDisk(edit.file);
  if (!existsSync(path(real))) {
    missing.push(`${edit.file} does not exist, so one edit there is skipped`);
    continue;
  }
  if (!contents.has(edit.file)) contents.set(edit.file, readFileSync(path(real), "utf8"));
  const before = contents.get(edit.file);
  const hit = typeof edit.from === "string" ? before.includes(edit.from) : edit.from.test(before);
  if (!hit) {
    missing.push(`${edit.file}: nothing matching ${String(edit.from).slice(0, 60).replace(/\n/g, "\\n")}`);
    continue;
  }
  const next = typeof edit.from === "string" && edit.all
    ? before.replaceAll(edit.from, edit.to)
    : before.replace(edit.from, edit.to);
  contents.set(edit.file, next);
  report.push(edit.file);
}

const changed = [...contents].filter(([file, text]) => text !== readFileSync(path(onDisk(file)), "utf8"));

console.log(apply ? "Switching to the Pokédex.\n" : "Dry run. Nothing will be changed. Add --yes to apply.\n");

console.log("Rename:");
for (const [from, to] of renames) console.log(`  ${from} -> ${to}`);
console.log("\nDelete (PokéAPI needs no token):");
for (const f of deletions) console.log(`  ${f}`);
console.log("\nReword:");
for (const [file] of changed) {
  const n = report.filter((f) => f === file).length;
  console.log(`  ${file} (${n} edit${n === 1 ? "" : "s"})`);
}
if (missing.length) {
  console.log("\nNot found (already changed, or edited by hand):");
  for (const m of missing) console.log(`  ${m}`);
}

if (!apply) {
  console.log("\nThis cannot be undone. Going back means starting again from a fresh copy of the template.");
  console.log("Do it once, as a group, before anyone writes code.");
  console.log("\nTo apply:  node .claude/hooks/variant.mjs pokedex --yes");
  process.exit(0);
}

// ─── Apply ───────────────────────────────────────────────────────────────────

const tracked = (file) => {
  try {
    execFileSync("git", ["ls-files", "--error-unmatch", file], { cwd: root, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

// Edit first, at the old paths, then rename, so a failure part way leaves
// files under names the next run still recognises.
for (const [file, text] of changed) writeFileSync(path(onDisk(file)), text);

for (const [from, to] of renames) {
  if (tracked(from)) execFileSync("git", ["mv", from, to], { cwd: root });
  else renameSync(path(from), path(to));
}
for (const f of deletions) {
  if (tracked(f)) execFileSync("git", ["rm", "-q", "-f", f], { cwd: root });
  else rmSync(path(f));
}

console.log("\nDone. Review with `git status` and `git diff`, then commit it as one change.");
