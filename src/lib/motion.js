// Homepage scroll animations (set up by components/motion/HomeMotion.js).
//
// Every GSAP animation here is tied to scrolling: it starts when its part of the page scrolls into view
// (ScrollTrigger), is scrubbed to the scroll position, or — the marquees and the hero cursor — loops only while
// its part of the page is on screen. Clicks, tabs and the FAQ use plain CSS instead.
//
// Sections opt in with data attributes in their markup:
//   data-split      heading lines rise out of a mask; data-split="chars" flips letters in instead
//   data-lines      same rise for headings React keeps updating (they carry their own .mask-line markup)
//   data-reveal     fade up, or "left" / "right" / "scale"; data-delay="0.15" offsets it
//   data-stagger    direct children arrive one after another, row by row; [data-pop] icons spring in.
//                   data-stagger="content" moves what is inside each child instead of the child itself
//   data-count      the number counts up from zero (the markup holds the final value)
//   data-parallax   a decorative layer drifts against the scroll; the value sets how far
//   data-marquee    endless strip that moves only while on screen, speeding up and leaning with the scroll
//                   ("reverse" flips it)
// Section-specific effects (hero, service and design cards, the concepts row, comparison, process pin,
// footer wordmark) are below.
//
// Ground rules: reveals fire early and only once, pins are desktop-only, nothing runs when the visitor
// prefers reduced motion, and nothing is hidden by CSS, so content shows even if this never runs.
import { gsap, ScrollTrigger, SplitText } from './gsap';

const START = 'top 88%';
const EASE = 'power3.out';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => gsap.utils.toArray(selector, root);

// Already visible when animations are set up (top of the page, or a reload mid-page):
// leave it as it is rather than hiding it and fading it back in.
const onScreen = (el) => el.getBoundingClientRect().top < window.innerHeight * 0.95;

// Hide each item with `hide`, then play the timeline returned by `show(item)` as it scrolls in.
// Items that arrive together (one grid row) are staggered by `gap`.
function revealEach(items, hide, show, gap = 0.14) {
  const pending = items.filter((el) => !onScreen(el));
  if (!pending.length) return;
  pending.forEach(hide);
  ScrollTrigger.batch(pending, {
    start: 'top 86%',
    once: true,
    onEnter: (batch) => batch.forEach((el, i) => show(el).delay(i * gap)),
  });
}

/* ---------- Headings ---------- */

function splitHeadings() {
  $$('[data-split]').forEach((el) => {
    if (onScreen(el)) return;
    const chars = el.dataset.split === 'chars';
    SplitText.create(el, {
      type: chars ? 'words,chars' : 'lines',
      mask: chars ? undefined : 'lines',
      linesClass: 'split-line',
      autoSplit: !chars, // line breaks change with width and web fonts; re-split until it has played
      onSplit: (self) =>
        gsap.from(chars ? self.chars : self.lines, {
          ...(chars
            ? {
                yPercent: 70,
                rotationX: -95,
                opacity: 0,
                transformPerspective: 600,
                transformOrigin: '50% 50% -18px',
                duration: 0.9,
                ease: 'back.out(1.5)',
                stagger: 0.022,
              }
            : { yPercent: 118, duration: 1.15, ease: 'expo.out', stagger: 0.1 }),
          scrollTrigger: { trigger: el, start: START, once: true },
          // Restore the original markup once it has landed (clean resizing, selection and screen readers).
          onComplete: () => self.revert(),
        }),
    });
  });
}

function maskedLines() {
  $$('[data-lines]').forEach((el) => {
    if (onScreen(el)) return;
    gsap.from($$('[data-line]', el), {
      yPercent: 118,
      duration: 1.15,
      ease: 'expo.out',
      stagger: 0.1,
      clearProps: 'transform',
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });
}

/* ---------- Generic reveals ---------- */

function fadeReveals(desktop) {
  const d = desktop ? 48 : 28;
  const from = { up: { y: d }, left: { x: -d }, right: { x: d }, scale: { y: d / 2, scale: 0.94 } };
  $$('[data-reveal]').forEach((el) => {
    if (onScreen(el)) return;
    gsap.from(el, {
      ...(from[el.dataset.reveal] || from.up),
      autoAlpha: 0,
      duration: 1,
      ease: EASE,
      delay: Number(el.dataset.delay) || 0,
      clearProps: 'transform',
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });
}

function staggerReveals(desktop) {
  $$('[data-stagger]').forEach((group) => {
    const inner = group.dataset.stagger === 'content';
    const items = gsap.utils.toArray(group.children).filter((el) => !onScreen(el));
    if (!items.length) return;
    const pops = (el) => $$('[data-pop]', el);
    // What rises: the item itself, or (content mode) its children apart from the icons that pop.
    const parts = (el) => (inner ? gsap.utils.toArray(el.children).filter((c) => !c.hasAttribute('data-pop')) : [el]);
    gsap.set(items.flatMap(parts), { autoAlpha: 0, y: desktop ? 44 : 28 });
    if (inner) gsap.set(items.flatMap(pops), { autoAlpha: 0 });
    ScrollTrigger.batch(items, {
      start: START,
      once: true,
      onEnter: (batch) => {
        gsap.to(batch.flatMap(parts), {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: EASE,
          stagger: inner ? 0.06 : 0.09,
          clearProps: 'transform',
        });
        const icons = batch.flatMap(pops);
        if (icons.length) {
          gsap.fromTo(
            icons,
            { scale: 0.4, rotation: -25 },
            { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.8, ease: 'back.out(2.2)', stagger: 0.09, delay: 0.15, clearProps: 'transform' }
          );
        }
      },
    });
  });
}

// Numbers count up from zero the first time they scroll into view.
function counters() {
  const restore = [];
  $$('[data-count]').forEach((el) => {
    if (onScreen(el)) return;
    const text = el.textContent;
    const value = { n: 0 };
    el.textContent = '0';
    restore.push(() => {
      el.textContent = text;
    });
    gsap.to(value, {
      n: Number(el.dataset.count),
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = String(Math.round(value.n));
      },
      onComplete: () => {
        el.textContent = text;
      },
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });
  return () => restore.forEach((undo) => undo());
}

// Decorative glows sink a little slower than the page while their section is on screen.
function parallax() {
  $$('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      y: (Number(el.dataset.parallax) || 0.4) * 240,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'clamp(top bottom)', end: 'bottom top', scrub: true },
    });
  });
}

/* ---------- Hero ---------- */

function hero(desktop) {
  const section = $('.hero');
  if (!section) return;
  const site = $('.mock-site', section);
  const view = $('.mock-viewport', section);
  // How far the mock page can scroll inside its browser window.
  const pageScroll = () => -Math.max(0, site.offsetHeight - view.clientHeight);

  if (!desktop) {
    // Phones and tablets: the mock page scrolls inside its window as the hero passes.
    gsap.to(site, {
      y: pageScroll,
      ease: 'none',
      scrollTrigger: { trigger: view, start: 'top 85%', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
    });
    return;
  }

  // Depth: the floating cards sit at different distances from the viewer.
  gsap.set('[data-depth="phone"]', { z: 80 });
  gsap.set('[data-depth="toast"]', { z: 100 });
  gsap.set('[data-depth="chart"]', { z: 60 });
  gsap.set('[data-depth="score"]', { z: 40 });

  // Scrolling away: the copy drifts up and fades late, the mock turns in 3D and sinks more slowly than the page,
  // the shop inside it scrolls, and the floating cards rise at different speeds, so the layers separate.
  gsap
    .timeline({
      defaults: { ease: 'none', duration: 1 },
      scrollTrigger: { trigger: section, start: 0, end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
    })
    .to('.hero-copy', { y: -90 }, 0)
    .to('.hero-copy', { opacity: 0.1, ease: 'power2.in' }, 0)
    .to('.hero-visual', { y: 110 }, 0)
    .fromTo('.hero-stage', { rotationX: 0, rotationY: 0 }, { rotationX: 9, rotationY: -14 }, 0)
    .to(site, { y: pageScroll, duration: 0.6, ease: 'power1.inOut' }, 0)
    .to('[data-depth="phone"]', { y: -150 }, 0)
    .to('[data-depth="chart"]', { y: -110 }, 0)
    .to('[data-depth="toast"]', { y: -80 }, 0)
    .to('[data-depth="score"]', { y: -50 }, 0);
}

// Desktop: a cursor shops on the mock site — presses "Shop the collection", taps the vase (the bag count bumps),
// opens the bag — on a loop that only runs while the hero is on screen.
function heroCursor() {
  const browser = $('.mock-browser');
  const cursor = browser && $('.mock-cursor', browser);
  const ripple = browser && $('.mock-ripple', browser);
  if (!cursor || !ripple) return;
  const badge = $('.mock-cart em', browser);
  const stops = ['.ms-cta', '.ms-tag', '.mock-cart'].map((s) => $(s, browser)).filter(Boolean);

  // Centre of an element relative to the browser frame, in the frame's own (unscaled) pixels.
  const centre = (el) => {
    const frame = browser.getBoundingClientRect();
    const scale = frame.width / browser.offsetWidth || 1;
    const box = el.getBoundingClientRect();
    return { x: (box.left - frame.left + box.width / 2) / scale, y: (box.top - frame.top + box.height / 2) / scale };
  };
  // Distance from the cursor's resting spot to an element; the arrow's tip is 4px in from its corner.
  const travel = (el, axis) => centre(el)[axis] - (axis === 'x' ? cursor.offsetLeft : cursor.offsetTop) - 4;

  // repeatRefresh re-measures the targets on every lap (the mock page may have scrolled meanwhile).
  const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1, repeatRefresh: true, delay: 1.8, defaults: { ease: 'power3.inOut' } });
  stops.forEach((el, i) => {
    tl.to(cursor, { x: () => travel(el, 'x'), y: () => travel(el, 'y'), duration: 1.1 }, i ? '+=0.5' : 0)
      .to(cursor, { scale: 0.8, duration: 0.12, ease: 'power2.in' })
      .set(ripple, { x: () => centre(el).x, y: () => centre(el).y })
      .fromTo(ripple, { scale: 0.3, autoAlpha: 0.8 }, { scale: 2.2, autoAlpha: 0, duration: 0.7, ease: 'power2.out' })
      .to(cursor, { scale: 1, duration: 0.25, ease: 'back.out(3)' }, '<');
    if (badge && i === 1) {
      tl.fromTo(badge, { scale: 1 }, { scale: 1.5, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, '<');
    }
  });
  tl.to(cursor, { x: 0, y: 0, duration: 1.2 }, '+=0.6');

  const trigger = ScrollTrigger.create({
    trigger: '.hero',
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  });
  if (trigger.isActive) tl.play();
}

/* ---------- Marquees ---------- */

// Endless strips that move only while on screen; their speed and direction follow the scroll, and they lean
// into fast scrolling.
function marquees() {
  $$('[data-marquee]').forEach((wrap) => {
    // The track holds the items twice, so moving it by half its width loops seamlessly.
    const track = wrap.firstElementChild;
    const reverse = wrap.dataset.marquee === 'reverse';
    const loop = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: Number(wrap.dataset.speed) || 40, ease: 'none', repeat: -1 }
    );
    loop.totalTime(loop.duration() * 500); // start deep into the loop so it can also run backwards

    const lean = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3.out' });
    let direction = 1;
    let settle;
    const speed = (timeScale) => gsap.to(loop, { timeScale, duration: 0.6, ease: 'power2.out', overwrite: true });

    ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()), // idle while off screen
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        direction = self.direction;
        speed(direction * (1 + gsap.utils.clamp(0, 4, Math.abs(velocity) / 600)));
        lean(gsap.utils.clamp(-9, 9, velocity / -260));
        settle?.kill();
        settle = gsap.delayedCall(0.18, () => {
          speed(direction);
          lean(0);
        });
      },
    });
  });
}

/* ---------- Services ---------- */

function offerCards(desktop) {
  revealEach(
    $$('.offer-card'),
    (card) => {
      gsap.set(card, {
        autoAlpha: 0,
        y: desktop ? 110 : 50,
        rotationX: desktop ? 12 : 0,
        transformPerspective: 1400,
        transformOrigin: '50% 0%',
      });
      gsap.set($('.offer-icon', card), { scale: 0.3, rotation: -40 });
      gsap.set($$('li', card), { autoAlpha: 0, x: -14 });
    },
    (card) =>
      gsap
        .timeline()
        .to(card, { autoAlpha: 1, y: 0, rotationX: 0, duration: 1.3, ease: 'expo.out', clearProps: 'transform' })
        .to($('.offer-icon', card), { scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(2)', clearProps: 'transform' }, 0.25)
        .to($$('li', card), { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power2.out', stagger: 0.05, clearProps: 'transform' }, 0.4),
    0.16
  );
}

// The illustration is uncovered from the bottom, then its parts come alive: [data-grow] bars rise,
// [data-draw] lines draw themselves and [data-pop] badges spring in.
function designCards(desktop) {
  const clip = (top) => `inset(${top}% 0% 0% 0% round 26px)`;
  // Not every illustration has every kind of part, and GSAP warns about empty target lists.
  const parts = (card) => ({
    pop: $$('[data-pop]', card),
    grow: $$('[data-grow]', card),
    draw: $$('[data-draw]', card),
  });
  revealEach(
    $$('.diff-card'),
    (card) => {
      const { pop, grow, draw } = parts(card);
      gsap.set($('.diff-art', card), { clipPath: clip(100) });
      gsap.set($('.art', card), { scale: 1.3, yPercent: 14 });
      gsap.set($$('.diff-copy > *', card), { autoAlpha: 0, y: 24 });
      if (pop.length) gsap.set(pop, { scale: 0 });
      if (grow.length) gsap.set(grow, { scaleY: 0, transformOrigin: '50% 100%' });
      if (draw.length) gsap.set(draw, { strokeDashoffset: 1 });
    },
    (card) => {
      const { pop, grow, draw } = parts(card);
      const tl = gsap
        .timeline()
        .to($('.diff-art', card), { clipPath: clip(0), duration: 1.25, ease: 'expo.out', clearProps: 'clipPath' })
        .to($('.art', card), { scale: 1, yPercent: 0, duration: 1.5, ease: 'expo.out' }, 0)
        .to($$('.diff-copy > *', card), { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.08, clearProps: 'transform' }, 0.3);
      if (draw.length) tl.to(draw, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 0.4);
      if (grow.length) tl.to(grow, { scaleY: 1, duration: 0.9, ease: 'expo.out', stagger: 0.05, clearProps: 'transform' }, 0.45);
      if (pop.length) tl.to(pop, { scale: 1, duration: 0.7, ease: 'back.out(2.4)', stagger: 0.08, clearProps: 'transform' }, 0.6);
      return tl;
    }
  );

  if (!desktop) return;
  // A little depth while the illustrations pass through the viewport.
  $$('.diff-card .art').forEach((art) =>
    gsap.fromTo(
      art,
      { y: 26 },
      { y: -26, ease: 'none', scrollTrigger: { trigger: art.closest('.diff-card'), start: 'top bottom', end: 'bottom top', scrub: true } }
    )
  );
}

/* ---------- Concepts ---------- */

// Desktop with room to pin: the section holds while the row scrolls sideways with the page; the counter and
// bar follow along, cards ease up to full size as they arrive, and the chips on each screen drift faster than
// the screen behind them. Elsewhere the row is swiped natively and its cards rise in.
function showcase(pinnable) {
  const section = $('#work');
  if (!section) return undefined;
  const viewport = $('.work-viewport', section);
  const track = $('.work-track', section);
  const cards = $$('.work-card', section);

  if (!pinnable) {
    revealEach(
      [...cards, $('.work-end', section)].filter(Boolean),
      (el) => gsap.set(el, { autoAlpha: 0, y: 60 }),
      (el) => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', clearProps: 'transform' }),
      0.12
    );
    return undefined;
  }

  const counter = $('.work-count b', section);
  const setBar = gsap.quickSetter($('.work-bar i', section), 'scaleX');
  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  section.classList.add('is-pinned');
  viewport.scrollLeft = 0;
  gsap.set(viewport, { overflow: 'hidden' }); // the page moves the row now, not the visitor's sideways scroll

  const row = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: 2, // above the process pin: measure pins in page order
      onUpdate: (self) => {
        setBar(self.progress);
        counter.textContent = String(Math.min(cards.length, Math.floor(self.progress * cards.length) + 1)).padStart(2, '0');
      },
    },
  });

  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { scale: 0.9, autoAlpha: 0.55 },
      { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: row, start: 'left 105%', end: 'left 62%', scrub: true } }
    );
    const chips = $$('[data-float]', card);
    if (chips.length) {
      gsap.fromTo(
        chips,
        { x: 46 },
        { x: -46, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: row, start: 'left right', end: 'right left', scrub: true } }
      );
    }
  });

  return () => section.classList.remove('is-pinned');
}

/* ---------- Comparison ---------- */

function comparison(desktop) {
  const shift = desktop ? 60 : 24;
  $$('.cmp-col').forEach((col) => {
    if (onScreen(col)) return;
    const good = !!$('.cmp-row.good', col);
    const at = desktop && good ? 0.2 : 0; // the "with a website" side answers the other a beat later
    gsap
      .timeline({ scrollTrigger: { trigger: col, start: 'top 82%', once: true } })
      .from($('.cmp-label', col), { autoAlpha: 0, y: 14, duration: 0.5, ease: EASE }, at)
      .from($$('.cmp-row', col), { autoAlpha: 0, x: good ? shift : -shift, duration: 0.85, ease: EASE, stagger: 0.09, clearProps: 'transform' }, at + 0.1)
      .from($$('.cmp-row > span', col), { scale: 0, duration: 0.5, ease: 'back.out(3)', stagger: 0.09, clearProps: 'transform' }, at + 0.35);
  });

  const vs = $('.cmp-vs');
  if (vs && desktop && !onScreen(vs)) {
    gsap.from(vs, {
      scale: 0,
      rotation: -120,
      duration: 0.9,
      ease: 'back.out(2)',
      clearProps: 'transform',
      scrollTrigger: { trigger: vs, start: 'top 80%', once: true },
    });
  }

  const banner = $('.cmp-banner');
  if (banner && !onScreen(banner)) {
    gsap.from(banner, {
      autoAlpha: 0,
      y: 70,
      scale: 0.95,
      duration: 1.2,
      ease: 'expo.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: banner, start: START, once: true },
    });
  }

  // The one-line summary lights up word by word as it is read; fully lit by the time it is mid-screen.
  const title = $('.cmp-banner-title');
  if (title) {
    const split = SplitText.create(title, { type: 'words', tag: 'span', aria: 'none' });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: title, start: 'top 92%', end: 'top 62%', scrub: 0.6 } }
    );
  }
}

/* ---------- Process ---------- */

// Desktop: the section holds still for a short scroll while the line draws across the four steps
// and each one lights up as the line reaches it.
function processSteps() {
  const section = $('#process');
  const fill = section && $('.proc-line-fill', section);
  if (!fill) return;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'center center+=40', // a little low, so the heading clears the sticky navbar
      end: () => `+=${Math.round(window.innerHeight * 0.9)}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      refreshPriority: 1, // measure triggers in page order now that pins add space
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0);
  $$('.proc-step', section)
    .slice(1)
    .forEach((step, i) => {
      const at = i + 1; // the line reaches step n at time n
      tl.fromTo(
        $('.proc-icon', step),
        { scale: 0.72, backgroundColor: '#f1eadf' },
        { scale: 1, backgroundColor: '#ead7b4', duration: 0.35, ease: 'back.out(2.5)' },
        at - 0.18
      ).fromTo($$('h3, p', step), { opacity: 0.28 }, { opacity: 1, duration: 0.3 }, at - 0.15);
    });
  tl.to({}, { duration: 0.4 }); // hold the finished row for a moment before letting go
}

/* ---------- Footer ---------- */

// The giant wordmark's letters rise into their mask as the footer scrolls into view (scrubbed).
function footerMark() {
  const mark = $('.footer-mark');
  if (!mark) return;
  const split = SplitText.create(mark, { type: 'chars', aria: 'none' });
  gsap.from(split.chars, {
    yPercent: 110,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
  });
}

function finalIcon() {
  const icon = $('.final-icon');
  if (!icon || onScreen(icon)) return;
  gsap.from(icon, {
    scale: 0,
    rotation: -180,
    duration: 1.1,
    ease: 'back.out(1.8)',
    scrollTrigger: { trigger: icon, start: START, once: true },
  });
}

/* ---------- Setup ---------- */

export function initHomeMotion() {
  // matchMedia reverts everything (restoring the original markup) and re-runs when a condition changes.
  gsap.matchMedia().add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 961px)',
      tall: '(min-height: 720px)',
    },
    ({ conditions: { motion, desktop, tall } }) => {
      if (!motion) return undefined;
      const cleanups = [];
      // One failing effect must not take the others down (or leave content hidden).
      const run = (name, setup) => {
        try {
          const undo = setup();
          if (typeof undo === 'function') cleanups.push(undo);
        } catch (err) {
          console.error(`[motion] ${name} failed`, err);
        }
      };
      run('headings', splitHeadings);
      run('masked lines', maskedLines);
      run('reveals', () => fadeReveals(desktop));
      run('staggers', () => staggerReveals(desktop));
      run('counters', counters);
      run('parallax', parallax);
      run('hero', () => hero(desktop));
      if (desktop) run('hero cursor', heroCursor);
      run('marquees', marquees);
      run('offer cards', () => offerCards(desktop));
      run('design cards', () => designCards(desktop));
      run('concepts', () => showcase(desktop && tall)); // pins before the process pin: page order
      run('comparison', () => comparison(desktop));
      if (desktop && tall) run('process', processSteps);
      run('footer wordmark', footerMark);
      run('final icon', finalIcon);
      return () => cleanups.forEach((undo) => undo());
    }
  );
}
