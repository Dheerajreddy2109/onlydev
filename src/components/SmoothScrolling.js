"use client";

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { setLenis } from '@/lib/lenis';

export default function SmoothScrolling({ children }) {
  const progressRef = useRef(null);

  useEffect(() => {
    // Lenis honours prefers-reduced-motion by itself (no smoothing, instant jumps).
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -96 },
    });
    setLenis(lenis);

    // One frame loop for both: Lenis moves the page, ScrollTrigger reads it in the same tick.
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const progress = gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });

    // Parts of the page change height after load (planner steps, FAQ answers, web fonts),
    // which moves every trigger below them; re-measure when that happens.
    const main = document.querySelector('main') || document.body;
    let lastHeight = main.offsetHeight;
    let timer;
    const observer = new ResizeObserver(() => {
      if (Math.abs(main.offsetHeight - lastHeight) < 2) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        ScrollTrigger.refresh();
        lastHeight = main.offsetHeight;
      }, 150);
    });
    observer.observe(main);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      progress.scrollTrigger?.kill();
      progress.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      {children}
    </>
  );
}
