import Icon from './Icon';
import { included, industryUseCases } from '@/data/site';
import '../css/Industries.css';

// One icon per entry in industryUseCases, in the same order.
const industryIcons = ['heart', 'utensils', 'bag', 'book', 'home', 'rocket', 'scissors', 'box', 'briefcase'];

const Industries = () => {
  return (
    <>
      <section className="section ind" id="industries">
        <span className="glow ind-glow" data-parallax="0.5" aria-hidden="true" />
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow" data-reveal="left">Who we build for</span>
              <h2 className="h-lg" data-split>
                Whatever you sell, teach or serve —
                <br />
                <em>your business belongs online.</em>
              </h2>
            </div>
            <p className="lead" data-reveal data-delay="0.15">
              Every industry has its own searches and its own workflows. Here is what businesses like yours usually
              ask us to build first.
            </p>
          </div>

          <div className="ind-grid" data-stagger>
            {industryUseCases.map((g, i) => (
              <article key={g.title} className="ind-card">
                <div className="ind-top">
                  <span className="ind-icon" data-pop><Icon name={industryIcons[i] || 'sparkle'} size={20} /></span>
                  <span className="ind-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="ind-note" data-reveal>
            Your business isn’t listed? Every project starts with the same conversation.{' '}
            <a href="#quote">Tell us about your business →</a>
          </p>
        </div>
      </section>

      <section className="section section-soft inc">
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow" data-reveal="left">In every project</span>
              <h2 className="h-lg" data-split>
                The details are <em>taken care of.</em>
              </h2>
            </div>
            <p className="lead" data-reveal data-delay="0.15">
              Included in every project — not sold as add-ons later.
            </p>
          </div>

          <div className="inc-grid" data-stagger="content">
            {included.map((f, i) => (
              <article key={f.title} className="inc-card">
                <span className="inc-icon" data-pop><Icon name={f.icon} size={20} /></span>
                <span className="inc-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Industries;
