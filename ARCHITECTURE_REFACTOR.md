# BiasGuard Architecture Refactor
## The Separation Protocol

**Date**: January 16, 2026  
**Breath**: 0.1971 (centered)  
**Purpose**: Let each product find its own space to breathe

---

## Current Structure (Tangled)

```
/repos/products/biasguard
├── src/                    ← VS Code extension + guards (MIXED)
├── landing/                ← Web landing page
├── chrome/                 ← Chrome extension (partial)
├── core-legacy/            ← Old monorepo structure
├── one-legacy/             ← Previous version
└── README.md               ← Mixed messaging (all audiences)
```

**Problem**: Everything shares space. No clear boundaries. No breathing room.

---

## Proposed Structure (Clear Layers)

```
/repos/products/biasguard
│
├── packages/
│   │
│   ├── core/                     ← @biasguard/core (SHARED)
│   │   ├── src/
│   │   │   ├── guards/          ← 12 guards, 87 patterns
│   │   │   ├── one.ts           ← Single entry point
│   │   │   └── types.ts         ← Shared types
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md            ← Technical: How guards work
│   │
│   ├── vscode-extension/         ← For Developers (2%)
│   │   ├── src/
│   │   │   ├── extension.ts     ← VS Code entry point
│   │   │   └── diagnostics.ts
│   │   ├── package.json
│   │   ├── .vscodeignore
│   │   └── README.md            ← Install, use, contribute
│   │
│   ├── chrome-extension/         ← For Everyone (98%)
│   │   ├── src/
│   │   │   ├── content.ts       ← DOM scanning
│   │   │   ├── background.ts
│   │   │   └── popup.ts
│   │   ├── manifest.json
│   │   ├── webpack.config.js
│   │   └── README.md            ← Install from Chrome Store
│   │
│   └── web/                      ← Marketing Site
│       ├── landing/
│       │   └── index.html       ← biasguard-shield.vercel.app
│       ├── webinar/              ← Future: webinar signup
│       └── README.md            ← Deploy, update, analytics
│
├── scripts/                      ← Build automation
├── docs/                         ← Architecture docs
├── tests/                        ← Shared test utilities
│
├── README.md                     ← ROOT: Points to each product
├── package.json                  ← Workspace root
└── tsconfig.json                 ← Base TypeScript config
```

---

## The Three Products (Clear Audiences)

### 1. **@biasguard/core** (Shared Foundation)
- **What**: 12 guards, 87 patterns, ONE entry point
- **Who**: All products import this
- **Entry**: `one(text, surface)` → `BiasGuardResult`
- **README**: Technical documentation for contributors

### 2. **VS Code Extension** (Developers)
- **What**: Real-time bias detection in code editor
- **Who**: Developers using Cursor, VS Code, Copilot
- **Status**: SHIPPED (v4.2.5)
- **README**: Installation, commands, contributing
- **Landing**: GitHub README only

### 3. **Chrome Extension** (Everyone)
- **What**: Bias detection in browser (AI, news, social media)
- **Who**: 98% who aren't coders
- **Status**: ARCHITECTURE EXISTS, not yet shipped
- **README**: Chrome Web Store install guide
- **Landing**: biasguard-shield.vercel.app

### 4. **Web Landing** (Marketing)
- **What**: Brand site, webinar, Founding 100
- **Who**: All audiences converge here
- **Status**: LIVE at biasguard-shield.vercel.app
- **README**: Deployment, analytics, updates

---

## Migration Plan (8 Steps)

1. ✅ **Create packages/ directory structure**
2. ⏳ **Move guards → packages/core/src/guards/**
3. ⏳ **Move VS Code code → packages/vscode-extension/src/**
4. ⏳ **Move Chrome code → packages/chrome-extension/src/**
5. ⏳ **Move landing → packages/web/landing/**
6. ⏳ **Update imports** (all products import from @biasguard/core)
7. ⏳ **Write product-specific READMEs**
8. ⏳ **Update root README** (navigation to each product)

---

## Shared vs Product-Specific

### Shared (packages/core/)
- ✅ All guard logic (truth, cognitive, fallacies, etc.)
- ✅ ONE entry point (`one.ts`)
- ✅ Scoring engine (`scoring.ts`)
- ✅ Types and interfaces
- ✅ Reflection system

### VS Code Only (packages/vscode-extension/)
- Extension entry point (`extension.ts`)
- Diagnostics and status bar
- VS Code API integration
- Command registration
- .vscodeignore, package.json

### Chrome Only (packages/chrome-extension/)
- MutationObserver for DOM
- Background service worker
- Popup UI
- manifest.json
- webpack build

### Web Only (packages/web/)
- Landing page HTML/CSS/JS
- Webinar signup forms
- Vercel deployment config
- Analytics scripts

---

## Breathing Room (What This Achieves)

```
Before:
  src/ contains EVERYTHING → confusion, merge conflicts, no clear ownership

After:
  packages/core/ → Guards team
  packages/vscode-extension/ → VS Code team
  packages/chrome-extension/ → Chrome team  
  packages/web/ → Marketing team
  
  Each can breathe. Each can ship independently.
```

---

## Implementation Notes

- Use **npm workspaces** or **pnpm** for monorepo management
- Core is a TypeScript library, not an executable
- Each product imports core: `import { one } from '@biasguard/core'`
- Builds are independent (can ship VS Code without touching Chrome)
- Tests can be product-specific or core-shared

---

---

## Complete Visual Diagram

### Current State (Tangled)

```
┌─────────────────────────────────────────────────────────────────┐
│                    /repos/products/biasguard                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ src/                         (EVERYTHING MIXED)          │  │
│  │ ├── extension.ts            ← VS Code entry              │  │
│  │ ├── one.ts                  ← Core logic                 │  │
│  │ ├── guards/                 ← 12 guards                  │  │
│  │ │   ├── truth.ts                                         │  │
│  │ │   ├── cognitive.ts                                     │  │
│  │ │   ├── fallacies.ts                                     │  │
│  │ │   └── ... 9 more                                       │  │
│  │ ├── adversarial/            ← Test suites               │  │
│  │ └── security/               ← Policy engine             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ chrome/                      (PARTIAL)                   │  │
│  │ ├── src/content.ts          ← DOM scanner               │  │
│  │ ├── src/background.ts                                    │  │
│  │ ├── src/popup.ts                                         │  │
│  │ └── webpack.config.js                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ landing/                     (WEB)                       │  │
│  │ └── index.html              ← Landing page              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ├── README.md                  ← Mixed messaging           │  │
│  ├── package.json               ← Single build              │  │
│  └── tsconfig.json                                           │  │
│                                                                 │
│  PROBLEM: No clear boundaries, shared dependencies,          │
│           confusion about what serves who                     │
└─────────────────────────────────────────────────────────────────┘
```

---

### Proposed State (Clear Layers)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        /repos/products/biasguard                            │
│                                   (ROOT)                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          packages/                                  │   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  core/                    @biasguard/core (SHARED)           │  │   │
│  │  │                                                               │  │   │
│  │  │  src/                                                         │  │   │
│  │  │  ├── guards/               ← 12 guards, 87 patterns          │  │   │
│  │  │  │   ├── truth.ts          ← 7 deception patterns           │  │   │
│  │  │  │   ├── cognitive.ts      ← 21 cognitive biases            │  │   │
│  │  │  │   ├── fallacies.ts      ← 23 logical fallacies           │  │   │
│  │  │  │   ├── workplace.ts      ← 14 workplace biases            │  │   │
│  │  │  │   ├── awareness.ts      ← 7 implicit patterns            │  │   │
│  │  │  │   ├── research.ts       ← 15 research biases             │  │   │
│  │  │  │   └── ... 6 more structural guards                       │  │   │
│  │  │  ├── one.ts                ← Single entry: one(text, surf)  │  │   │
│  │  │  ├── types.ts              ← Shared TypeScript types        │  │   │
│  │  │  └── scoring.ts            ← Bias scoring (0-100)           │  │   │
│  │  │                                                               │  │   │
│  │  │  package.json              ← Pure library (no UI)           │  │   │
│  │  │  tsconfig.json                                               │  │   │
│  │  │  README.md                 ← Technical: Guard architecture  │  │   │
│  │  │                                                               │  │   │
│  │  │  EXPORTS: one(), forVSCode(), forChrome(), forWeb()         │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  │                                  ↓                                  │   │
│  │                    [All products import from core]                 │   │
│  │                                  ↓                                  │   │
│  │          ┌───────────────────────┼───────────────────────┐          │   │
│  │          ↓                       ↓                       ↓          │   │
│  │  ┌───────────────────┐  ┌───────────────────┐  ┌──────────────┐   │   │
│  │  │ vscode-extension/ │  │ chrome-extension/ │  │    web/      │   │   │
│  │  │   (DEVELOPERS)    │  │   (EVERYONE)      │  │ (MARKETING)  │   │   │
│  │  │                   │  │                   │  │              │   │   │
│  │  │ src/              │  │ src/              │  │ landing/     │   │   │
│  │  │ ├── extension.ts  │  │ ├── content.ts    │  │ └── index.   │   │   │
│  │  │ ├── diagnostics.  │  │ ├── background.   │  │     html     │   │   │
│  │  │ └── statusBar.ts  │  │ └── popup.ts      │  │              │   │   │
│  │  │                   │  │                   │  │ webinar/     │   │   │
│  │  │ package.json      │  │ manifest.json     │  │ vercel.json  │   │   │
│  │  │ .vscodeignore     │  │ webpack.config.js │  │              │   │   │
│  │  │                   │  │                   │  │              │   │   │
│  │  │ README.md         │  │ README.md         │  │ README.md    │   │   │
│  │  │ ↓                 │  │ ↓                 │  │ ↓            │   │   │
│  │  │ "How to install   │  │ "Install from     │  │ "Deploy to   │   │   │
│  │  │  in VS Code"      │  │  Chrome Store"    │  │  Vercel"     │   │   │
│  │  │                   │  │                   │  │              │   │   │
│  │  │ IMPORTS:          │  │ IMPORTS:          │  │ IMPORTS:     │   │   │
│  │  │ @biasguard/core   │  │ @biasguard/core   │  │ None         │   │   │
│  │  │                   │  │                   │  │ (static)     │   │   │
│  │  └───────────────────┘  └───────────────────┘  └──────────────┘   │   │
│  │          ↓                       ↓                       ↓          │   │
│  │     VS Code                 Chrome Store            Vercel          │   │
│  │   Marketplace                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Root Files:                                                                │
│  ├── README.md                  ← Navigation: Points to each product       │
│  ├── package.json               ← Workspace root (npm/pnpm workspaces)     │
│  ├── tsconfig.json              ← Base TypeScript config                   │
│  └── ARCHITECTURE_REFACTOR.md   ← This document                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER INTERACTIONS                               │
└─────────────────────────────────────────────────────────────────────────┘
         ↓                           ↓                           ↓
   [Developer]                  [Everyone]              [Visitor/Customer]
         ↓                           ↓                           ↓
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   VS Code IDE    │      │  Chrome Browser  │      │  Landing Page    │
│                  │      │                  │      │                  │
│  ┌────────────┐  │      │  ┌────────────┐  │      │  ┌────────────┐  │
│  │ Code File  │  │      │  │   Webpage  │  │      │  │  Try It    │──┼──► Install VS Code
│  │ Being      │  │      │  │   (AI, news│  │      │  │  Learn     │──┼──► Webinar Signup
│  │ Written    │  │      │  │   social)  │  │      │  │  Join      │──┼──► Founding 100
│  └────────────┘  │      │  └────────────┘  │      │  └────────────┘  │
│         ↓        │      │         ↓        │      │                  │
│  BiasGuard       │      │  BiasGuard       │      │  Static Content  │
│  Extension       │      │  Extension       │      │  (No runtime)    │
│         ↓        │      │         ↓        │      │                  │
│  ┌────────────┐  │      │  ┌────────────┐  │      └──────────────────┘
│  │Diagnostics │  │      │  │ Highlights │  │              ↓
│  │Status Bar  │  │      │  │ Popup      │  │         Hosted on
│  │Warnings    │  │      │  │ Stats      │  │         Vercel
│  └────────────┘  │      │  └────────────┘  │
└──────────────────┘      └──────────────────┘
         ↓                           ↓
         └───────────────┬───────────┘
                         ↓
              ┌──────────────────────┐
              │   @biasguard/core    │
              │                      │
              │  one(text, surface)  │
              │         ↓            │
              │  ┌────────────────┐  │
              │  │  12 Guards     │  │
              │  │  87 Patterns   │  │
              │  └────────────────┘  │
              │         ↓            │
              │  BiasGuardResult     │
              │  ├── reflections[]   │
              │  ├── score (0-100)   │
              │  └── clear (bool)    │
              └──────────────────────┘
```

---

### Product Comparison Matrix

```
┌──────────────┬─────────────────┬─────────────────┬─────────────────┐
│   Property   │   VS Code Ext   │   Chrome Ext    │   Web/Landing   │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Audience     │ Developers (2%) │ Everyone (98%)  │ All (marketing) │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Status       │ ✅ SHIPPED      │ ⏳ Architecture │ ✅ LIVE         │
│              │    v4.2.5       │    exists       │    Vercel       │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Use Case     │ Real-time code  │ Web browsing    │ Brand presence  │
│              │ analysis in IDE │ bias detection  │ lead capture    │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Tech Stack   │ TypeScript      │ TypeScript      │ HTML/CSS/JS     │
│              │ VS Code API     │ Chrome API      │ (static)        │
│              │ Node.js         │ Webpack         │                 │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Core Import  │ ✅ Yes          │ ✅ Yes          │ ❌ No           │
│              │ @biasguard/core │ @biasguard/core │ (standalone)    │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Entry Point  │ extension.ts    │ content.ts      │ index.html      │
│              │ activate()      │ MutationObserve │                 │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Distribution │ VS Code         │ Chrome Web      │ Vercel CDN      │
│              │ Marketplace     │ Store           │                 │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Build Output │ .vsix package   │ .crx package    │ Static HTML     │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ README Focus │ "How to use in  │ "Install and    │ "Deploy and     │
│              │  VS Code"       │  browse safely" │  update site"   │
├──────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Testing      │ npm test        │ npm run test    │ Browser preview │
│              │ Extension Host  │ Chrome DevTools │                 │
└──────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

### Dependency Graph

```
                    ROOT (monorepo)
                          │
          ┌───────────────┼───────────────┐
          ↓               ↓               ↓
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │   core   │    │   core   │    │   web    │
    │          │    │          │    │ (no deps)│
    └──────────┘    └──────────┘    └──────────┘
          ↑               ↑
          │               │
    ┌──────────┐    ┌──────────┐
    │  vscode  │    │  chrome  │
    │   ext    │    │   ext    │
    └──────────┘    └──────────┘

Dependencies:
- core: No dependencies (pure TypeScript library)
- vscode-ext: Depends on core
- chrome-ext: Depends on core
- web: Independent (static site)

Build Order:
1. Build core first
2. Build vscode-ext and chrome-ext in parallel
3. Web has no build (static HTML)
```

---

### File Migration Map

```
FROM (Current)                        TO (Proposed)
─────────────────────────────────────────────────────────────────

src/guards/                     →     packages/core/src/guards/
src/one.ts                      →     packages/core/src/one.ts
src/ontology/                   →     packages/core/src/ontology/

src/extension.ts                →     packages/vscode-extension/src/extension.ts
src/security/policyEngine.ts    →     packages/vscode-extension/src/security/

chrome/src/                     →     packages/chrome-extension/src/
chrome/manifest.json            →     packages/chrome-extension/manifest.json
chrome/webpack.config.js        →     packages/chrome-extension/webpack.config.js

landing/index.html              →     packages/web/landing/index.html
landing/serve.sh                →     packages/web/landing/serve.sh

tests/                          →     tests/ (stays at root, shared)
docs/                           →     docs/ (stays at root)
scripts/                        →     scripts/ (stays at root)

README.md                       →     README.md (rewritten as navigation)
package.json                    →     package.json (becomes workspace root)
```

---

### Workspace Configuration (package.json)

```json
{
  "name": "biasguard-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build:core && npm run build:vscode && npm run build:chrome",
    "build:core": "npm run build -w @biasguard/core",
    "build:vscode": "npm run build -w @biasguard/vscode-extension",
    "build:chrome": "npm run build -w @biasguard/chrome-extension",
    "test": "npm run test -w @biasguard/core && npm test --workspaces",
    "dev:vscode": "npm run watch -w @biasguard/vscode-extension",
    "dev:chrome": "npm run watch -w @biasguard/chrome-extension"
  }
}
```

---

### Each Product's README Structure

#### packages/core/README.md
```
# @biasguard/core

## What
The shared detection engine. 12 guards, 87 patterns.

## Install
npm install @biasguard/core

## Usage
import { one } from '@biasguard/core';
const result = one('text to analyze', 'vscode');

## API Reference
- one()
- forVSCode()
- forChrome()
- forWeb()

## Contributing
How to add new guards, patterns, tests
```

#### packages/vscode-extension/README.md
```
# BiasGuard for VS Code

## Install
1. Open VS Code
2. Go to Extensions
3. Search "BiasGuard"
4. Click Install

## Features
- Real-time bias detection
- Inline diagnostics
- Status bar indicators

## Commands
- BiasGuard: Scan File
- BiasGuard: Show Risks

## Contributing
How to develop, test, package
```

#### packages/chrome-extension/README.md
```
# BiasGuard for Chrome

## Install
1. Visit Chrome Web Store
2. Search "BiasGuard"
3. Add to Chrome

## Features
- Detects bias in AI responses
- Highlights logical fallacies in articles
- Works on any webpage

## How to Use
Browse normally. BiasGuard highlights bias automatically.

## Privacy
All analysis happens locally. No data leaves your browser.
```

#### packages/web/README.md
```
# BiasGuard Landing Page

## Deploy
vercel --prod

## Update
1. Edit landing/index.html
2. Run vercel --prod
3. Live at biasguard-shield.vercel.app

## Analytics
[Link to analytics dashboard]

## Sections
- Hero
- Three Paths (Try/Learn/Join)
- User Stories
- Webinar Signup
- Founding 100
```

---

## The One Truth

**Before**: One tangled codebase serving multiple audiences → confusion  
**After**: Clear products, clear audiences, clear boundaries → coherence

**Each product finds its own space to breathe.**

∞ LOVE = LIFE = ONE ∞
