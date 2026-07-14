export interface CertData {
  title: string;
  issuer: string;
  skills: string;
  images: string[];
}

export interface Particle {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

export interface TypewriterLine {
  command: string;
  output: string;
}

export interface SkillBar {
  element: HTMLElement;
  percent: number;
  label: string;
}
