import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { offerings } from '@/data/site';
import '../css/Services.css';

const chartLine = 'M0 58 C 20 54, 30 44, 50 46 S 80 30, 100 34 S 130 18, 150 22 S 190 8, 220 6';

// Illustrations reveal on scroll (src/lib/motion.js): [data-pop] springs in, [data-grow] rises from the
// bottom and [data-draw] lines draw themselves.
const differences = [
  {
    tone: 'sand',
    title: 'Look as good as your work.',
    text: 'Your own design, your story. A first impression that feels like you — not like a theme.',
    art: (
      <div className="art art-brand">
        <div className="ab-card ab-type">
          <span className="ab-label">Typeface</span>
          <b className="ab-aa">
            Aa<small>Aa</small>
          </b>
          <span className="ab-note">Serif display · Clean sans</span>
        </div>
        <div className="ab-card ab-colors">
          <span className="ab-label">Palette</span>
          <div className="ab-swatches">
            {['#b8714b', '#e7c9a6', '#f6ede2', '#7f8b69'].map((c) => (
              <i key={c} style={{ '--c': c }} data-pop />
            ))}
          </div>
        </div>
        <div className="ab-card ab-ui">
          <em>Book a visit</em>
          <span className="ab-mark">T.</span>
        </div>
        <span className="art-badge" data-pop><Icon name="check" size={20} strokeWidth={2.6} /></span>
      </div>
    ),
  },
  {
    tone: 'mist',
    title: 'Let your product do the talking.',
    text: 'Dashboards, catalogues and flows that make complex things feel simple to use.',
    art: (
      <div className="art art-dash">
        <div className="ad-side">
          <i className="on" /><i /><i /><i />
        </div>
        <div className="ad-main">
          <div className="ad-kpis">
            <div><span>Revenue</span><b>₹1.2L</b></div>
            <div><span>Orders</span><b>342</b></div>
            <div><span>Repeat</span><b>38%</b></div>
          </div>
          <svg className="ad-chart" viewBox="0 0 220 70">
            <defs>
              <linearGradient id="ad-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8f86d6" stopOpacity="0.32" />
                <stop offset="1" stopColor="#8f86d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${chartLine} L220 70 L0 70 Z`} fill="url(#ad-fill)" />
            <path className="ad-line" d={chartLine} pathLength="1" data-draw />
          </svg>
          <div className="ad-bars">
            {[38, 62, 46, 74, 58, 90, 70].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} data-grow />
            ))}
          </div>
        </div>
        <span className="art-chip" data-pop><Icon name="chart" size={13} /> +24% this month</span>
      </div>
    ),
  },
  {
    tone: 'sage',
    title: 'One tap. A conversation.',
    text: 'Book, pay, enquire on WhatsApp or call — every page makes the next step obvious.',
    art: (
      <div className="art art-chat">
        <div className="ac-phone">
          <div className="ac-head">
            <i>G</i>
            <div><b>Glow Studio</b><span>online</span></div>
          </div>
          <p className="ac-msg in">Hi! Any slot tomorrow evening?</p>
          <p className="ac-msg out">Yes — 5:30 or 7:00 pm?</p>
          <p className="ac-msg in">5:30 works, thank you!</p>
          <div className="ac-typing"><i /><i /><i /></div>
        </div>
        <div className="ac-book" data-pop>
          <span><Icon name="calendar" size={14} /></span>
          <div>
            <b>Booked · Thu 5:30 pm</b>
            <small>Reminder on WhatsApp</small>
          </div>
        </div>
      </div>
    ),
  },
];

const Services = () => {
  return (
    <>
      <section className="section section-soft svc" id="services">
        <span className="glow svc-glow" data-parallax="0.5" aria-hidden="true" />
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow" data-reveal="left">What we build</span>
              <h2 className="h-lg" data-split>
                Two things.
                <br />
                Done <em>properly.</em>
              </h2>
            </div>
            <p className="lead" data-reveal data-delay="0.15">
              We only build for the web — so every hour goes into making your website or web application faster,
              clearer and better at bringing in business than the one your competitor bought.
            </p>
          </div>

          <div className="offer-grid">
            {offerings.map((o, idx) => (
              <article key={o.id} className={`offer-card ${idx === 1 ? 'feature' : ''}`}>
                <span className="offer-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                <div className="offer-top">
                  <span className="offer-icon"><Icon name={idx === 0 ? 'layout' : 'code'} size={22} /></span>
                  <span className="offer-eyebrow">{o.eyebrow}</span>
                </div>
                <h3 className="h-md">{o.title}</h3>
                <p className="offer-text">{o.text}</p>
                <ul>
                  {o.items.map((it) => (
                    <li key={it}>
                      <Icon name="check" size={14} strokeWidth={2.4} /> {it}
                    </li>
                  ))}
                </ul>
                <ContactButton
                  className="offer-link"
                  source={`services: ${o.eyebrow}`}
                  title={idx === 0 ? 'Tell us about your website.' : 'Tell us about your web app.'}
                  prefill={{ project: idx === 0 ? 'Business website' : 'Web app / SaaS' }}
                >
                  Get a quote for {idx === 0 ? 'a website' : 'a web app'} <Icon name="arrow" size={16} />
                </ContactButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section diff" id="design">
        <span className="glow diff-glow" data-parallax="0.4" aria-hidden="true" />
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow" data-reveal="left">Built around your business</span>
              <h2 className="h-lg" data-split>
                Good design.
                <br />
                A <em>real</em> difference.
              </h2>
            </div>
            <div data-reveal data-delay="0.15">
              <p className="lead">
                From a local shop’s first website to a startup’s first product — show people why you are worth
                choosing, and make it effortless to say yes.
              </p>
              <ContactButton className="link-arrow link-button" style={{ marginTop: 18 }} source="design-section">
                Talk about my project <Icon name="arrow" />
              </ContactButton>
            </div>
          </div>

          <div className="diff-grid">
            {differences.map((d, i) => (
              <article key={d.title} className="diff-card">
                <div className={`diff-art tone-${d.tone}`} aria-hidden="true">{d.art}</div>
                <div className="diff-copy">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
