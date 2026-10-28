import { getAllPosts } from '../utils/posts';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getRelativeUrl } from '../utils/url';

export async function GET(context) {
  const posts = await getAllPosts();
  const siteUrl = context.site || 'https://ctrlaltvikas.github.io';

  const rssItems = posts
    .map((post) => {
      const slug = post.id.replace(/\.(md|mdx)$/, '');
      const postUrl = new URL(getRelativeUrl(`/blog/${slug}`), siteUrl).toString();

      return `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${new Date(post.data.pubDate).toUTCString()}</pubDate>
      <author>${post.data.author}</author>
      <category>${post.data.category}</category>
    </item>`;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_TITLE}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <language>en-us</language>
    <atom:link href="${new URL(getRelativeUrl('/rss.xml'), siteUrl).toString()}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
