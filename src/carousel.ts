export function initCarousels(): void {
  document.querySelectorAll('.carousel-container').forEach((container) => {
    const leftBtn = container.querySelector('.left-arrow');
    const rightBtn = container.querySelector('.right-arrow');
    const wrapper = container.querySelector('.marquee-wrapper') as HTMLElement;
    if (!wrapper) return;

    const getScrollAmount = (): number => {
      const track = wrapper.querySelector('.marquee-track') as HTMLElement | null;
      const card = (wrapper.querySelector('.event-card') ?? wrapper.querySelector('.activity-card')) as HTMLElement | null;
      if (!card) return 350;
      const gap = track ? parseInt(getComputedStyle(track).gap) || 32 : 32;
      return card.offsetWidth + gap;
    };

    leftBtn?.addEventListener('click', () => {
      wrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    rightBtn?.addEventListener('click', () => {
      wrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  });
}
