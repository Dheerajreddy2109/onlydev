import Icon from './Icon';
import Logo from './Logo';
import ContactButton from './contact/ContactButton';
import { site } from '@/data/site';
import '../css/Footer.css';

const columns = [
  {
    title: 'Websites',
    links: [
      ['Business websites', '#services'],
      ['E-commerce stores', '#work'],
      ['Landing pages', '#services'],
      ['Website redesign', '#quote'],
    ],
  },
  {
    title: 'Web apps',
    links: [
      ['SaaS & MVP development', '#services'],
      ['Booking systems', '#build'],
      ['CRM & dashboards', '#work'],
      ['Customer portals', '#services'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Concepts', '#work'],
      ['How we build', '#build'],
      ['Process', '#process'],
      ['FAQ', '#faq'],
      ['Contact', '#quote'],
    ],
  },
];

const Footer = () => {
  return (
    <>
      <section className="final-cta">
        <div className="container">
          <div className="final-panel">
            <span className="glow final-glow" data-parallax="0.4" aria-hidden="true" />
            <div className="final-inner">
              <Icon name="sparkle" size={28} className="final-icon" />
              <h2 className="h-xl" data-split="chars">
                Not sure what <em>you need?</em>
              </h2>
              <p className="lead" data-reveal data-delay="0.2">
                Tell us about your business in two lines and we will tell you honestly whether you need a website, a
                web app, or both. If a simple website is enough, we will say so.
              </p>
              <div className="final-btns" data-reveal data-delay="0.35">
                <ContactButton
                  className="btn btn-primary"
                  source="final cta"
                  prefill={{ project: 'Not sure yet' }}
                  title="Tell us what you’re planning."
                >
                  Help me choose <Icon name="arrow" />
                </ContactButton>
                <a href={`mailto:${site.email}`} className="btn btn-ghost">
                  <Icon name="mail" size={18} /> {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid" data-stagger>
          <div className="footer-brand">
            <Logo id="footer-logo" />
            <p>
              Custom websites and web applications for businesses and startups — designed around you, delivered on a
              date in writing, and yours to keep.
            </p>
            <a href={`mailto:${site.email}`} className="footer-mail">
              <Icon name="mail" size={16} /> {site.email}
            </a>
          </div>
          {columns.map((c) => (
            <nav key={c.title} className="footer-col" aria-label={c.title}>
              <h3>{c.title}</h3>
              {c.links.map(([label, href]) => (
                <a key={label} href={href}>{label}</a>
              ))}
            </nav>
          ))}
        </div>

        {/* Giant wordmark; its letters rise as the footer scrolls into view (src/lib/motion.js). */}
        <div className="container">
          <div className="footer-mark" aria-hidden="true">
            <span>Only</span>
            <em>Dev</em>
          </div>
        </div>

        <div className="container">
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {site.name}. Made in India.</span>
            <span>Website development · Web application development · SaaS · E-commerce</span>
          </div>
        </div>
      </footer>

      <div className="sticky-bar">
        <ContactButton className="btn btn-primary" source="mobile sticky bar">
          <Icon name="sparkle" size={18} /> Get a free quote — reply in 24h
        </ContactButton>
      </div>
    </>
  );
};

export default Footer;
