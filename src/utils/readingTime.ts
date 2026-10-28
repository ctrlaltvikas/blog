/**
 * Calculate estimated reading time and word count for an article.
 * Average reading speed: ~225 words per minute.
 */
export function getReadingTime(content: string = ''): {
  text: string;
  minutes: number;
  words: number;
} {
  // Strip code blocks and markdown symbols for cleaner word count estimation
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/`.*?`/g, '') // inline code
    .replace(/#+/g, '') // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/[*_~`]/g, '') // formatting
    .trim();

  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 225));

  return {
    text: `${minutes} min read`,
    minutes,
    words,
  };
}
