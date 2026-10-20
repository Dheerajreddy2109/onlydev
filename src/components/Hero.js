import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { keywordStrip } from '@/data/site';
import '../css/Hero.css';

// Promise row under the hero. Numbers count up as they scroll into view ([data-count], src/lib/motion.js).
const stats = [
  { count: 24, unit: 'h', label: 'Written quote with scope, price and date' },
  { count: 100, unit: '%', label: 'Yours — code, domain and every login' },
  { text: 'Live', label: 'Preview link to watch it being built' },
  { text: '1:1', label: 'With the developer, not a sales team' },
];

// The storefront inside the mock browser.
const products = [
  { name: 'Dune vase', price: '₹2,400', art: 'vase' },
  { name: 'Morning cup', price: '₹650', art: 'cup' },
  { name: 'Shore plate', price: '₹980', art: 'plate' },
];

const chartLine = 'M0 50 C 16 48, 24 38, 40 40 S 66 30, 82 32 S 108 20, 124 23 S 150 12, 166 13 S 188 6, 200 4';
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const Hero = () => {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-blob b1" data-parallax="0.5" />
        <span className="hero-blob b2" data-parallax="0.3" />
        <span className="hero-blob b3" data-parallax="0.8" />
        <span className="hero-lines" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="tag hero-pill">
            <i /> Custom websites · Web apps · SaaS
          </span>
          {/* Each phrase rises out of its own mask on first paint (CSS, so it doesn't wait for JavaScript). */}
          <h1 className="hero-title">
            <span className="hl"><span style={{ '--d': '0.05s' }}>Websites</span></span>{' '}
            <span className="hl"><span style={{ '--d': '0.12s' }}>&amp;</span></span>{' '}
            <span className="hl"><span style={{ '--d': '0.19s' }}>web apps</span></span>
            <br />
            <span className="hl"><em style={{ '--d': '0.3s' }}>built to win</em></span>{' '}
            <span className="hl"><span style={{ '--d': '0.38s' }}>customers.</span></span>
          </h1>
          <p className="lead hero-lead">
            We design and develop custom websites, online stores and web applications for growing businesses and
            startups — fast, mobile-first, SEO-ready and <strong>100% yours</strong>. No templates. No page builders.
          </p>

          <div className="hero-ctas">
            <ContactButton className="btn btn-primary hero-cta" source="hero">
              <span className="hero-cta-icon"><Icon name="sparkle" size={18} /></span>
              <span className="btn-stack">
                Get a free quote
                <small>Written quote · reply within 24 hours</small>
              </span>
              <Icon name="arrow" />
            </ContactButton>
            <a href="#work" className="btn btn-ghost">
              See concepts <Icon name="arrow" />
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          {/* GSAP moves .hero-stage (3D tilt), the .depth layers (parallax), .mock-site (the page scrolling inside
              the browser) and .mock-cursor (a small shopping loop). CSS animates the cards inside those wrappers;
              they're kept on separate elements because GSAP folds an element's CSS translate/scale into its own
              transform the first time it touches it. */}
          <div className="hero-stage">
            <div className="mock-browser">
              <div className="mock-bar">
                <span className="mock-dots"><i /><i /><i /></span>
                <span className="mock-url"><Icon name="lock" size={10} /> terrastudio.in</span>
              </div>
              <div className="mock-viewport">
                <div className="mock-nav">
                  <b className="mock-brand">Terra<em>.</em></b>
                  <span className="mock-links"><i>Shop</i><i>Studio</i><i>Journal</i></span>
                  <span className="mock-cart"><Icon name="bag" size={13} /><em>2</em></span>
                </div>
                <div className="mock-site">
                  <div className="ms-hero">
                    <div className="ms-copy">
                      <small>New · Autumn collection</small>
                      <strong>Handmade for slow mornings.</strong>
                      <p>Small-batch stoneware, glazed and fired in our Jaipur studio.</p>
                      <div className="ms-btns">
                        <em className="ms-cta">Shop the collection</em>
                        <em className="ms-ghost">Visit the studio</em>
                      </div>
                    </div>
                    <div className="ms-photo">
                      <span className="ms-arch" />
                      <span className="ms-vase" />
                      <span className="ms-bowl" />
                      <span className="ms-tag">Dune vase · ₹2,400</span>
                    </div>
                  </div>
                  <div className="ms-strip">
                    <span><Icon name="box" size={11} /> Free shipping over ₹1,999</span>
                    <span><Icon name="sparkle" size={11} /> Gift-wrapped</span>
                    <span><Icon name="shield" size={11} /> UPI &amp; COD</span>
                  </div>
                  <div className="ms-products">
                    {products.map((p) => (
                      <div className="ms-card" key={p.name}>
                        <span className={`ms-thumb ${p.art}`} />
                        <b>{p.name}</b>
                        <span>{p.price}</span>
                        <em>Add</em>
                      </div>
                    ))}
                  </div>
                  <div className="ms-visit">
                    <div>
                      <small>Studio visits</small>
                      <b>Sat &amp; Sun · 11–6</b>
                      <span>Throw a pot with us — book a slot online.</span>
                    </div>
                    <em>Book a slot</em>
                  </div>
                </div>
              </div>
              <span className="mock-ripple" />
              <span className="mock-cursor">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M5 3.5 19 12l-6.2 1.4L9.6 19.5 5 3.5Z" />
                </svg>
              </span>
            </div>

            <div className="depth" data-depth="phone">
              <div className="mock-phone">
                <span className="mp-notch" />
                <div className="mp-head"><b>Your bag</b><span>2 items</span></div>
                <div className="mp-item">
                  <span className="mp-thumb vase" />
                  <div><b>Dune vase</b><span>Sand glaze</span></div>
                  <em>₹2,400</em>
                </div>
                <div className="mp-item">
                  <span className="mp-thumb cup" />
                  <div><b>Morning cup</b><span>Set of 2</span></div>
                  <em>₹1,300</em>
                </div>
                <div className="mp-total"><span>Total</span><b>₹3,700</b></div>
                <span className="mp-pay">Pay ₹3,700 with UPI</span>
                <span className="mp-secure"><Icon name="lock" size={9} /> Secure checkout</span>
              </div>
            </div>

            <div className="depth" data-depth="chart">
              <div className="mock-stats">
                <div className="mx-head"><span>Orders · this week</span><em>+18%</em></div>
                <b className="mx-value">126</b>
                <svg className="mx-chart" viewBox="0 0 200 56">
                  <defs>
                    <linearGradient id="mx-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#c9a46c" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#c9a46c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${chartLine} L200 56 L0 56 Z`} fill="url(#mx-fill)" />
                  <path className="mx-line" d={chartLine} pathLength="1" />
                </svg>
                <div className="mx-days">{days.map((d, i) => <i key={i}>{d}</i>)}</div>
              </div>
            </div>

            <div className="depth" data-depth="toast">
              <div className="mock-toast">
                <span className="mock-toast-icon"><Icon name="check" size={13} strokeWidth={2.6} /></span>
                <div>
                  <b>New order · ₹2,400</b>
                  <span>Paid via UPI · just now</span>
                </div>
              </div>
            </div>

            <div className="depth" data-depth="score">
              <div className="mock-score">
                <span className="ring"><span>98</span></span>
                <div>
                  <b>Lighthouse</b>
                  <span>Speed 98 · SEO 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="hero-stats">
          {stats.map((s, i) => (
            <li key={s.label} style={{ '--i': i }}>
              <b>
                {s.text ?? (
                  <>
                    <span data-count={s.count}>{s.count}</span>
                    {s.unit}
                  </>
                )}
              </b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="marquee" aria-label="What we build" data-marquee data-speed="70">
        <div className="marquee-track">
          {[...keywordStrip, ...keywordStrip].map((k, i) => (
            <span key={i} aria-hidden={i >= keywordStrip.length}>
              {k}
              <Icon name="sparkle" size={15} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
