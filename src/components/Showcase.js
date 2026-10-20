import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import '../css/Showcase.css';

// Sample designs (not client work), drawn in HTML and CSS. On desktop the section pins and the row scrolls
// sideways with the page; elsewhere it's a swipeable row (src/lib/motion.js, `showcase`).
// [data-float] chips drift faster than the screens behind them while the row moves.

function Browser({ url, children }) {
  return (
    <div className="wb">
      <div className="wb-bar">
        <span className="wb-dots"><i /><i /><i /></span>
        <span className="wb-url"><Icon name="lock" size={9} /> {url}</span>
      </div>
      <div className="wb-screen">{children}</div>
    </div>
  );
}

function Clinic() {
  const days = [['Mon', 11], ['Tue', 12], ['Wed', 13], ['Thu', 14]];
  const times = ['10:00', '11:30', '2:00', '4:30', '6:00', '7:15'];
  const services = [
    { icon: 'sparkle', name: 'Cleaning & polish', price: 'from ₹1,200' },
    { icon: 'heart', name: 'Invisible braces', price: 'from ₹45,000' },
    { icon: 'shield', name: 'Root canal care', price: 'from ₹6,500' },
  ];
  return (
    <div className="sc sc-clinic">
      <div className="sc-nav">
        <b className="sc-logo"><i className="cl-mark" /> Lumen</b>
        <span className="sc-links"><i>Treatments</i><i>Doctors</i><i>Prices</i></span>
        <em className="sc-pill">Book a visit</em>
      </div>
      <div className="cl-hero">
        <div className="cl-copy">
          <small>Koregaon Park · Pune</small>
          <strong>Gentle, modern dentistry.</strong>
          <p>Same-week appointments, clear prices and reminders on WhatsApp.</p>
          <div className="cl-chips">
            <span><Icon name="clock" size={10} /> Open today · 9–8</span>
            <span><Icon name="shield" size={10} /> Painless care</span>
          </div>
        </div>
        <div className="cl-book">
          <b>Book an appointment</b>
          <div className="cl-seg"><i>Check-up</i><i className="on">Cleaning</i><i>Braces</i></div>
          <div className="cl-days">
            {days.map(([d, n], i) => (
              <span key={d} className={i === 1 ? 'on' : ''}><small>{d}</small>{n}</span>
            ))}
          </div>
          <div className="cl-times">
            {times.map((t, i) => <i key={t} className={i === 1 ? 'on' : ''}>{t}</i>)}
          </div>
          <em className="cl-confirm">Confirm · Tue, 11:30</em>
        </div>
      </div>
      <div className="cl-services">
        {services.map((s) => (
          <div key={s.name}>
            <span><Icon name={s.icon} size={12} /></span>
            <b>{s.name}</b>
            <small>{s.price}</small>
          </div>
        ))}
      </div>
      <span className="sc-float cl-float" data-float><Icon name="check" size={11} strokeWidth={2.6} /> Reminder sent on WhatsApp</span>
    </div>
  );
}

function Restaurant() {
  const dishes = [
    { name: 'Kerala prawn curry', note: 'Coconut, kokum, curry leaf', price: '₹420', qty: 1 },
    { name: 'Ghee roast chicken', note: 'Mangalore style, slow-roasted', price: '₹360', qty: 1 },
    { name: 'Appam, two pieces', note: 'Lacy rice pancakes', price: '₹90' },
  ];
  return (
    <div className="sc sc-food">
      <div className="sc-nav">
        <b className="sc-logo">Saffron <em>Table</em></b>
        <span className="sc-links"><i>Menu</i><i>Reserve</i><i>Visit</i></span>
        <em className="sc-pill"><Icon name="bag" size={10} /> 2 · ₹780</em>
      </div>
      <div className="fd-hero">
        <div className="fd-copy">
          <small>Coastal kitchen · Indiranagar</small>
          <strong>Slow-cooked, coast to table.</strong>
          <div className="fd-tabs"><i>Starters</i><i className="on">Mains</i><i>Breads</i><i>Desserts</i></div>
        </div>
        <div className="fd-plate">
          <span className="fd-curry" />
          <span className="fd-rice" />
          <i /><i /><i />
        </div>
      </div>
      <ul className="fd-menu">
        {dishes.map((d) => (
          <li key={d.name}>
            <div><b>{d.name}</b><span>{d.note}</span></div>
            <em>{d.price}</em>
            {d.qty ? (
              <span className="fd-qty"><Icon name="minus" size={9} /> {d.qty} <Icon name="plus" size={9} /></span>
            ) : (
              <span className="fd-add">Add</span>
            )}
          </li>
        ))}
      </ul>
      <span className="sc-float fd-float" data-float><Icon name="clock" size={11} /> Ready in 25 min · pickup</span>
    </div>
  );
}

function Store() {
  const products = [
    { name: 'Linen cushion', price: '₹1,290', art: 'cushion', colors: ['#d8c3a5', '#b9c4ae', '#e3c0b2'] },
    { name: 'Woven tote', price: '₹990', art: 'tote', colors: ['#d9c8ad', '#7f6a55'] },
    { name: 'Cotton throw', price: '₹2,150', art: 'throw', colors: ['#c98f6d', '#9fae94', '#e7cdb8'] },
  ];
  return (
    <div className="sc sc-store">
      <div className="st-promo">Free shipping above ₹1,500 · Cash on delivery available</div>
      <div className="sc-nav">
        <b className="sc-logo">OAK &amp; THREAD</b>
        <span className="st-search"><Icon name="search" size={10} /> Search cushions, throws…</span>
        <span className="st-icons">
          <Icon name="user" size={13} />
          <span className="st-bag"><Icon name="bag" size={13} /><em>1</em></span>
        </span>
      </div>
      <div className="st-filters">
        <i className="on">All</i><i>Living</i><i>Bedroom</i><i>Gifts</i>
        <span>Sort: Popular</span>
      </div>
      <div className="st-grid">
        {products.map((p) => (
          <div className="st-card" key={p.name}>
            <div className={`st-img ${p.art}`}><span /></div>
            <b>{p.name}</b>
            <div className="st-row">
              <span>{p.price}</span>
              <i className="st-dots">{p.colors.map((c) => <i key={c} style={{ background: c }} />)}</i>
            </div>
          </div>
        ))}
      </div>
      <span className="sc-float st-float" data-float><Icon name="check" size={11} strokeWidth={2.6} /> Order #1042 paid via UPI</span>
    </div>
  );
}

function Saas() {
  const nav = [
    { icon: 'grid', label: 'Overview' },
    { icon: 'truck', label: 'Trips' },
    { icon: 'user', label: 'Drivers' },
    { icon: 'chart', label: 'Reports' },
    { icon: 'bell', label: 'Alerts' },
  ];
  const kpis = [
    { label: 'Active trips', value: '128', delta: '+12' },
    { label: 'On time', value: '96.4%', delta: '+1.8%' },
    { label: 'Revenue', value: '₹4.2L', delta: '+9%' },
  ];
  const rows = [
    { id: 'KA-05', driver: 'Ravi K.', route: 'Peenya → Whitefield', status: 'On route', tone: 'ok' },
    { id: 'KA-12', driver: 'Imran S.', route: 'Hosur Road → Airport', status: 'Loading', tone: 'wait' },
    { id: 'KA-09', driver: 'Meera P.', route: 'Yeshwanthpur → HSR', status: 'Delivered', tone: 'done' },
  ];
  const done = 'M0 50 C 25 46, 40 34, 60 36 S 95 22, 120 26 S 160 12, 185 16 S 230 6, 255 10 S 285 4, 300 3';
  const planned = 'M0 56 C 30 54, 50 46, 75 48 S 115 36, 140 40 S 185 28, 210 32 S 260 22, 300 20';
  return (
    <div className="sc sc-saas">
      <aside className="sa-side">
        <b className="sa-logo"><i /> Fleetly</b>
        {nav.map((n, i) => (
          <span key={n.label} className={i === 0 ? 'on' : ''}><Icon name={n.icon} size={11} /> {n.label}</span>
        ))}
      </aside>
      <div className="sa-main">
        <div className="sa-top">
          <div><b>Good morning, Riya</b><span>Tuesday, 12 November</span></div>
          <em className="sa-range">This week <Icon name="chevron" size={9} /></em>
        </div>
        <div className="sa-kpis">
          {kpis.map((k) => (
            <div key={k.label}><span>{k.label}</span><b>{k.value}</b><em>{k.delta}</em></div>
          ))}
        </div>
        <div className="sa-chart">
          <div className="sa-chart-head">
            <b>Deliveries</b>
            <span><i className="d1" /> Completed <i className="d2" /> Scheduled</span>
          </div>
          <svg viewBox="0 0 300 64">
            <defs>
              <linearGradient id="sa-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6b62c9" stopOpacity="0.28" />
                <stop offset="1" stopColor="#6b62c9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${done} L300 64 L0 64 Z`} fill="url(#sa-fill)" />
            <path d={planned} fill="none" stroke="#cfcbea" strokeWidth="1.6" strokeDasharray="4 4" />
            <path d={done} fill="none" stroke="#6b62c9" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="sa-table">
          {rows.map((r) => (
            <div key={r.id} className="sa-row">
              <span className="sa-id">{r.id}</span>
              <span>{r.driver}</span>
              <span className="sa-route">{r.route}</span>
              <em className={`sa-status ${r.tone}`}>{r.status}</em>
            </div>
          ))}
        </div>
      </div>
      <span className="sc-float sa-float" data-float><Icon name="bell" size={11} /> KA-05 arrived 2 min early</span>
    </div>
  );
}

function Coaching() {
  const courses = [
    { name: 'Physics', next: 'Today, 5 pm · Rotational motion', pct: 72 },
    { name: 'Chemistry', next: 'Wed, 4 pm · Organic basics', pct: 54 },
    { name: 'Mathematics', next: 'Thu, 6 pm · Integration', pct: 86 },
  ];
  return (
    <div className="sc sc-edu">
      <div className="sc-nav">
        <b className="sc-logo"><i className="ed-mark" /> Brightpath</b>
        <span className="sc-links"><i>Courses</i><i>Batches</i><i>Results</i></span>
        <em className="sc-pill">Student login</em>
      </div>
      <div className="ed-wrap">
        <div className="ed-copy">
          <small>Hyderabad · Online &amp; classroom</small>
          <strong>Learn at your pace. Walk in prepared.</strong>
          <p>Live classes, recorded lessons, weekly tests and an app for parents.</p>
          <span className="ed-banner"><Icon name="calendar" size={11} /> New batch from 12 Nov · 18 seats left</span>
        </div>
        <div className="ed-student">
          <div className="ed-head">
            <span className="ed-avatar">AK</span>
            <div><b>Aarav’s dashboard</b><span>Class 12 · Science</span></div>
            <em className="ed-paid">Fees paid</em>
          </div>
          {courses.map((c) => (
            <div className="ed-course" key={c.name}>
              <div><b>{c.name}</b><span>{c.next}</span></div>
              <div className="ed-bar"><i style={{ width: `${c.pct}%` }} /></div>
              <em>{c.pct}%</em>
            </div>
          ))}
        </div>
      </div>
      <div className="ed-row">
        <span><Icon name="chat" size={11} /> Doubt chat</span>
        <span><Icon name="doc" size={11} /> Weekly tests</span>
        <span><Icon name="phone" size={11} /> Parent app</span>
        <span><Icon name="rupee" size={11} /> Fee reminders</span>
      </div>
      <span className="sc-float ed-float" data-float><Icon name="check" size={11} strokeWidth={2.6} /> Attendance marked · 9:02 am</span>
    </div>
  );
}

const concepts = [
  { name: 'Lumen Dental Studio', kind: 'Clinic website + online booking', url: 'lumendental.in', tags: ['Online booking', 'WhatsApp reminders', 'Local SEO'], Screen: Clinic },
  { name: 'Saffron Table', kind: 'Restaurant website + ordering', url: 'saffrontable.in', tags: ['Online orders', 'QR menu', 'Zero commission'], Screen: Restaurant },
  { name: 'Oak & Thread', kind: 'D2C online store', url: 'oakandthread.in', tags: ['UPI & cards', 'Inventory', 'GST invoices'], Screen: Store },
  { name: 'Fleetly', kind: 'SaaS dashboard', url: 'app.fleetly.in', tags: ['Logins & roles', 'Live tracking', 'Reports'], Screen: Saas },
  { name: 'Brightpath Academy', kind: 'Coaching portal', url: 'brightpath.in', tags: ['Courses', 'Fee payments', 'Parent app'], Screen: Coaching },
];

const total = String(concepts.length).padStart(2, '0');

const Showcase = () => {
  return (
    <section className="section work" id="work">
      <div className="container work-inner">
        <div className="work-head">
          <span className="eyebrow" data-reveal="left">Concepts</span>
          <h2 className="h-lg" data-split>
            What yours <em>could</em> look like.
          </h2>
          <p className="lead" data-reveal data-delay="0.15">
            Sample designs we made to show the range — a clinic, a kitchen, a store, a SaaS product and a coaching
            institute. Yours starts from your business, not from a template.
          </p>
          <div className="work-progress" aria-hidden="true">
            <span className="work-count"><b>01</b> / {total}</span>
            <span className="work-bar"><i /></span>
          </div>
          <p className="work-hint" aria-hidden="true">
            Swipe or scroll sideways <Icon name="arrow" size={14} />
          </p>
        </div>

        <div className="work-viewport">
          <div className="work-track">
            {concepts.map(({ Screen, ...c }, i) => (
              <article className="work-card" key={c.name}>
                <div className="work-shot" aria-hidden="true">
                  <Browser url={c.url}><Screen /></Browser>
                </div>
                <div className="work-meta">
                  <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{c.name}</h3>
                    <p>{c.kind}</p>
                  </div>
                  <ul className="work-tags">
                    {c.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </article>
            ))}
            <div className="work-end">
              <span className="work-end-mark"><Icon name="sparkle" size={22} /></span>
              <h3>Your business, <em>next.</em></h3>
              <p>Tell us what you do. We reply with a design direction and a written quote.</p>
              <ContactButton className="btn btn-primary" source="concepts" title="Let’s design yours.">
                Start my project <Icon name="arrow" />
              </ContactButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
