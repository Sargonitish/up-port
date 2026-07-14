const STORAGE_KEY = 'portfolio-theme';

function getPreferredTheme(): string {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: string): void {
  document.body.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  localStorage.setItem(STORAGE_KEY, theme);
}

export function initTheme(): void {
  applyTheme(getPreferredTheme());

  const btn = document.getElementById('themeToggle');
  btn?.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}
