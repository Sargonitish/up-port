export function initTilt(): void {
  document.querySelectorAll('.card-tilt').forEach((card) => {
    const el = card as HTMLElement;

    el.addEventListener('mousemove', (e: Event) => {
      const me = e as MouseEvent;
      const rect = el.getBoundingClientRect();
      const x = me.clientX - rect.left;
      const y = me.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = -(y - cy) / 15;
      const ry = (x - cx) / 15;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translate(-4px, -4px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}
