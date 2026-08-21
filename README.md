# Movie Diary — 005 JS Modules

Five days (full time) / ten days (part time). Group project, mandatory
presentation at the end.

This repo is your starting point. **Fork it once for your group** and add your
team members as collaborators — one fork, everyone works in it, every change
merges to `main` through a Pull Request.

Doing the Pokédex instead? Same requirements, same rules. Rename `journal.html`
and `journal.js` to `pokedex.*` and change the two matching lines in
`.claude/harness/config.json`.

## Where you are

Five stages. Each one says what ends it, because that is the part nobody can see
from inside it.

1. **Fork it, clone it, run `/onboard`.** Ends when the only thing the check still
   objects to is `PLAN.md` — that one is stage 2, and it stays red until you get
   there. Everything above it should be a tick.
2. **Meet, and write `PLAN.md` together.** Ends when the check is green: every
   member listed has a task line, and your own git email is one of them. Until
   then the agent writes no code for anyone in the group.
3. **Pick a task, cut a branch.** `git switch -c <task-id>-<short-name>`. Ends when
   you have somewhere to put the work that is not `main`.
4. **Write it, commit it, explain it.** Ends when the sign-off records — it tells
   you what just opened up.
5. **Open a Pull Request.** Ends when it is merged. Then back to 3 with the next
   task.

## The requirements

| ID | Requirement | Description |
| --- | --- | --- |
| FR001 | Group Project | Work collaboratively; all members share responsibility. |
| FR002 | Group-Work Guidelines | Follow the bootcamp's group-work best practices. |
| FR003 | Public GitHub Repository | One **public** repo. Do **not** add instructors as collaborators. |
| FR004 | Incremental Development | Every change merges into `main` via a Pull Request. |
| FR005 | Core Web APIs | Demonstrate **DOM**, **Web Storage** and **Fetch**. |
| FR006 | TailwindCSS | Style the application exclusively with Tailwind. |
| FR007 | File Structure | Two pages: `index.html` ↔ `main.js`, `journal.html` ↔ `journal.js`. |
| FR008 | Navigation Bar | A navbar on **both** pages, switching between Homepage and Journal. |
| **FR009** | Fetch Popular Movies | On the Homepage, fetch and display popular movies from the TMDB API. |
| **FR010** | Search with Dialog | A search bar; on submit, show results or feedback in a dialog. |
| **FR011** | Movie Cards | Each movie's image, title and info in a card. |
| **FR012** | Add to Favourites | An "add to favourites" button stores the movie as an object in an array in `localStorage`. |
| **FR013** | Journal Page | The Journal page lists favourite movies from `localStorage` — image, title, info. |
| **FR014** | Personal Notes | Add notes to a movie; persist the note on the same object in `localStorage`. |

**Bold = you type this one yourself.** The others the agent can write with you from
day one.

TMDB needs a free signup. [TMDB docs](https://developer.themoviedb.org/docs/getting-started)
· [PokéAPI](https://pokeapi.co/) (no signup) · [Tailwind docs](https://tailwindcss.com/docs/installation)

## The setup

**This project is vanilla JavaScript: two pages, plain `<script>` tags, Tailwind
from a CDN. No build step, no npm, no imports.** Bundlers, modules and Vite come
later in this unit — they are not wrong, they are just not what this project is
made of, and adding one mid-project means every teammate's clone stops working
until they run an install step. Ask the agent about any of it; it will answer, and
it will tell you when an answer would change how the project is built.

**Your TMDB token** goes in `config.js`, which you make by copying
`config.example.js`. That copy is gitignored, so your token stays out of the
history; the template stays committed so the next person knows what to make. This
is a stopgap and you should know it: the token is a global variable in a public
page, readable by anyone who opens it. Keeping a credential properly secret needs
a server holding it for you, which is further down the course. If a token does get
committed, generate a new one — a token that has been public once is burned.

## What you type, and what the agent types

**The JavaScript in FR009–FR014 is yours to type.** Fetching data, building DOM
elements, and reading and writing `localStorage` are the three things this module
exists to teach, and typing them is how you learn them.

Ask the agent for that code and it will not write it for you. It explains in plain
English what the code has to do and where it goes, then points you at the
documentation, then — if you have tried and are still stuck — walks you through the
steps. Each of those needs you to have written something since the last one.

**Everything else the agent can write, from day one:**

- All markup and all Tailwind — `index.html`, `journal.html`, every class string.
- The navbar and page plumbing (FR006–FR008).
- Anything past the requirements: extra features, polish, ideas of your own.
- Explaining what a requirement means, reading errors with you, and working out
  which lines came from which branch after a messy merge. It will not resolve a
  conflict for you — in this project, the conflicts are the lesson.

**The agent waits to be asked.** It will not start building because a file is empty
or because your plan is finished — none of this is a to-do list it works through on
its own. Ask it for what you want, and expect it to ask you back when there is
something to decide.

Yes, this tells you exactly what you could paste into a browser chat instead. You
are being told the rule rather than fenced in by it, because a rule you can read is
one you can decide to keep.

## Write it, commit it, explain it

When you have written one of the tasks marked in bold above:

```
1. Write it.
2. Commit it.   git add <your file> && git commit --signoff -m "<task id>: <what it does>"
3. Explain it.  The agent asks what your commit does, then a few short questions.
```

**Step 3 is the one worth having.** Explaining code you have just written is how
you find out whether you understood it, and it works the same whether anyone is
listening or not. Expect one question about what your commit does and up to three
short follow-ups: more for a big commit, fewer for a small one. Nothing is graded
and nothing you say is written down — the commit ahead of it in the history is
already the record of who wrote what.

**What changes afterwards.** Once you have written and explained one piece of a
given kind of code, the agent will write that kind with you for the rest of the
project — including in features that are nowhere in the requirements.

Which of the tasks marked in bold you have done is kept in a small file under
`.claude/harness/progress/`, filed under your git email. The agent writes it once you
have explained your commit; you commit it like anything else. Ask it where you
stand whenever you want to know.

### Signing your commits

`git commit --signoff` adds one line to the commit message:

```
Signed-off-by: Lea Müller <lea.mueller@example.com>
```

It means **I wrote this code**. It is an ordinary git trailer — you will meet it in
real projects. Nothing here checks it, and it is worth doing anyway.

Use it on your own work throughout the project, not only on the tasks marked in
bold. When the agent wrote or helped write something, the commit carries a
`Co-Authored-By: Claude …` line instead, which it adds itself. Between the two,
`git log` shows who wrote what — which is more use to all of you than trying to
remember in week three.

### Reviewing a teammate's code counts

If a teammate wrote one of their tasks, post a real review on their Pull Request
and answer the agent's questions about their code, and the agent will write
`fetch` code with you too — even after the PR has merged. Tell it which PR; it
records the same way.

It is capped: you can never have more reviewed tasks than written ones, so the
first one is always your own. Nobody can sit out the writing, and everyone reads
every part of the project rather than just their own two tasks.

## Before any of that: `PLAN.md`

**The agent writes no code for anyone in the group until `PLAN.md` exists and
every member listed in it has at least one task.** Meet first — one call, one
screen shared — and write it together.

Two halves. First, a short restatement **in your own words**: what you are
building, who uses it, what "done" looks like, and what each of you thought FR012
meant. Ask that last one out loud, one at a time, before anyone hears the others;
it is the question that finds the split assumption while it is still cheap.

Then the split. Everyone's **git email** — the address `git config user.email`
prints — and each of you again on the task you took:

```markdown
## Who's in the group
- Jane Student — jane.student@mail.com
- Mo Ahmadi — mo.ahmadi@mail.com

## The split
- Fetch popular movies (FR009) — Jane
- Search bar + dialog (FR010) — Mo Ahmadi
```

That is the whole format. A list, a table, prose, German, English — it does not
care. Each of you has to turn up twice: once in the member list with your **git**
email, and again on the task you took. On the task line your name is enough — the
address is only needed once, because that is what your progress is filed under.

Run `/onboard` and the agent will run the conversation, ask the awkward questions,
and check the file. **It will not write a word of it** — `PLAN.md` is what the
check reads, so an agent that could write it could clear its own way.

**The check is live.** Edit `PLAN.md` so that someone has no task and the agent
stops writing code for everyone until the line is fixed. There is nothing to
re-run: it reads the file again on the next write. That is the accountability
part, and it is meant to be visible rather than clever. If someone has actually
left the group, take them off the member list — that is the right answer, not a
slight.

A sketch is enough and it is allowed to change. The question is whether you have a
plan, never whether it was any good.

## Splitting the work

`PLAN.md` is the kickoff snapshot. **From then on your tasks are GitHub Issues on
your fork** — `/onboard` can create them from your task lines, or make them by
hand; the issues are the live version and nothing syncs them back.

Write them yourselves either way — the agent will not hand you a breakdown. Once
you have a draft it will tell you if the load looks lopsided, if something is
blocked on two other people, or if two of you are about to land in the same
function.

That last one will happen. FR007 fixes you to two JS files and there are six core
tasks, so you will get merge conflicts. Resolve them together; that is the point.

Ask for help if you are stuck for more than 30 minutes. Use the daily stand-ups.

## Running it

Open **this folder** in VS Code and start Claude Code from the repo root. Starting
it from a subfolder silently drops this folder's settings, which mostly means the
agent starts writing code it should be helping you write.

Your progress is filed under your git email, so set it once and use the same one
on every machine you work from — otherwise the work you did in the lab and the
work you did at home end up in two separate records, and neither counts for the
other.

**If you want the agent to talk differently** — simpler language, shorter answers,
more or less detail — say so, and ask it to save that as a personal skill in
`~/.claude/skills/`. It travels with you to the next project, so you only have to
ask once. It changes how the agent talks, not what it may write.

Inline suggestions (Copilot-style ghost text) are turned off for this folder in
`.vscode/settings.json`. That file is read-only, and the agent cannot write to it
at all — otherwise it could hand ghost text back in a single edit, and ghost text
is the one form of help that arrives without being asked for.

**This file is read-only too**, along with `CLAUDE.md`. This page is the
requirements: it is what the agent reads to work out what it may write for you and
what it may only talk you through, so it is not a page the agent gets to reword.
`PLAN.md` is read-only to the agent as well, for a different reason: it is yours,
and it is what the check reads. Your own writing about your project goes in files
you make — `PLAN.md`, your Issues, whatever else you want.

If you think a requirement is wrong or unclear, say so to your instructor. That is
a conversation, not a diff.

None of these locks is a cage, and you should know that up front: read-only here
means VS Code refuses the keystroke, and there is a setting that turns that off, and
there are other editors. What none of it can do is happen quietly. Every file named
above is committed, so however you go about changing one, it lands in your PR with
your name on it. That is the whole mechanism — not "you can't", but "it's visible".
