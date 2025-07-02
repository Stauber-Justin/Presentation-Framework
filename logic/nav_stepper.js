// Array mit AbsolutPfaden zu allen Slides
const slidePaths = [
  '/index.html',
  '/Pages/01_WhatIs.html',
  '/Pages/03_Non-Blind.html',
  '/Pages/02_Blind.html',
  '/Pages/04_WhyWork.html',
  '/Pages/05_HowSafe.html',
  '/Pages/06_Outro.html'
];

// Bestimmt den aktuellen Index anhand des Dateinamens
function getCurrentIndex() {
  const currentFile = window.location.pathname.split('/').pop();
  return slidePaths.findIndex(path => path.endsWith(currentFile));
}

// Navigation zu Slide mit Index
function goToSlide(index) {
  if (index < 0 || index >= slidePaths.length) return;
  window.location.href = slidePaths[index];
}
function nextSlide() {
  goToSlide(getCurrentIndex() + 1);
}
function prevSlide() {
  goToSlide(getCurrentIndex() - 1);
}

// Beim Laden: Pfeile ein-/ausblenden
document.addEventListener('DOMContentLoaded', () => {
  const idx = getCurrentIndex();
  document.getElementById('nav-left').style.display = idx <= 0 ? 'none' : 'block';
  document.getElementById('nav-right').style.display = idx >= slidePaths.length - 1 ? 'none' : 'block';
});