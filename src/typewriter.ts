import type { TypewriterLine } from './types';

const LINES: TypewriterLine[] = [
  { command: 'whoami', output: 'Nitish S. // Engineering Student Exploring Computer Science' },
  { command: 'cat /etc/passwd | grep student', output: 'student:x:1000:1000:Nitish S:/home/nitish:/bin/curiosity' },
  { command: 'echo $CURRENT_FOCUS', output: 'Environment: Testing local LLMs via Termux. Building full-stack web applications and Braille-based assistive hardware.' },
  { command: 'systemctl status learning', output: '● learning.service — Active: running (curious) since 2006' },
  { command: 'curl -I https://nitish.dev', output: 'HTTP/2 200 OK // Server: Curiosity Engine v2.0' },
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let showingOutput = false;
let timer = 0;

function getCurrent(): string {
  const line = LINES[lineIndex];
  return showingOutput ? line.output : line.command;
}

function tick(el: HTMLElement): void {
  const current = getCurrent();

  if (!isDeleting) {
    if (charIndex < current.length) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      const delay = showingOutput ? 20 : 40 + Math.random() * 60;
      timer = window.setTimeout(() => tick(el), delay);
    } else {
      if (!showingOutput) {
        showingOutput = true;
        charIndex = 0;
        timer = window.setTimeout(() => tick(el), 400);
      } else {
        isDeleting = true;
        timer = window.setTimeout(() => tick(el), 2000);
      }
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
      timer = window.setTimeout(() => tick(el), 15);
    } else {
      isDeleting = false;
      showingOutput = false;
      charIndex = 0;
      lineIndex = (lineIndex + 1) % LINES.length;
      timer = window.setTimeout(() => tick(el), 300);
    }
  }
}

export function initTypewriter(): void {
  const el = document.getElementById('typewriter');
  if (!el) return;
  timer = window.setTimeout(() => tick(el), 500);
}

export function destroyTypewriter(): void {
  clearTimeout(timer);
}
