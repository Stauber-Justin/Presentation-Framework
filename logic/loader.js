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
    return { scripts: [], styles: [] };
  }

  const assets = { scripts: [], styles: [] };

  try {
    const res = await fetch(configPath);
    const data = await res.json();
    const slides = data.slides || [];
    const landing = data.landing;

    let index = 0;
    if (landing) {
      const { section, scripts, styles } = await fetchSlide(landing);
      if (section) {
        if (!section.id) section.id = `slide-${index}`;
        container.appendChild(section);
        index++;
      }
      assets.scripts.push(...scripts);
      assets.styles.push(...styles);
    }

    for (let i = 0; i < slides.length; i++) {
      const { section, scripts, styles } = await fetchSlide(slides[i]);
      if (section) {
        if (!section.id) section.id = `slide-${i + index}`;
        container.appendChild(section);
      }
      assets.scripts.push(...scripts);
      assets.styles.push(...styles);
    }
  } catch (err) {
    console.error('Failed to load slides:', err);
  }

  return assets;
}

function resolvePath(base, relative) {
  const stack = base.split('/');
  stack.pop();
  for (const part of relative.split('/')) {
    if (part === '..') stack.pop();
    else if (part !== '.') stack.push(part);
  }
  return stack.join('/');
}

async function fetchSlide(path) {
  const html = await fetch(path).then(r => r.text());
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const section = doc.querySelector('section.slide') || doc.body.firstElementChild;

  const scripts = Array.from(doc.querySelectorAll('script')).map(s => {
    return s.src
      ? { src: resolvePath(path, s.getAttribute('src')) }
      : { content: s.textContent };
  });

  const styles = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
    .map(l => resolvePath(path, l.getAttribute('href')));

  return { section, scripts, styles };
}
