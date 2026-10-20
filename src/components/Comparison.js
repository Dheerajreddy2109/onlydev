import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { withoutSite, withSite } from '@/data/site';
import '../css/Comparison.css';

const Comparison = () => {
  return (
    <section className="section cmp">
      <span className="glow cmp-glow" data-parallax="0.4" aria-hidden="true" />
      <div className="container">
        <div className="split-head">
          <div>
            <span className="eyebrow" data-reveal="left">What staying offline costs you</span>
            <h2 className="h-lg" data-split>
              Customers look for you first.
              <br />
              Right now they find <em>someone else.</em>
            </h2>
          </div>
          <p className="lead" data-reveal data-delay="0.15">
            Almost every buying decision starts with a Google search — and the business that shows up well is the one
            that gets the call. Without a website, and the right web app behind it, you are not even in the
            comparison.
          </p>
        </div>

        <div className="cmp-grid">
          <div className="cmp-col">
            <h3 className="cmp-label bad"><Icon name="x" size={14} strokeWidth={2.4} /> Without a website</h3>
            {withoutSite.map((t) => (
              <p key={t} className="cmp-row bad">
                <span><Icon name="x" size={13} strokeWidth={2.6} /></span>
                {t}
              </p>
            ))}
          </div>
          <span className="cmp-vs" aria-hidden="true">vs</span>
          <div className="cmp-col">
            <h3 className="cmp-label good"><Icon name="check" size={14} strokeWidth={2.4} /> With your own website &amp; web app</h3>
            {withSite.map((t) => (
              <p key={t} className="cmp-row good">
                <span><Icon name="check" size={13} strokeWidth={2.6} /></span>
                {t}
              </p>
            ))}
          </div>
        </div>

        <div className="cmp-banner">
          <div>
            <span className="eyebrow">The gap, in one line</span>
            <p className="cmp-banner-title">
              A business without a website is not compared and rejected. It is never compared at all.
            </p>
          </div>
          <div className="cmp-banner-cta">
            <ContactButton className="btn btn-primary" source="comparison" title="Let’s get your business online.">
              Get my business online <Icon name="arrow" />
            </ContactButton>
            <small>Tell us what you do — we send a written quote.</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
