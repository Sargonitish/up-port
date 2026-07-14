import { initParticles } from './particles';
import { initTypewriter } from './typewriter';
import { initCarousels } from './carousel';
import { initModal } from './modal';
import { initTheme } from './theme';
import { initNavigation } from './navigation';
import { initSkills } from './skills';
import { initTilt } from './tilt';
import { initObserver } from './observer';

// -- Easter Egg Konami Code --
const SECRET = ['n', 'i', 't', 'i', 's', 'h'];
let typed: string[] = [];

function initEasterEgg(): void {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    typed.push(e.key.toLowerCase());
    typed = typed.slice(-SECRET.length);

    if (typed.join('') === SECRET.join('')) {
      const overlay = document.getElementById('glitch-overlay');
      if (overlay) overlay.style.display = 'flex';
    }

    if (e.key === 'Escape') {
      const overlay = document.getElementById('glitch-overlay');
      const modal = document.getElementById('cert-modal');
      if (overlay) overlay.style.display = 'none';
      if (modal) modal.style.display = 'none';
    }
  });
}

// -- Visitor Counter --
function initVisitorCounter(): void {
  const el = document.getElementById('v-count');
  if (!el) return;

  let count = parseInt(localStorage.getItem('v_fit') || '12421', 10);
  count++;
  localStorage.setItem('v_fit', String(count));
  el.textContent = 'Visitor #' + count;
}

// -- Init All --
function init(): void {
  initTheme();
  initEasterEgg();
  initVisitorCounter();
  initNavigation();
  initParticles();
  initTypewriter();
  initCarousels();
  initModal();
  initSkills();
  initTilt();
  initObserver();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
