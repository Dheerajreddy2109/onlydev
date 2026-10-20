import Image from 'next/image';
import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { site } from '@/data/site';
import '../css/Footer.css';

const columns = [
  {
    title: 'Websites',
    links: [
      ['Business websites', '#pricing'],
      ['E-commerce stores', '#pricing'],
      ['Landing pages', '#pricing'],
      ['Website redesign', '#quote'],
    ],
  },
  {
    title: 'Web apps',
    links: [
      ['SaaS & MVP development', '#pricing'],
      ['Booking systems', '#build'],
      ['CRM & dashboards', '#pricing'],
      ['Customer portals', '#services'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['How we build', '#build'],
      ['Process', '#process'],
      ['FAQ', '#faq'],
      ['Get a free quote', '#quote'],
    ],
  },
];

const Footer = () => {
  return (
    <>
      <section className="final-cta">
        <div className="container final-inner">
          <Icon name="sparkle" size={28} className="final-icon" />
          <h2 className="h-lg" data-split="chars">Not sure what you need?</h2>
          <p className="lead" data-reveal data-delay="0.2">
            Tell us about your business in two lines and we will tell you honestly whether you need a website, a web
            app, or both. If the smallest package is enough, we will say so.
          </p>
          <div className="final-btns" data-reveal data-delay="0.35">
            <ContactButton className="btn btn-dark" source="final cta" prefill={{ project: 'Not sure yet' }} title="Tell us what you’re planning.">
              Help me choose <Icon name="arrow" />
            </ContactButton>
            <a href={`mailto:${site.email}`} className="btn btn-ghost">
              <Icon name="mail" size={18} /> {site.email}
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid" data-stagger>
          <div className="footer-brand">
            <div className="footer-logo">
              <Image src="/images/logos/IMG_3904.jpeg" alt="" width={36} height={36} />
              <span>Only <span>Dev</span></span>
            </div>
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
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. Made in India.</span>
          <span>Website development · Web application development · SaaS · E-commerce</span>
        </div>
      </footer>

      <div className="sticky-bar">
        <ContactButton className="btn btn-wa" source="mobile sticky bar">
          <Icon name="sparkle" size={18} /> Get a free quote — reply in 24h
        </ContactButton>
      </div>
    </>
  );
};

export default Footer;
