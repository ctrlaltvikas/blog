import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Get all published blog posts sorted by pubDate descending.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Get the slug for a blog post.
 */
export function getPostSlug(post: BlogPost): string {
  // Use id without extension
  return post.id.replace(/\.(md|mdx)$/, '');
}

/**
 * Get all unique tags with their post counts.
 */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      const normalized = tag.toLowerCase().trim();
      tagCounts[normalized] = (tagCounts[normalized] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Get all unique categories with their post counts.
 */
export async function getAllCategories(): Promise<{ category: string; count: number }[]> {
  const posts = await getAllPosts();
  const catCounts: Record<string, number> = {};

  posts.forEach((post) => {
    const category = post.data.category || 'General';
    catCounts[category] = (catCounts[category] || 0) + 1;
  });

  return Object.entries(catCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

/**
 * Group posts by Year and Month for the date-wise archive.
 */
export interface ArchiveYear {
  year: number;
  months: {
    monthName: string;
    monthIndex: number;
    posts: BlogPost[];
  }[];
}

export async function getArchiveGroups(): Promise<ArchiveYear[]> {
  const posts = await getAllPosts();
  const yearMap = new Map<number, Map<number, BlogPost[]>>();

  posts.forEach((post) => {
    const date = new Date(post.data.pubDate);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 - 11

    if (!yearMap.has(year)) {
      yearMap.set(year, new Map());
    }
    const monthMap = yearMap.get(year)!;
    if (!monthMap.has(month)) {
      monthMap.set(month, []);
    }
    monthMap.get(month)!.push(post);
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const result: ArchiveYear[] = [];
  const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a);

  for (const year of sortedYears) {
    const monthMap = yearMap.get(year)!;
    const sortedMonths = Array.from(monthMap.keys()).sort((a, b) => b - a);

    const months = sortedMonths.map((monthIndex) => ({
      monthName: monthNames[monthIndex],
      monthIndex,
      posts: monthMap.get(monthIndex)!,
    }));

    result.push({ year, months });
  }

  return result;
}
