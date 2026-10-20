import Icon from './Icon';
import ContactForm from './contact/ContactForm';
import { site, steps } from '@/data/site';
import '../css/Process.css';

const stepIcons = ['chat', 'doc', 'palette', 'rocket'];

const Process = () => {
  return (
    <>
      <section className="section proc" id="process">
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow" data-reveal="left">How we work</span>
              <h2 className="h-lg" data-split>
                Four simple steps.
                <br />
                No technical knowledge <em>needed.</em>
              </h2>
            </div>
            <p className="lead" data-reveal data-delay="0.15">
              From the first message to launch day you always know what happens next, what it costs and when it
              will be ready.
            </p>
          </div>
          <div className="proc-track">
            {/* On desktop this line draws across the steps while the section is pinned (src/lib/motion.js). */}
            <div className="proc-line" aria-hidden="true">
              <span className="proc-line-fill" />
            </div>
            <ol className="proc-grid" data-stagger>
              {steps.map((s, i) => (
                <li key={s.title} className="proc-step">
                  <span className="proc-icon">
                    <Icon name={stepIcons[i]} size={22} />
                    <em>{String(i + 1).padStart(2, '0')}</em>
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section quote" id="quote">
        <span className="glow quote-glow" data-parallax="0.5" aria-hidden="true" />
        <div className="container quote-grid">
          <div>
            <span className="eyebrow" data-reveal="left">Free quote · No obligation</span>
            <h2 className="h-lg" data-split>
              Let’s give customers a reason to <em>choose you.</em>
            </h2>
            <p className="lead" style={{ marginTop: 20 }} data-reveal data-delay="0.15">
              Tell us about your business and what you want to build. You get a fixed price and a delivery date in
              writing — usually the same working day. You speak directly with the people building it.
            </p>
            <ul className="quote-list" data-stagger>
              <li><Icon name="check" size={14} strokeWidth={2.6} /> What fits you best — a website, a web app or both</li>
              <li><Icon name="check" size={14} strokeWidth={2.6} /> One-time cost and any monthly cost, in writing</li>
              <li><Icon name="check" size={14} strokeWidth={2.6} /> Exactly what we will build, and by when</li>
            </ul>
            <div className="quote-contacts" data-reveal>
              <a href={`mailto:${site.email}`}><Icon name="mail" size={16} /> {site.email}</a>
              {site.phoneDisplay && (
                <a href={`tel:${site.phoneDisplay.replace(/\s/g, '')}`}><Icon name="phone" size={16} /> {site.phoneDisplay}</a>
              )}
            </div>
          </div>
          <div className="quote-card" data-reveal="right" data-delay="0.1">
            <h3>Tell us about your project</h3>
            <p className="quote-sub">Two quick steps. Free quote &amp; honest advice.</p>
            <ContactForm source="quote section" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Process;
