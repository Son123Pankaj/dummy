/** Resolve public assets for dev, Vite production and the included standalone build. */
export function getAssetUrl(path) {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  const clean = String(path).replace(/^\/+/, '');
  if (typeof document === 'undefined') return '/' + clean;
  try {
    // The standalone build marks its local script. For Vite, the module script
    // also points into /assets/ and can establish the correct deployment root.
    const script = document.querySelector('script[data-app-bundle]') ||
      document.querySelector('script[type="module"][src]');
    if (script?.src) {
      const src = new URL(script.src, window.location.href);
      if (src.pathname.includes('/assets/') || src.pathname.includes('/src/')) {
        return new URL('../' + clean, src.href).href;
      }
    }
  } catch { /* use ordinary root-relative fallback */ }
  return '/' + clean;
}
export default getAssetUrl;
