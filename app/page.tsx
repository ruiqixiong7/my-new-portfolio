'use client';

import Link from 'next/link';
import localFont from 'next/font/local';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './home-v4.module.css';

const titleFont = localFont({ src: './fonts/ruiqi-title.otf', display: 'swap', variable: '--font-v4-inika' });

// Public paths and IDs checked against the supplied project archive.
const scenes = [
  { id: 'the-cosmic-courier', title: 'The Cosmic Courier', image: '/images/scene1.png', tags: ['空间探索', 'Unity 3D', '游戏体验'] },
  { id: 'film-soup', title: 'Film Soup', image: '/images/filmsoup-1.jpg', tags: ['数字记忆', '影像实验', '实时视觉'] },
  { id: 'fake-human-manufacturing-factory', title: 'Fake Human Manufacturing Factory', image: '/images/fake1.jpg', tags: ['反乌托邦', '叙事设计', '互动艺术'] },
  { id: 'gossip-garden', title: 'Gossip Garden', image: '/images/gossip-thumb.png', tags: ['算法批判', '生成艺术', '数字文化'] },
  { id: 'residual-signal', title: 'Residual Signal', image: '/images/Residualsignal1.jpg', tags: ['互动叙事', '恋爱游戏', '创意编程'] },
  { id: 'romance-signal', title: 'Romance Signal', image: '/images/romance-signal-thumb.png', tags: ['Creative Coding', 'Generative Art', 'Digital Media'] },
  { id: 'soft-collapse', title: 'Soft Collapse', image: '/images/soft-collapse-thumb.png', tags: ['Creative Coding', 'Generative Art', 'Digital Media'] },
  { id: 'tipping-point', title: 'Tipping Point', image: '/images/tippingpoint1.png', tags: ['系统变化', '互动媒体', '生成艺术'] },
  { id: 'nameless-current', title: 'Nameless Current', image: '/images/namelesscurrent1.png', tags: ['流动关系', '数字体验', '生成艺术'] },
];
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));
const categories = [['全部', 'All'], ['编程艺术', 'Coding Arts'], ['游戏', 'Game'], ['AIGC', 'AIGC'], ['UIUX', 'UIUX'], ['品牌设计', 'Brand Design']] as const;

export default function HomePage() {
  const glassId = `ruiqi-glass-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const goTo = useRef<(index: number) => void>(() => {});
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = root.current;
    const viewport = stage.current;
    const heading = title.current;
    if (!container || !viewport || !heading) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const html = document.documentElement;
    const oldBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    let height = viewport.clientHeight;
    let width = viewport.clientWidth;
    let origin = container.getBoundingClientRect().top + window.scrollY;
    let position = clamp((window.scrollY - origin) / height, 0, scenes.length - 1);
    let selected = Math.round(position);
    let snap: number | null = null;
    let held = false;
    let idle = 0;
    let frame = 0;
    let last = performance.now();
    let alive = true;
    // Measure the actual loaded typeface, including its fallback, before fitting.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let emWidth = 8;
    const measure = () => {
      height = viewport.clientHeight;
      width = viewport.clientWidth;
      origin = container.getBoundingClientRect().top + window.scrollY;
      if (context) {
        context.font = `400 100px ${getComputedStyle(heading).fontFamily}`;
        emWidth = Math.max(context.measureText('RUIQI XIONG /').width, context.measureText('PORTFOLIO').width) / 100;
      }
      wake();
    };
    const draw = () => {
      const nearest = Math.round(position);
      if (nearest !== selected) { selected = nearest; setActive(nearest); }
      const phase = Math.sin(Math.PI * (position - Math.floor(position))) ** 2;
      const morph = reduced.matches ? 0 : phase;
      const tracking = 0.008 - morph * 0.045;
      const size = Math.min(width * 0.112, height * 0.185, width * 0.90 / (emWidth + 13 * Math.max(tracking, 0))) * (1 - morph * 0.29);
      const lineHeight = 0.96 + morph * 0.07;
      const centerY = Math.max(size * 1.15 + 112, height * (0.43 - morph * 0.20));
      heading.style.fontSize = `${size}px`;
      heading.style.letterSpacing = `${tracking}em`;
      heading.style.lineHeight = String(lineHeight);
      // Preserve the supplied font; animate its glass edge instead of synthesizing font weights.
      heading.style.setProperty('--glass-edge', `${0.6 + morph * Math.min(1.1, size * 0.012)}px`);
      heading.style.height = `${size * 2.3}px`;
      heading.style.top = `${Math.min(height - size * 1.15 - 64, centerY)}px`;
      cards.current.forEach((card, index) => {
        if (!card) return;
        const distance = index - position;
        const absDistance = Math.abs(distance);
        const neighbor = Math.min(absDistance, 1);
        const easedNeighbor = 1 - Math.pow(1 - neighbor, 3);
        const track = Math.sign(distance) * (easedNeighbor * 0.565 + Math.max(0, absDistance - 1) * 0.115);
        const scale = reduced.matches ? 1 : 1 - easedNeighbor * 0.055;
        const brightness = reduced.matches ? 1 : 1 - easedNeighbor * 0.38;
        const opacity = clamp(1 - Math.max(0, absDistance - 1.35) * 1.55, 0, 1);
        card.style.transform = `translate3d(-50%, -50%, 0) translateY(${track * height}px) scale(${scale})`;
        card.style.filter = `brightness(${brightness})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(30 - Math.round(absDistance * 5));
        card.style.visibility = absDistance > 2.15 ? 'hidden' : 'visible';
        card.style.pointerEvents = index === nearest ? 'auto' : 'none';
        card.tabIndex = index === nearest ? 0 : -1;
        card.setAttribute('aria-hidden', String(index !== nearest));
        const artwork = card.querySelector('img');
        if (artwork) artwork.style.clipPath = 'none';
});
    };
    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(48, now - last);
      last = now;
      if (snap !== null) {
        const goal = origin + snap * height;
        const diff = goal - window.scrollY;
        if (Math.abs(diff) < 1 || reduced.matches) { window.scrollTo(0, goal); snap = null; }
        // Browsers round scroll positions: a sub-pixel tail must not stall forever.
        else window.scrollTo(0, window.scrollY + Math.sign(diff) * Math.min(Math.abs(diff), Math.max(1, Math.abs(diff) * (1 - Math.exp(-dt / 150)))));
      }
      const target = clamp((window.scrollY - origin) / height, 0, scenes.length - 1);
      position = reduced.matches ? target : position + (target - position) * (1 - Math.exp(-dt / 118));
      if (Math.abs(target - position) < 0.0001) position = target;
      draw();
      if (snap !== null || position !== target) frame = requestAnimationFrame(tick);
    };
    function wake() { if (!frame) { last = performance.now() - 16; frame = requestAnimationFrame(tick); } }
    const settle = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        if (held || reduced.matches) return;
        const raw = (window.scrollY - origin) / height;
        if (raw >= -0.01 && raw <= scenes.length - 0.99) {
          snap = clamp(Math.round(raw), 0, scenes.length - 1);
          wake();
        }
      }, 260);
    };
    const scroll = () => { wake(); if (snap === null) settle(); };
    const interrupt = () => { snap = null; window.clearTimeout(idle); };
    const down = () => { held = true; interrupt(); };
    const up = () => { held = false; settle(); };
    const keyboard = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) interrupt();
    };
    goTo.current = (index) => { snap = clamp(index, 0, scenes.length - 1); wake(); };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    measure(); draw(); setActive(selected);
    document.fonts.ready.then(() => { if (alive) measure(); });
    document.fonts.addEventListener('loadingdone', measure);
    container.addEventListener('load', measure, true);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    window.addEventListener('keydown', keyboard);
    reduced.addEventListener('change', measure);
    return () => {
      alive = false; cancelAnimationFrame(frame); clearTimeout(idle); observer.disconnect();
      html.style.scrollBehavior = oldBehavior;
      document.fonts.removeEventListener('loadingdone', measure);
      container.removeEventListener('load', measure, true);
      window.removeEventListener('scroll', scroll); window.removeEventListener('wheel', interrupt);
      window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up); window.removeEventListener('keydown', keyboard);
      reduced.removeEventListener('change', measure);
      goTo.current = () => {};
    };
  }, []);

  return (
    <main ref={root} className={`${styles.home} ${titleFont.variable}`} style={{ height: `${scenes.length * 100}svh` }}>
      <div ref={stage} className={styles.stage}>
        <header className={styles.nav}>
          <span>熊睿琦 · SELECTED WORK</span>
          <nav aria-label="主导航"><Link href="/work">Work ↗</Link></nav>
        </header>
        <nav className={styles.categories} aria-label="作品分类">
          {categories.map(([label, value]) => <Link key={value} href={value === 'All' ? '/work' : `/work?category=${encodeURIComponent(value)}`}>{label}</Link>)}
        </nav>
        <div className={styles.stack} aria-label="精选作品">
          {scenes.map((scene, index) => (
            <Link key={scene.id} ref={(node) => { cards.current[index] = node; }} href={`/work/${scene.id}`}
              className={styles.artwork} aria-label={`查看 ${scene.title}`} tabIndex={index === active ? 0 : -1}
              style={{ transform: `translate(-50%, -50%) translateY(${index * 58}svh)`, zIndex: 20 - index }}>
              {/* Native img keeps public paths independent of next/image configuration. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={scene.image} alt={scene.title} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
            </Link>
          ))}
        </div>
        <h1 ref={title} className={`${styles.title} ${styles.glassTitle}`} aria-label="RUIQI XIONG / PORTFOLIO">
          <svg className={styles.glyphs} width="100%" height="100%" aria-hidden="true">
            <defs>
              <clipPath id={glassId} clipPathUnits="userSpaceOnUse">
                <text x="50%" y="1em" textAnchor="middle">RUIQI XIONG /</text>
                <text x="50%" y="2.08em" textAnchor="middle">PORTFOLIO</text>
              </clipPath>
            </defs>
          </svg>
          <span className={styles.glassPane} aria-hidden="true" style={{ clipPath: `url(#${glassId})` }} />
          <svg className={styles.glyphs} width="100%" height="100%" aria-hidden="true">
            <text x="50%" y="1em" textAnchor="middle">RUIQI XIONG /</text>
            <text x="50%" y="2.08em" textAnchor="middle">PORTFOLIO</text>
          </svg>
        </h1>
        <footer className={styles.footer}>
          <div className={styles.caption} aria-live="polite">{scenes[active].title}</div>
          <div key={active} className={styles.tags}>{scenes[active].tags.map((tag, i) => <span key={tag} style={{ animationDelay: `${i * 45}ms` }}>{tag}</span>)}</div>
          <div className={styles.controls}>
            <button type="button" aria-label="上一件作品" disabled={active === 0} onClick={() => goTo.current(active - 1)}>↑</button>
            <span>{String(active + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
            <button type="button" aria-label="下一件作品" disabled={active === scenes.length - 1} onClick={() => goTo.current(active + 1)}>↓</button>
          </div>
        </footer>
      </div>
    </main>
  );
}



