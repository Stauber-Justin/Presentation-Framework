// ui.js - simple UI helpers such as the progress bar
import { addSlideChangeListener } from './slider.js';

/** Initializes optional user-interface elements. */
export function initUI() {
  createProgressBar();
  addSlideChangeListener(updateProgress);
}

// Creates a progress bar element at the bottom of the page
function createProgressBar() {
  if (document.getElementById('progress-bar')) return;
  const bar = document.createElement('div');
  bar.id = 'progress-bar';
  document.body.appendChild(bar);
}

// Updates the progress bar width based on the slide index
function updateProgress(index, total) {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const percentage = ((index + 1) / total) * 100;
  bar.style.width = `${percentage}%`;
}
