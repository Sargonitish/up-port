let countersInitialized = false;

function animateSingle(el: HTMLElement, target: number): void {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + '%';
  }, 30);
}

function animateAll(): void {
  if (countersInitialized) return;
  countersInitialized = true;

  document.querySelectorAll('.skill-row').forEach((row) => {
    const pctEl = row.querySelector('.skill-pct') as HTMLElement;
    const barFill = row.querySelector('.bar-fill') as HTMLElement;
    const rowEl = row as HTMLElement;
    const percent = parseInt(rowEl.getAttribute('data-percent') || '0', 10);

    if (barFill) barFill.style.width = percent + '%';
    if (pctEl) animateSingle(pctEl, percent);
  });
}

export function initSkills(): void {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateAll();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillsSection);
}
