import type { CertData } from './types';

let currentImages: string[] = [];
let currentIndex = 0;

const modal = document.getElementById('cert-modal') as HTMLElement;
const titleEl = document.getElementById('modal-title') as HTMLElement;
const issuerEl = document.getElementById('modal-issuer') as HTMLElement;
const skillsEl = document.getElementById('modal-skills') as HTMLElement;
const viewBtn = document.getElementById('view-cert-btn') as HTMLElement;
const imgContainer = document.getElementById('modal-img-container') as HTMLElement;
const certImg = document.getElementById('modal-cert-img') as HTMLImageElement;
const leftArrow = document.getElementById('modal-arrow-left') as HTMLElement;
const rightArrow = document.getElementById('modal-arrow-right') as HTMLElement;

function updateArrows(): void {
  if (currentImages.length <= 1) {
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
    return;
  }
  leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
  rightArrow.style.display = currentIndex < currentImages.length - 1 ? 'flex' : 'none';
}

function setImage(index: number): void {
  if (index < 0 || index >= currentImages.length) return;
  currentIndex = index;
  certImg.src = currentImages[currentIndex];
  updateArrows();
}

function showImageContainer(show: boolean): void {
  imgContainer.style.display = show ? 'block' : 'none';
  viewBtn.textContent = show ? 'HIDE CERTIFICATE' : 'VIEW CERTIFICATE';
  viewBtn.style.background = show ? 'var(--yellow)' : 'var(--cyan)';
  if (show) updateArrows();
}

function open(data: CertData): void {
  titleEl.textContent = data.title;
  issuerEl.textContent = 'Issued By: ' + data.issuer;
  skillsEl.textContent = data.skills;
  currentImages = data.images;
  currentIndex = 0;

  if (currentImages.length > 0) {
    certImg.src = currentImages[0];
    viewBtn.style.display = 'block';
    viewBtn.textContent = 'VIEW CERTIFICATE';
    viewBtn.style.background = 'var(--cyan)';
    imgContainer.style.display = 'none';
  } else {
    viewBtn.style.display = 'none';
    imgContainer.style.display = 'none';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function close(): void {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function handleKeydown(e: KeyboardEvent): void {
  if (modal.style.display !== 'flex') return;

  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft' && currentIndex > 0) setImage(currentIndex - 1);
  if (e.key === 'ArrowRight' && currentIndex < currentImages.length - 1) setImage(currentIndex + 1);
}

export function initModal(): void {
  // Close button
  document.querySelector('.close-btn')?.addEventListener('click', close);

  // Click outside
  modal.addEventListener('click', (e: MouseEvent) => {
    if (e.target === modal) close();
  });

  // View/Hide toggle
  viewBtn.addEventListener('click', () => {
    showImageContainer(imgContainer.style.display === 'none');
  });

  // Arrows
  leftArrow.addEventListener('click', () => setImage(currentIndex - 1));
  rightArrow.addEventListener('click', () => setImage(currentIndex + 1));

  // Keyboard
  document.addEventListener('keydown', handleKeydown);

  // Init event cards with data attributes
  document.querySelectorAll('.event-card[data-title]').forEach((card) => {
    card.addEventListener('click', () => {
      const data: CertData = {
        title: card.getAttribute('data-title') || '',
        issuer: card.getAttribute('data-issuer') || '',
        skills: card.getAttribute('data-skills') || '',
        images: JSON.parse(card.getAttribute('data-images') || '[]'),
      };
      open(data);
    });
  });
}
