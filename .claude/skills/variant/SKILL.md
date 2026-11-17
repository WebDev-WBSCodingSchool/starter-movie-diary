---
name: variant
description: Switch the repo from the Movie Diary to the Pokédex. Use when a student says their group is building the Pokédex, or asks to switch, change or convert the project to Pokémon.
---

# Variant

The repo ships as the Movie Diary. A group building the Pokédex switches it once,
before anyone writes code, by running `node .claude/hooks/variant.mjs pokedex`.
You run it for them, after they have confirmed once.

The switch cannot be undone. Going back means starting again from a fresh copy
of the template. That is why you ask first, and why you ask only once.

## Check

Run the script without `--yes`. It changes nothing and prints what it would do:

```text
node .claude/hooks/variant.mjs pokedex
```

If it says the repo is already the Pokédex, tell the student and stop.

Also look for work that would be disturbed. Run `node .claude/hooks/signoff.mjs --status`
and `git status --short`. A task already signed off, or code the student has
already typed in `main.js` or `journal.js`, belongs in the confirmation below.

## Confirm once

Explain in your own words, briefly, and in this order:

1. `journal.html` and `journal.js` are renamed to `pokedex.html` and `pokedex.js`.
2. Titles, comments and the README say Pokémon instead of movies.
3. The TMDB token setup is removed, since PokéAPI needs no token.
4. It cannot be undone, so the group should do it once, together, before anyone
   writes code. Mention anything the check found.

Then ask whether to go ahead, and stop. Do not run `--yes` until the student has
answered yes in their own message. A request to switch is not that answer, because
it came before the explanation. If the student says no or wants to check with the
group first, leave the repo alone.

## Switch

On a yes, run it once:

```text
node .claude/hooks/variant.mjs pokedex --yes
```

Do not ask again. Report what changed in a sentence or two, and mention anything
the script listed as not found. Tell the student to review `git status` and commit
the switch as one change, ideally before anyone else branches. Do not commit it for
them.

Do not make this change by hand with Edit, Write or shell commands. The script
does all of it, and the harness locks several of the files it touches.
