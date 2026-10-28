#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function prompt(question) {
  if (!process.stdin.isTTY) {
    return '';
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function parseArgs() {
  const args = process.argv.slice(2);
  let title = '';
  let category = '';
  let tags = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--title' || args[i] === '-t') {
      title = args[++i] || '';
    } else if (args[i] === '--category' || args[i] === '-c') {
      category = args[++i] || '';
    } else if (args[i] === '--tags') {
      tags = args[++i] || '';
    } else if (!title && !args[i].startsWith('-')) {
      title = args[i];
    }
  }

  return { title, category, tags };
}

async function createPost() {
  const parsed = parseArgs();
  let title = parsed.title;

  if (!title && process.stdin.isTTY) {
    title = await prompt('Enter story title: ');
  }

  if (!title) {
    title = 'New Engineering Story';
  }

  let category = parsed.category;
  if (!category && process.stdin.isTTY) {
    category = await prompt('Category [System Architecture / Psychology / Philosophy / Politics / Rural Development / Agriculture / Leadership] (default: System Architecture): ');
  }
  category = category || 'System Architecture';

  let rawTags = parsed.tags;
  if (!rawTags && process.stdin.isTTY) {
    rawTags = await prompt('Tags comma-separated (e.g. architecture, cloud, scaling): ');
  }

  const tagsList = rawTags
    ? rawTags.split(',').map((t) => slugify(t.trim())).filter(Boolean)
    : [slugify(category), 'engineering'];

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const slug = slugify(title);
  const filename = `${dateStr}-${slug}.md`;
  const blogDir = path.resolve(__dirname, '../src/content/blog');

  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  const filepath = path.join(blogDir, filename);

  if (fs.existsSync(filepath)) {
    console.error(`Error: File already exists at ${filepath}`);
    process.exit(1);
  }

  const template = `---
title: "${title}"
description: "A concise executive summary and teaser for this article that hooks the reader."
pubDate: ${dateStr}
author: "Vikas Kumar Yadav"
category: "${category}"
tags: ${JSON.stringify(tagsList)}
featured: false
draft: false
---

## Introduction

Start your story with an engaging opening hook. Why does this problem matter, and what will the reader take away after reading?

> "Write a memorable pull quote or key mental model here to anchor the reader's attention."

## The Core Architectural Challenge

Explain the problem with concrete code examples or architectural diagrams.

\`\`\`typescript
// Example snippet
export interface SystemConfig {
  retries: number;
  backoffMs: number;
}
\`\`\`

## Solution & Implementation

Break down the technical design step by step:

1. **System Boundaries**: What components are involved?
2. **Data Flow**: How does data move through the pipeline?
3. **Resilience**: How does the system behave during partial failures?

## Key Takeaways

- Summarize the most important lessons learned.
- Provide links to references or further reading.
`;

  fs.writeFileSync(filepath, template, 'utf-8');
  console.log(`\n✨ Successfully created new story!`);
  console.log(`📁 File: src/content/blog/${filename}`);
  console.log(`🚀 Just edit the file and push to GitHub to publish!\n`);
}

createPost().catch((err) => {
  console.error(err);
  process.exit(1);
});
