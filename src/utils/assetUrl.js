/**
 * KAYOO STUDIO — Public Asset URL Helper
 * Resolves paths relative to the current Vite BASE_URL (e.g. /clothing-brand/ on GitHub Pages or dev)
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (typeof path !== 'string') return path;
  
  // Skip external or data URLs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env?.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Avoid duplicating base if path already starts with it
  const baseWithoutLeadingSlash = cleanBase.startsWith('/') ? cleanBase.slice(1) : cleanBase;
  if (baseWithoutLeadingSlash && cleanPath.startsWith(baseWithoutLeadingSlash)) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
}
