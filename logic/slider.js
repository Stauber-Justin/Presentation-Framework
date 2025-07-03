// slider.js - slide navigation and keyboard controls

let slides = [];
let currentIndex = 0;
const listeners = [];

/**
 * Initializes navigation for all slides inside the container.
 * @param {string} containerSelector - CSS selector for slide container.
 */
export function initSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  slides = Array.from(container.querySelectorAll('.slide'));
  slides.forEach((s, idx) => {
    if (idx !== 0) s.classList.add('hidden');
  });

  document.addEventListener('keydown', handleKey);
  document.getElementById('nav-left')?.addEventListener('click', prevSlide);
  document.getElementById('nav-right')?.addEventListener('click', nextSlide);

  const hash = window.location.hash.match(/slide=(\d+)/);
  if (hash) showSlide(parseInt(hash[1], 10));
}

/** Move to the next slide. */
export function nextSlide() { showSlide(currentIndex + 1); }
/** Move to the previous slide. */
export function prevSlide() { showSlide(currentIndex - 1); }

/**
 * Registers a listener for slide change events.
 * @param {(index:number,total:number)=>void} fn - Callback with new index.
 */
export function addSlideChangeListener(fn) { listeners.push(fn); }

function handleKey(e) {
  if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') prevSlide();
}

function showSlide(index) {
  if (index < 0 || index >= slides.length || index === currentIndex) return;

  const oldSlide = slides[currentIndex];
  const newSlide = slides[index];

  oldSlide.classList.add('fade-out');
  setTimeout(() => {
    oldSlide.classList.remove('fade-out');
    oldSlide.classList.add('hidden');
  }, 200);

  newSlide.classList.remove('hidden');
  newSlide.classList.add('fade-in');

  currentIndex = index;
  window.location.hash = `slide=${index}`;
  listeners.forEach(fn => fn(index, slides.length));

  setTimeout(() => newSlide.classList.remove('fade-in'), 500);
}
