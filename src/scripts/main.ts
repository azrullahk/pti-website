import Lenis from 'lenis';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  const raf = (time: number) => { lenis!.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

function scrollToHash(hash: string) {
  const el = hash === '#top' ? document.body : document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(hash === '#top' ? 0 : el, { offset: -72 });
  else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href')!;
  if (hash.length < 2) return;
  e.preventDefault();
  const tabId = a.dataset.tabLink;
  if (tabId) selectTab(tabId, false);
  scrollToHash(hash);
  history.replaceState(null, '', hash === '#top' ? location.pathname : hash);
});

/* ---------- intro ---------- */
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));

/* ---------- nav shadow ---------- */
const nav = document.querySelector<HTMLElement>('[data-nav]');
const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- hero grid follows cursor (eased) ---------- */
const hero = document.querySelector<HTMLElement>('[data-hero]');
const grid = document.querySelector<HTMLElement>('[data-grid]');
if (hero && grid && !reduce && window.matchMedia('(hover: hover)').matches) {
  let tx = 0, ty = 0, cx = 0, cy = 0, running = false;
  const r0 = hero.getBoundingClientRect();
  cx = tx = r0.width / 2; cy = ty = r0.height * 0.28;
  const tick = () => {
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    grid.style.setProperty('--mx', `${cx.toFixed(1)}px`);
    grid.style.setProperty('--my', `${cy.toFixed(1)}px`);
    if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) requestAnimationFrame(tick);
    else running = false;
  };
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    tx = e.clientX - r.left; ty = e.clientY - r.top;
    if (!running) { running = true; requestAnimationFrame(tick); }
  });
}

/* ---------- reveal on scroll ---------- */
const reveals = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

/* ---------- count-up ---------- */
const stats = document.querySelector<HTMLElement>('[data-stats]');
const nums = document.querySelectorAll<HTMLElement>('[data-count]');
if (stats && nums.length && 'IntersectionObserver' in window && !reduce) {
  nums.forEach((n) => (n.textContent = '0'));
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    const start = performance.now(), dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      nums.forEach((n) => (n.textContent = String(Math.round(Number(n.dataset.count) * e))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.4 });
  io.observe(stats);
}

/* ---------- service tabs ---------- */
const tablist = document.querySelector<HTMLElement>('[data-tabs]');
const tabs = tablist ? Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')) : [];

function selectTab(id: string, focus: boolean) {
  const tab = tabs.find((t) => t.id === `tab-${id}`);
  if (!tab || tab.getAttribute('aria-selected') === 'true') { if (focus) tab?.focus(); return; }
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls')!);
    if (!panel) continue;
    if (on) {
      panel.hidden = false;
      panel.classList.remove('is-entering');
      void panel.offsetWidth;
      panel.classList.add('is-entering');
    } else {
      panel.hidden = true;
      panel.classList.remove('is-entering');
    }
  }
  if (focus) tab.focus();
}

tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t.id.replace('tab-', ''), false));
  t.addEventListener('keydown', (e) => {
    let j = -1;
    if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = tabs.length - 1;
    if (j < 0) return;
    e.preventDefault();
    selectTab(tabs[j].id.replace('tab-', ''), true);
  });
});

/* ---------- values I.N.S.P.I.R.E ---------- */
const letterWrap = document.querySelector<HTMLElement>('[data-values]');
const detail = document.querySelector<HTMLElement>('[data-vdetail]');
if (letterWrap && detail) {
  const letters = Array.from(letterWrap.querySelectorAll<HTMLButtonElement>('.letter'));
  const out = {
    idx: detail.querySelector<HTMLElement>('[data-v="idx"]')!,
    name: detail.querySelector<HTMLElement>('[data-v="name"]')!,
    id: detail.querySelector<HTMLElement>('[data-v="id"]')!,
    desc: detail.querySelector<HTMLElement>('[data-v="desc"]')!,
  };
  const pick = (b: HTMLButtonElement, focus = false) => {
    if (b.getAttribute('aria-selected') === 'true') return;
    letters.forEach((l) => { const on = l === b; l.setAttribute('aria-selected', String(on)); l.tabIndex = on ? 0 : -1; });
    out.idx.textContent = `${b.dataset.idx} / 07`;
    out.name.textContent = b.dataset.name!;
    out.id.textContent = b.dataset.id!;
    out.desc.textContent = b.dataset.desc!;
    detail.classList.remove('is-swapping'); void detail.offsetWidth; detail.classList.add('is-swapping');
    if (focus) b.focus();
  };
  letters.forEach((b, i) => {
    b.addEventListener('click', () => pick(b));
    b.addEventListener('pointerenter', (e) => { if ((e as PointerEvent).pointerType === 'mouse') pick(b); });
    b.addEventListener('keydown', (e) => {
      let j = -1;
      if (e.key === 'ArrowRight') j = (i + 1) % letters.length;
      else if (e.key === 'ArrowLeft') j = (i - 1 + letters.length) % letters.length;
      if (j < 0) return;
      e.preventDefault();
      pick(letters[j], true);
    });
  });
}
