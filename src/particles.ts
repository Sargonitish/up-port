import type { Particle } from './types';

const COLORS = ['#FFD600', '#3B82F6', '#A855F7', '#22C55E', '#FF66B2', '#06B6D4'];
const COUNT = 60;

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let mouseX = 0;
let mouseY = 0;
let animId = 0;

function resize(): void {
  if (!canvas) return;
  const hero = canvas.parentElement;
  if (!hero) return;
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 2 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    alpha: 0.3 + Math.random() * 0.5,
  }));
}

function animate(): void {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const heroRect = canvas.parentElement?.getBoundingClientRect();
  const topOffset = heroRect ? heroRect.top : 0;

  for (const p of particles) {
    const dx = mouseX - p.x;
    const dy = mouseY - p.y - topOffset;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      p.vx -= dx * 0.0002;
      p.vy -= dy * 0.0002;
    }

    p.vx += (Math.random() - 0.5) * 0.02;
    p.vy += (Math.random() - 0.5) * 0.02;
    p.vx *= 0.98;
    p.vy *= 0.98;
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  animId = requestAnimationFrame(animate);
}

export function initParticles(): void {
  canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  if (!ctx) return;

  resize();
  particles = createParticles(canvas.width, canvas.height);

  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animate();
}

export function destroyParticles(): void {
  cancelAnimationFrame(animId);
}
