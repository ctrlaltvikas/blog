# Thinking Bytes ⚡

> An editorial engineering publication combining **Medium's refined typography** with **Dev.to's developer-first interactivity**, self-hosted on **GitHub Pages** and powered by **Astro 5**.

![Astro](https://img.shields.io/badge/Astro-5.x-orange.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue.svg)
![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-22c55e.svg)
![License](https://img.shields.io/badge/License-GPL_v3-purple.svg)

---

## 🌟 Key Innovations & Features

### 📖 Medium-Inspired Editorial Craft
- **Distraction-Free Canvas**: Carefully tuned typography with optimal reading measure (~720px) and generous line heights.
- **Reading Mode Adjuster**: Toggle between **Newsreader Serif** (Medium style) and **Inter Sans-serif** on the fly, with 3 font size levels (`A-`, `A`, `A+`) saved to `localStorage`.
- **Text-to-Speech (TTS) Narration**: Built-in audio player using the native browser Web Speech API. Listen to any article with variable speeds (`1x`, `1.25x`, `1.5x`, `2x`) and an animated sound visualizer. Zero external APIs or keys required.
- **Floating Quote Tooltip**: Select any sentence to instantly copy it formatted as a Markdown blockquote or tweet it with attribution.
- **Top Reading Progress**: Sleek gradient bar tracking scroll progress.
- **Active Table of Contents**: Sticky sidebar with smooth scroll and real-time scrollspy highlighting.

### 💻 Dev.to-Inspired Developer Experience
- **Interactive Reaction Dock**: Floating side dock (desktop) and sticky bottom bar (mobile) featuring multi-reactions:
  - ❤️ **Heart** (Like)
  - 🚀 **Rocket** (Super Awesome)
  - 💡 **Mindblown** (Insightful)
  - 🔖 **Bookmark** (Save locally)
  - 🔗 **Share** (Native Web Share / Copy link)
  - Includes micro-pop animations, floating emoji particles, and persistent counters in `localStorage`.
- **Rich Code Blocks**: Language badges, VS Code Shiki dark/light themes, and one-click copy buttons with animated feedback.
- **Topic Pills & Tags**: Horizontal topic navigator with active indicators, tag clouds, and post count metrics.

### ⚡ Technical Velocity
- **100/100 Lighthouse Performance**: HTML-first zero-JS default using Astro's Islands Architecture.
- **Instant Spotlight Search (`⌘K` / `Ctrl+K`)**: Blazing fast client-side fuzzy search across all titles, descriptions, and tags with keyboard navigation.
- **Chronological Date-wise Archive (`/archive`)**: Visual timeline grouping all stories by Year and Month.
- **Full RSS 2.0 & Sitemap**: Automatically generated `/rss.xml` and `/sitemap-index.xml`.
- **Dark & Light Mode**: Zero-flicker theme toggle respecting system preferences.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v20+ or v22+
- **npm** or **pnpm**

### 2. Local Development
```bash
# Clone the repository
git clone https://github.com/ctrlaltvikas/blog.git
cd blog

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

---

## ✍️ How to Publish New Stories

Adding new content is completely effortless. You can either use the built-in scaffolding CLI or manually add a markdown file.

### Option A: The CLI Scaffolder (Recommended)

Run the interactive post generator:

```bash
npm run new-post "Architecting High-Throughput Event Streams"
```

The script will:
1. Automatically date-stamp the filename (`YYYY-MM-DD-slug.md`).
2. Prompt for category and tags (or use intelligent defaults).
3. Generate the file inside `src/content/blog/` with complete boilerplate and pre-configured frontmatter.

### Option B: Manual File Creation

Create a new file in `src/content/blog/`:

```
src/content/blog/2026-11-05-my-new-post.md
```

With frontmatter schema:

```yaml
---
title: "Understanding Raft Consensus in 15 Minutes"
description: "A practical breakdown of leader election, log replication, and split-brain resolution in distributed consensus algorithms."
pubDate: 2026-11-05
author: "Vikas Yadav"
category: "Distributed Systems"
tags: ["distributed-systems", "consensus", "raft", "architecture"]
featured: true   # Set true to highlight on the homepage hero
draft: false     # Set true to keep hidden from production builds
---

## Introduction

Your story content in standard Markdown or MDX...
```

Once written, just commit and push to GitHub:
```bash
git add src/content/blog/
git commit -m "feat: publish story on raft consensus"
git push origin master
```
The GitHub Actions workflow will automatically build and publish your story to GitHub Pages in ~60 seconds!

---

## 🛠️ Configuration & Customization

All site metadata and author details are centralized in `src/consts.ts`:

```typescript
// src/consts.ts
export const SITE_TITLE = 'Thinking Bytes';
export const SITE_TAGLINE = 'Notes on Software Engineering, Distributed Systems, AI & Modern Web';
export const SITE_DESCRIPTION = '...';

export const AUTHOR = {
  name: 'Vikas Yadav',
  handle: '@ctrlaltvikas',
  avatar: 'https://avatars.githubusercontent.com/u/1206121?v=4',
  bio: 'Staff Software Engineer & Systems Architect...',
  github: 'https://github.com/ctrlaltvikas',
  twitter: 'https://twitter.com/',
  linkedin: 'https://linkedin.com/in/',
  location: 'Bengaluru, India',
};
```

### GitHub Pages & Custom Domain Setup

- **Default GitHub Pages URL**: `https://<username>.github.io/<repo>/` (e.g. `https://ctrlaltvikas.github.io/blog/`)
  - The build script automatically handles the `/blog/` base path when running in GitHub Actions.
- **Custom Domain** (e.g., `blog.vikas.dev`):
  - Add your domain to GitHub repository **Settings -> Pages -> Custom domain**.
  - In `.github/workflows/deploy.yml`, set `BASE_PATH: ""` or `"/"`.

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD
├── scripts/
│   └── new-post.js                 # Scaffolding CLI for `npm run new-post`
├── src/
│   ├── components/
│   │   ├── Header.astro            # Top navigation + search + theme toggle
│   │   ├── TopicsNav.astro         # Horizontal category/topic pills
│   │   ├── HeroPost.astro          # Featured story hero card
│   │   ├── PostCard.astro          # Feed story card with Dev.to reaction preview
│   │   ├── Sidebar.astro           # Author bio, popular tags, and newsletter
│   │   ├── ReadingProgress.astro   # Viewport scroll progress bar
│   │   ├── ReactionBar.astro       # Dev.to floating reaction dock (❤️ 🚀 💡 🔖 🔗)
│   │   ├── AudioPlayer.astro       # Web Speech API in-browser voice narration
│   │   ├── TextSelectionQuote.astro# Medium-style floating quote & tweet tooltip
│   │   ├── TableOfContents.astro   # Scrollspy table of contents
│   │   ├── SearchModal.astro       # Spotlight Cmd+K fuzzy search modal
│   │   ├── ReadingMode.astro       # Serif/Sans typography and font size switch
│   │   └── Footer.astro            # Footer with RSS & copyright
│   ├── content/
│   │   └── blog/                   # Date-stamped Markdown / MDX stories
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Base HTML shell with FOUC-proof theme script
│   │   └── BlogPostLayout.astro    # Medium reading layout with reactions & TOC
│   ├── pages/
│   │   ├── index.astro             # Homepage
│   │   ├── archive.astro           # Date-wise timeline archive
│   │   ├── tags/index.astro        # All topics & tags cloud
│   │   ├── tags/[tag].astro        # Filtered stories by tag
│   │   ├── categories/[cat].astro  # Filtered stories by category
│   │   ├── about.astro             # Author biography and tech stack
│   │   ├── rss.xml.js              # Full RSS 2.0 generator
│   │   └── 404.astro               # Custom 404 error page
│   ├── styles/
│   │   └── global.css              # Tailwind + animations + CSS tokens
│   ├── utils/
│   │   ├── formatDate.ts           # Human-readable date formatting
│   │   ├── posts.ts                # Post queries, archive groups, tag counting
│   │   ├── readingTime.ts          # Word count and reading time estimator
│   │   ├── slugify.ts              # URL-safe slug helper
│   │   └── url.ts                  # Base URL router helper
│   ├── consts.ts                   # Site constants and author profile
│   └── content.config.ts           # Astro 5 type-safe content schema
├── astro.config.mjs                # Astro configuration
├── tailwind.config.mjs             # Tailwind CSS tokens
└── package.json
```

---

## 📜 Commands Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local Astro dev server at `http://localhost:4321` |
| `npm run build` | Build static distribution files into `./dist` |
| `npm run preview` | Locally preview the production static build |
| `npm run new-post` | Interactively scaffold a new date-stamped story |

---

## 📄 License

GPL-3.0 License. See [LICENSE](LICENSE) for details.
