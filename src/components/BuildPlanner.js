"use client";

import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { buildPlans, industries, projectTypes } from '@/data/site';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { getLenis } from '@/lib/lenis';
import '../css/BuildPlanner.css';

const STEP_MS = 1700;
const DEFAULT_CITY = 'Hyderabad';

const fmtHours = (h) => `${Number.isInteger(h) ? h : h.toFixed(1)} h`;

// Counts up once, the first time the heading scrolls into view. Later project changes just update the number.
// A plain effect with its own cleanup (not useGSAP) so a project change can't replay the count from zero.
function HeadingCount({ value }) {
  const ref = useRef(null);
  const counted = useRef(false);
  useEffect(() => {
    if (counted.current || prefersReducedMotion()) return undefined;
    const node = ref.current.firstChild; // React's text node; only its text is changed here
    const state = { v: 0 };
    let tween;
    node.nodeValue = '0';
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        counted.current = true;
        tween = gsap.to(state, {
          v: value,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            node.nodeValue = String(Math.round(state.v));
          },
          onComplete: () => {
            node.nodeValue = String(value);
          },
        });
      },
    });
    return () => {
      trigger.kill();
      tween?.kill();
    };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}

function makeFill({ name, city, industry }) {
  const safeName = name.trim() || industry.sample;
  const safeCity = city.trim() || DEFAULT_CITY;
  const slug = safeName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'yourbusiness';
  const vars = { name: safeName, city: safeCity, noun: industry.noun, topic: industry.topic, slug };
  return (text) => text.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

function StepBody({ step, fill }) {
  if (step.kind === 'chat') {
    return (
      <div className="bp-chat">
        {step.questions.map((q) => (
          <p key={q} className="bubble">{fill(q)}</p>
        ))}
        <p className="bubble me">{fill(step.answer)}</p>
        <p className="bubble">{fill(step.followUp)}</p>
      </div>
    );
  }

  if (step.kind === 'search') {
    return (
      <>
        <ul className="bp-search">
          {step.rows.map((r) => (
            <li key={r.q} className={r.keep ? 'keep' : 'drop'}>
              <Icon name="search" size={15} />
              <div>
                <b>{fill(r.q).toLowerCase()}</b>
                <span>{r.note}</span>
              </div>
              <em>
                <Icon name={r.keep ? 'check' : 'x'} size={12} strokeWidth={2.4} />
                {r.keep ? 'Keep' : 'Drop'}
              </em>
            </li>
          ))}
        </ul>
        <p className="bp-foot">{fill(step.footnote)}</p>
      </>
    );
  }

  if (step.kind === 'design') {
    const initial = fill('{name}').charAt(0).toUpperCase();
    return (
      <div className="bp-design">
        <div className="bp-design-desktop">
          <div className="bp-design-nav"><i>{initial}</i><span>{fill('{name}')}</span></div>
          <strong>{fill('{name}')}</strong>
          <p>{fill('The {noun} {city} trusts.')}</p>
          <em>Get in touch</em>
        </div>
        <div className="bp-design-phone">
          <div className="notch" />
          <i>{initial}</i>
          <strong>{fill('{name}')}</strong>
          <em>Book now</em>
        </div>
        <div className="bp-swatches">
          <span style={{ background: '#2f2a24' }} />
          <span style={{ background: '#b8714b' }} />
          <span style={{ background: '#e8cfae' }} />
          <span style={{ background: '#f7f1e8' }} />
          <small>Your palette</small>
        </div>
      </div>
    );
  }

  return (
    <ul className={step.kind === 'checks' ? 'bp-checks' : 'bp-list'}>
      {step.items.map((it) => (
        <li key={it}>
          <Icon name={step.kind === 'checks' ? 'check' : step.icon} size={16} strokeWidth={step.kind === 'checks' ? 2.4 : 1.8} />
          {fill(it)}
        </li>
      ))}
    </ul>
  );
}

const BuildPlanner = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [industryId, setIndustryId] = useState(industries[0].id);
  const [projectId, setProjectId] = useState(projectTypes[0].id);
  const [phase, setPhase] = useState('idle'); // idle | running | done
  const [current, setCurrent] = useState(-1);
  const cardRefs = useRef([]);
  const root = useRef(null);

  const industry = industries.find((i) => i.id === industryId);
  const project = projectTypes.find((p) => p.id === projectId);
  const steps = buildPlans[projectId];
  const fill = makeFill({ name, city, industry });
  const totalHours = steps.reduce((s, st) => s + st.hours, 0);
  const doneCount = phase === 'done' ? steps.length : Math.max(0, current);
  const hoursSoFar = steps.slice(0, doneCount).reduce((s, st) => s + st.hours, 0);

  // Scroll reveals only: the panel and any step card still below the fold rise in as you scroll down to them.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const below = (el) => el.getBoundingClientRect().top > window.innerHeight;
      const panel = root.current.querySelector('.bp-panel');
      if (below(panel)) {
        gsap.from(panel, {
          autoAlpha: 0,
          x: -50,
          duration: 1.1,
          ease: 'expo.out',
          clearProps: 'all',
          scrollTrigger: { trigger: panel, start: 'top 88%', once: true },
        });
      }
      const pending = gsap.utils.toArray('.bp-card', root.current).filter(below);
      gsap.set(pending, { autoAlpha: 0, y: 60 });
      ScrollTrigger.batch(pending, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, clearProps: 'all' }),
      });
    },
    { scope: root, dependencies: [projectId], revertOnUpdate: true }
  );

  useEffect(() => {
    if (phase !== 'running') return;
    const card = cardRefs.current[current];
    if (card && window.innerWidth > 900) {
      // Keep the active step in view; through Lenis so it glides with the rest of the page.
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(card, { offset: -Math.max(120, (window.innerHeight - card.offsetHeight) / 2), duration: 1.1 });
      else card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const t = setTimeout(() => {
      setCurrent(current + 1);
      if (current + 1 >= steps.length) setPhase('done');
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [phase, current, steps.length]);

  const reset = () => {
    setPhase('idle');
    setCurrent(-1);
  };

  const start = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      setCurrent(steps.length);
      return;
    }
    setCurrent(0);
    setPhase('running');
  };

  const stateOf = (i) => {
    if (phase === 'done' || i < current) return 'done';
    if (phase === 'running' && i === current) return 'active';
    return phase === 'idle' ? 'idle' : 'pending';
  };

  const quotePrefill = {
    project: project.label,
    company: name.trim() ? fill('{name}, {city}') : '',
    message: fill(`I'd like a quote for a ${project.label.toLowerCase()} for {name} ({noun}) in {city}. I tried the build planner on your site.`),
  };

  return (
    <section className="section bp" id="build" ref={root}>
      <span className="glow bp-glow" data-parallax="0.6" aria-hidden="true" />
      <div className="container">
        <div className="bp-head">
          <span className="tag bp-badge" data-reveal="left"><i /> Not a template</span>
          <h2 className="h-xl" data-lines>
            <span className="mask-line"><span data-line>Type your idea.</span></span>
            <span className="mask-line">
              <span data-line>
                See the <em><HeadingCount value={Math.round(totalHours)} /> hours</em> behind it.
              </span>
            </span>
          </h2>
          <p className="lead" data-reveal data-delay="0.15">
            A template is a design with your name typed in. What you pay us for is the work around it — the searches
            your customers make, the flows your users need, the design, the build, and getting it onto Google. Try it
            with your own business.
          </p>
        </div>

        <div className="bp-form" data-reveal data-delay="0.1">
          <div className="bp-fields">
            <label>
              <span>Business name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={industry.sample}
                maxLength={40}
              />
            </label>
            <label>
              <span>City</span>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={DEFAULT_CITY} maxLength={30} />
            </label>
          </div>

          <div className="bp-chips-group">
            <span className="bp-chips-label">Your business</span>
            <div className="bp-chips" role="radiogroup" aria-label="Your business">
              {industries.map((i) => (
                <button
                  key={i.id}
                  role="radio"
                  aria-checked={industryId === i.id}
                  className={industryId === i.id ? 'on' : ''}
                  onClick={() => setIndustryId(i.id)}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bp-chips-group">
            <span className="bp-chips-label">What do you need?</span>
            <div className="bp-chips" role="radiogroup" aria-label="What do you need">
              {projectTypes.map((p) => (
                <button
                  key={p.id}
                  role="radio"
                  aria-checked={projectId === p.id}
                  className={projectId === p.id ? 'on alt' : 'alt'}
                  onClick={() => {
                    setProjectId(p.id);
                    reset();
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bp-actions">
            {phase === 'running' ? (
              <button className="bp-start" onClick={() => { setPhase('done'); setCurrent(steps.length); }}>
                <span className="bp-start-icon"><Icon name="arrow" size={16} /></span>
                Skip to the result
              </button>
            ) : (
              <button className="bp-start" onClick={start}>
                <span className="bp-start-icon"><Icon name="play" size={16} /></span>
                {phase === 'done' ? 'Run it again' : 'Start the build'}
              </button>
            )}
            <span className="bp-private"><Icon name="lock" size={14} /> Stays on this page. Nothing is sent.</span>
          </div>
        </div>

        <div className="bp-grid">
          <aside className="bp-panel">
            <span className="bp-panel-label">Hours of work</span>
            <div className="bp-counter">
              <b>{Number.isInteger(hoursSoFar) ? hoursSoFar : hoursSoFar.toFixed(1)}</b>
              <span>/ {fmtHours(totalHours)}</span>
            </div>
            <div className="bp-progress">
              <i style={{ width: `${(hoursSoFar / totalHours) * 100}%` }} />
            </div>
            <p className="bp-now">
              {phase === 'idle' && 'Press start to watch it come together'}
              {phase === 'running' && steps[current] && fill(steps[current].title)}
              {phase === 'done' && 'Done — and no templates used'}
            </p>
            <ol className="bp-steps">
              {steps.map((s, i) => (
                <li key={i} className={stateOf(i)}>
                  <span className="num">
                    {stateOf(i) === 'done' ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="t">{fill(s.title)}</span>
                  <span className="h">{fmtHours(s.hours)}</span>
                </li>
              ))}
            </ol>
          </aside>

          <div className="bp-cards">
            {steps.map((s, i) => (
              <article key={`${projectId}-${i}`} ref={(el) => { cardRefs.current[i] = el; }} className={`bp-card ${stateOf(i)}`}>
                <header>
                  <span className="bp-card-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{fill(s.title)}</h3>
                    <p>{s.sub}</p>
                  </div>
                  <span className="bp-card-hours">{fmtHours(s.hours)}</span>
                </header>
                <StepBody step={s} fill={fill} />
              </article>
            ))}
          </div>
        </div>

        <div className={`bp-result ${phase === 'done' ? 'show' : ''}`}>
          <div className="bp-receipt" data-reveal="left">
            <span className="bp-receipt-label">Your {project.label.toLowerCase()}, itemised</span>
            <h3>{fill('{name}')}</h3>
            <p className="bp-receipt-meta">{fill(projectId === 'website' || projectId === 'store' ? '{city} · {slug}.in' : '{city} · app.{slug}.in')}</p>
            <ul>
              {steps.map((s, i) => (
                <li key={i}>
                  <span>{fill(s.title)}</span>
                  <b>{fmtHours(s.hours)}</b>
                </li>
              ))}
            </ul>
            <div className="bp-receipt-total">
              <span>Hours of work</span><b>{fmtHours(totalHours)}</b>
            </div>
            <div className="bp-receipt-total">
              <span>Templates used</span><b>None</b>
            </div>
            {/* Prices are shared in the written quote, not on the site: the blurred figure is a stand-in
                (not a real price), and the button over it opens the contact popup. */}
            <div className="bp-receipt-price">
              <span>{project.label}</span>
              <div className="bp-price">
                <b aria-hidden="true">₹00,000</b>
                <ContactButton
                  className="bp-price-unlock"
                  source="build planner: price"
                  title={fill('Get the price for {name}.')}
                  prefill={quotePrefill}
                >
                  <Icon name="lock" size={14} /> Get my price
                </ContactButton>
              </div>
              <small>Your exact price comes in a free written quote</small>
            </div>
            <ol className="bp-pay">
              <li><b>Free</b> written quote</li>
              <li><b>Small advance</b> to start</li>
              <li><b>You approve</b> the design</li>
              <li><b>Balance</b> on delivery, before handover</li>
            </ol>
          </div>

          <div className="bp-result-cta" data-reveal="right" data-delay="0.1">
            <h2 className="h-lg">Get the <em>real</em> version of this.</h2>
            <p className="lead">
              Send it as it is. We reply with the keywords, the features, the domain and a written quote for{' '}
              <strong>{fill('{name}')}</strong> — usually the same working day.
            </p>
            <ContactButton
              className="btn btn-primary bp-send"
              source="build planner"
              title={fill('Get the real plan for {name}.')}
              prefill={quotePrefill}
            >
              <Icon name="sparkle" size={22} />
              <span className="btn-stack">
                Send this plan
                <small>Free written quote · no payment needed</small>
              </span>
              <Icon name="arrow" />
            </ContactButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildPlanner;
