// core.js - application bootstrap
// Initializes slide loading and navigation once the document is ready.

import { loadSlides } from './loader.js';
import { injectAssets } from './asset_loader.js';
import { initSlider } from './slider.js';
import { initUI } from './ui.js';

// Wait for the DOM to be ready before starting the app
export async function startPresentation(module) {
  const assets = await loadSlides(`config/${module}.json`, '#slide-container');
  injectAssets(assets);
  initSlider('#slide-container');
  initUI();
}
