// Not scrollIntoView/scrollTo({behavior:"smooth"}): the Home page's
// ParallaxScene instances mutate their sticky/panned image's height and
// margin on every scroll event, and that layout shift makes the browser's
// native smooth-scroll implementation (and plain anchor-hash jumps, which
// can silently no-op once the page is already at the target URL+hash) stall
// or do nothing. A manual rAF loop keeps pushing scrollY forward every
// frame regardless of what else is reacting to scroll, so it can't get
// stuck the same way. Shared by the header logo/nav links and SectionRail.
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  return scrollToElement(target);
}

export function scrollToElement(target: HTMLElement) {
  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;
  const duration = 600;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || Math.abs(distance) < 2) {
    window.scrollTo(0, targetY);
    return true;
  }

  const startTime = performance.now();
  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(now: number) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  return true;
}
