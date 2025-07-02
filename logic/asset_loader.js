// asset_loader.js - injects external scripts and styles

/**
 * Injects script and style assets into the document.
 * @param {{scripts: Array, styles: Array}} assets
 */
export function injectAssets(assets) {
  (assets.styles || []).forEach(href => {
    if (href && !document.querySelector(`link[href="${href}"]`)) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      document.head.appendChild(l);
    }
  });

  (assets.scripts || []).forEach(script => {
    const el = document.createElement('script');
    if (script.src) el.src = script.src;
    else el.textContent = script.content || '';
    document.body.appendChild(el);
  });
}
