This repository is a collection of small frontend exercises (HTML/CSS/vanilla JS and Bootstrap) used for teaching.

Quick context
- Purpose: standalone exercises grouped by modules under `MÓDULO 1` and `MÓDULO 2-HTML-CSS-BOOTSRAP`.
- No build system or package manager is used: projects are plain static files (open `index.html` in a browser or use a static file server).

Where to look
- High-level: `README.md` (root) lists the activities and modules.
- JavaScript examples: `MÓDULO 1/MÓDULO-JAVASCRIPT/01-Atividades-Lógica-de-Programação`.
- HTML/CSS/Bootstrap examples: `MÓDULO 2-HTML-CSS-BOOTSRAP/*` (each activity contains its own `index.html`, `css/`, `js/`, `imagens/`).

Project patterns and conventions
- Files are standalone exercises; prefer minimal, DOM-first vanilla JS patterns (query selectors, direct DOM mutation). Example: `MÓDULO 2-HTML-CSS-BOOTSRAP/ATIVIDADE-5/Questão-2-Simulador-de-empréstimos/simulador-de-empréstimo.js` uses `document.querySelector` and template strings to build table rows.
- Naming: many non-ASCII characters and spaces are present in directory names (e.g., `MÓDULO 2-HTML-CSS-BOOTSRAP`). Use exact path matching when referencing files.
- Character encoding: repository contains Portuguese text; preserve UTF-8 encoding when modifying files.

Developer workflows (what humans do)
- Run/preview: open a file like `MÓDULO 2-HTML-CSS-BOOTSRAP/ATIVIDADE-1-HTML, CSS/01-Currículo/curriculo.html` in a browser or run a simple static server (Python: `python -m http.server 8000`) from the repository root and open `http://localhost:8000/`.
- Edit feedback loop: make small edits to the standalone files and refresh the browser. No bundling step required.

What Copilot-style agents should do
- Work at the file/folder level: make changes localized to the exercise being edited unless the user asks for cross-module refactors.
- Preserve file encodings and localized text (Portuguese). When editing paths or filenames, match exact casing and diacritics.
- When adding helper tooling (e.g., package.json, dev server), explain the change in the PR and keep it optional — this repo's intent is educational and lightweight.

Examples to reference in PRs
- Use `MÓDULO 2-HTML-CSS-BOOTSRAP/ATIVIDADE-5/Questão-2-Simulador-de-empréstimos/` as a model for adding JS that manipulates the DOM and builds tables.
- Use `MÓDULO 1/MÓDULO-JAVASCRIPT/01-Atividades-Lógica-de-Programação/` for very small, self-contained JS functions.

Constraints and gotchas
- Avoid introducing a mandatory build step (no `package.json` exists). If requested, add tooling in a separate commit and document how to opt-in.
- Many filenames contain spaces and parentheses; use quoting when running shell commands on Windows PowerShell.

If you need more
- Ask the repo owner which exercises should be modernized (ES modules, bundlers, tests) and whether adding CI or package management is acceptable.

Requested review
- After applying changes, run a quick manual check by opening the modified HTML files in a browser to confirm no encoding or path regressions were introduced.
