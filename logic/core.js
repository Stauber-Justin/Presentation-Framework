// core.js - application bootstrap
// Initializes slide loading and navigation once the document is ready.

import { loadSlides } from './loader.js';
import { initSlider } from './slider.js';
import { initUI } from './ui.js';

// Wait for the DOM to be ready before starting the app
document.addEventListener('DOMContentLoaded', async () => {
  // Load slide HTML files defined in the configuration
  await loadSlides('config/slides.json', '#slide-container');

  // Setup slide navigation and keyboard controls
  initSlider('#slide-container');

  // Optional UI elements such as progress bar
  initUI();
});
