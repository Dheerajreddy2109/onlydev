import Icon from './Icon';
import FaqList from './FaqList';
import { faqs, techStack } from '@/data/site';
import '../css/FAQ.css';

const FAQ = () => {
  const allTech = Object.values(techStack).flat();

  return (
    <>
      <section className="section" id="faq">
        <div className="container faq-wrap">
          <div className="faq-head">
            <span className="eyebrow" data-reveal="left">FAQ</span>
            <h2 className="h-lg" data-split>What people ask <em>before they book.</em></h2>
            <p className="lead" style={{ marginTop: 16 }} data-reveal data-delay="0.15">
              Straight answers about timelines, SEO, ownership and web app development.
            </p>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="section tech">
        <div className="tech-marquee" aria-hidden="true" data-marquee="reverse" data-speed="55">
          <div className="tech-track">
            {[...allTech, ...allTech].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow" data-reveal="left">Powered by</span>
              <h2 className="h-lg" data-split>The same engineering that runs <em>serious products.</em></h2>
            </div>
            <p className="lead" data-reveal data-delay="0.15">
              Your website is not built on a drag-and-drop page builder. It runs on the frameworks, databases and cloud
              services that modern product teams use — set up and maintained for you.
            </p>
          </div>

          <div className="tech-groups" data-stagger>
            {Object.entries(techStack).map(([group, items]) => (
              <div key={group} className="tech-group">
                <h3>{group}</h3>
                <div>
                  {items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="tech-callout" data-reveal>
            <Icon name="rocket" size={22} />
            <p>
              <b>The day your business takes off, nothing has to be rebuilt.</b> The same stack runs a one-page
              website and a platform with thousands of users, orders and logins — we switch on what you need, when you
              need it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
