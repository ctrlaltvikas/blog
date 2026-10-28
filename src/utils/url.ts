/**
 * Format an internal link respecting Astro's configured BASE_URL.
 */
export function getRelativeUrl(path: string = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') {
    return base ? `${base}/` : '/';
  }
  return `${base}${cleanPath}`;
}
