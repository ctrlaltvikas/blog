---
title: "Welcome to Thinking Bytes: An Editorial Space for Engineering Craft"
description: "Why I decided to build a self-hosted engineering publication combining Medium's refined typography, Dev.to's interactive developer spirit, and Astro's static velocity."
pubDate: 2026-10-29
author: "Vikas Yadav"
category: "Engineering Craft"
tags: ["engineering-craft", "web-architecture", "open-source", "astro"]
featured: false
draft: false
---

## Why Another Blog?

Over the years, engineering blogs have bifurcated into two polar extremes:

1. **Walled Gardens**: Platforms like Medium offer clean typography and reading focus, but lock readers behind paywalls and strip authors of custom ownership.
2. **Standard Developer Blogs**: Fast static sites that often lack modern reading luxuries—interactive multi-reactions, instant text quote sharing, in-browser speech narration, and fluid typography adjusters.

I wanted something different. An editorial publication that lives directly in git, deploys automatically to **GitHub Pages**, and provides the best of both worlds: **Medium's serene reading comfort** paired with **Dev.to's vibrant, developer-centric interactivity**.

> "Great engineering writing is not just about having good ideas—it is about respecting the reader's attention and creating a sanctuary of calm focus."

## What Makes This Platform Unique

This platform isn't just a static template; it introduces several innovative features rarely seen together on GitHub Pages:

### 1. Zero-Friction Date-Wise Publishing
To publish a new story, you don't fight with complex databases or CMS dashboards. Everything is tracked in git. With a single terminal command:

```bash
npm run new-post "Architecting High-Throughput Event Streams"
```

The system automatically generates a date-stamped file in `src/content/blog/`, pre-populates type-safe frontmatter, and seamlessly indexes the story across categories, tags, the chronological timeline archive, and the RSS feed.

### 2. Built-in In-Browser Narration (SpeechSynthesis)
Notice the **"Listen to article"** button above? Powered directly by the browser's native Web Speech API, readers can listen to full articles while commuting, without sending audio requests to expensive third-party APIs. It includes speed adjustment (`1.0x` to `2.0x`) and an animated sound visualizer.

### 3. Medium-Style Text Highlighting & Quoting
Highlight any sentence in this article. You will immediately see a floating action bubble allowing you to copy the passage formatted as an attribution markdown blockquote or share it directly.

### 4. Dev.to Interactive Reaction Dock
On the left side (or bottom bar on mobile), you'll notice interactive reaction counters:
- ❤️ **Love**: For articles that resonated with you.
- 🚀 **Rocket**: For high-velocity breakthroughs and releases.
- 💡 **Mindblown**: For unexpected architectural insights.
- 🔖 **Bookmark**: Locally saved to your browser so you can return anytime.

Every reaction triggers a subtle micro-animation and particle burst, persisting state locally in `localStorage`.

### 5. Reader Ergonomics & Typography Mode
Every reader has unique preferences. The reading mode toggle at the top allows switching seamlessly between **Inter Sans-serif** and **Newsreader Serif**, along with one-click font size scaling (`A-`, `A`, `A+`).

## What to Expect Here

In the coming weeks and months, I'll be sharing detailed deep dives into:

- **Distributed Systems Architecture**: Lessons in consensus, partition tolerance, and cache consistency.
- **Agentic AI Engineering**: Moving beyond chatbots toward deterministic, self-healing agent pipelines.
- **Frontend Systems & Performance**: Micro-optimizations for sub-millisecond interaction to next paint (INP).
- **Engineering Leadership & Mental Models**: How to navigate technical debt and lead high-performing technical teams.

Thank you for stopping by. Feel free to explore the [Archive](/archive), browse [Topics](/tags), or subscribe to the [RSS Feed](/rss.xml)!
