// loader.js - slide loading utilities
// Responsible for fetching slide HTML files listed in a JSON config
// and injecting their contents into the main slide container.

/**
 * Loads slides defined in the configuration file and appends them to the DOM.
 * @param {string} configPath - Path to the JSON configuration file.
 * @param {string} targetSelector - CSS selector of the container element.
 */
export async function loadSlides(configPath, targetSelector) {
  const container = document.querySelector(targetSelector);
  if (!container) {
    console.warn(`Target container '${targetSelector}' not found.`);
    return;
  }

  try {
    const res = await fetch(configPath);
    const data = await res.json();
    const slides = data.slides || [];

    for (let i = 0; i < slides.length; i++) {
      const html = await fetch(slides[i]).then(r => r.text());
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      let section = doc.querySelector('section.slide');
      if (!section) section = doc.body.firstElementChild;
      if (!section) continue;
      if (!section.id) section.id = `slide-${i + 1}`;
      container.appendChild(section);
    }
  } catch (err) {
    console.error('Failed to load slides:', err);
  }
}
