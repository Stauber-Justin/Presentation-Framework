# Repository Guide

This project is a static web presentation framework. Slides are loaded dynamically from HTML files defined in `config/*.json`.

## Structure
- `logic/`: JavaScript modules for loading slides and navigation.
- `pages/<module>/`: HTML slides grouped by presentation.
- `styles/`: CSS themes.
- `.codex/`: Metadata and summaries.

## Coding Guidelines
- Keep scripts modular. Do not manipulate layout positions in JavaScript.
- Use CSS for centering and visual layout.
- When adding slides, update the matching config JSON.

## Checks
Run these commands before committing changes:

```bash
npx eslint .
npx stylelint "**/*.css"
npx htmlhint "**/*.html"
```
