# NumboDeck – Modular Presentation Framework
[![Live](https://img.shields.io/badge/🌐_Live-slides.chattylabs.dev-00ff88?style=flat-square)](https://slides.chattylabs.dev)

NumboDeck is a *mysteriously brilliant* presentation framework written in vanilla **JavaScript**.<br />
Slides are dynamically loaded via **JSON**, animated through pluggable modules, and styled like a dream – from minimalist terminal talks to Studio Ghibli feels.

## 🚀 Quick Start

1. Clone or download this repo
2. Open `index.html` in any ~~modern browser~~ (LiveServer recommended)
3. Pick a module and hit **[Start]**

## 🧩 How It Works

- `config/modules.json`: Lists all available slide modules
- `config/<module>.json`: Lists HTML slides + optional landing slide
- `pages/<module>/`: Contains individual HTML slide files
- `styles/`: CSS themes per slide or per module
- `logic/`: Modular JS system for loading, animation, and UI

## 💡 Features

✅ JSON-powered modules  
✅ Slide-by-slide HTML injection  
✅ Auto-style & script injection  
✅ Arrow-key + UI navigation  
✅ Progress bar (dynamic & clean)  
✅ Codex-friendly structure  
✅ GitHub Pages deployable

## 💫 Themes

Start with:
- `theme-tech.css` – sleek for dev talks
- `theme-cute.css` – cozy pastel presentation vibes

Switch styles via `config/<module>.json` or per-slide `<link>` tags.

## 🔌 Plugins (W.I.P)

Animation plugins go in `logic/`.  
Activate via `config/modules.json` under `plugins`.

```json
{
  "name": "sql_injection",
  "title": "SQL 101",
  "plugins": ["basic-anim.js"]
}
