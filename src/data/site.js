// All editable business details and page copy live here.

export const site = {
  name: 'Only Dev',
  url: 'https://onlydev.in',
  email: 'reddydheeraj2109@gmail.com',
  // Digits only with country code, e.g. '919876543210'. Leave empty to fall back to email.
  whatsapp: '',
  phoneDisplay: '',
  city: 'India',
  tagline: 'Websites and web apps that win customers.',
};

export const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}` : '';

// Choices offered by the contact form; the API route only accepts these values.
export const contactOptions = {
  projects: ['Business website', 'Online store', 'Booking system', 'Web app / SaaS', 'Dashboard / CRM', 'Website redesign', 'Not sure yet'],
  budgets: ['Under ₹25k', '₹25k – ₹75k', '₹75k – ₹2L', '₹2L+', 'Not sure'],
  timelines: ['ASAP', 'Within a month', '1–3 months', 'Just exploring'],
};

/* ---------- Keyword strip ---------- */
export const keywordStrip = [
  'Custom website development',
  'Next.js & React web apps',
  'E-commerce websites',
  'SaaS MVP development',
  'Booking & appointment systems',
  'Admin dashboards & CRM',
  'SEO-ready, mobile-first design',
  'AI chatbot integration',
  'Progressive Web Apps (PWA)',
  'Razorpay, UPI & Stripe payments',
  'Website redesign',
  'Core Web Vitals optimised',
];

/* ---------- Interactive build planner ---------- */
export const industries = [
  { id: 'shop', label: 'Retail shop', noun: 'furniture shop', topic: 'furniture', sample: 'Sharma Furniture' },
  { id: 'clinic', label: 'Clinic', noun: 'dental clinic', topic: 'dentist', sample: 'SmileCare Dental' },
  { id: 'restaurant', label: 'Restaurant', noun: 'restaurant', topic: 'restaurant', sample: 'Spice Route Kitchen' },
  { id: 'coaching', label: 'Coaching institute', noun: 'coaching institute', topic: 'coaching classes', sample: 'Bright Minds Academy' },
  { id: 'realestate', label: 'Real estate', noun: 'real estate agency', topic: 'flats for sale', sample: 'Keystone Realty' },
  { id: 'startup', label: 'Startup', noun: 'software startup', topic: 'software', sample: 'Ledgerly' },
];

// Labels double as the contact form's project choices (contactOptions.projects).
export const projectTypes = [
  { id: 'website', label: 'Business website' },
  { id: 'store', label: 'Online store' },
  { id: 'booking', label: 'Booking system' },
  { id: 'webapp', label: 'Web app / SaaS' },
  { id: 'dashboard', label: 'Dashboard / CRM' },
];

// Text placeholders: {name} {city} {noun} {topic} {slug}
const learnStep = (hours, answer) => ({
  title: 'We learn your business',
  sub: 'A call, not a form. What only you can tell us.',
  hours,
  kind: 'chat',
  questions: [
    'Who are your best customers — and how do they find you today?',
    'What do they always ask before they buy?',
  ],
  answer,
  followUp: 'What makes people pick you over the competitor next door?',
});

const searchStep = {
  title: 'What your customers type into Google',
  sub: 'Most searches are the wrong ones. Picking the right few is the job.',
  hours: 4,
  kind: 'search',
  rows: [
    { q: '{noun} in {city}', note: 'Local and ready to buy. The homepage is written for this one.', keep: true },
    { q: '{topic} near me', note: 'Google answers with a map — your address and hours must be on the page.', keep: true },
    { q: '{topic} price', note: 'Too broad. National marketplaces own it; one page will not beat them.', keep: false },
    { q: 'best {noun} {city}', note: 'They are comparing. Reviews and proof on the page answer them.', keep: true },
    { q: '{topic} ideas', note: 'Browsing, not buying. Blog material, not a homepage.', keep: false },
    { q: '{name} {city}', note: 'People who already heard of you. You must be the first result.', keep: true },
  ],
  footnote: 'Sample research. On your project we check real search data for {city}.',
};

const domainStep = {
  title: 'A domain people can say on the phone',
  sub: 'Short, yours, and spelled the way it is said.',
  hours: 1.5,
  kind: 'list',
  icon: 'globe',
  items: ['{slug}.in — first choice', '{slug}.com — if available', 'Business email: hello@{slug}.in'],
};

const handover = (hours) => ({
  title: 'Handed over in your name',
  sub: 'You own it. You can take it anywhere.',
  hours,
  kind: 'list',
  icon: 'key',
  items: ['{slug}.in registered in your name', 'Source code and design files, handed over', 'Every login and admin password, yours'],
});

export const buildPlans = {
  website: [
    learnStep(1.5, '{name} — trusted in {city}, fair prices, quick replies on WhatsApp.'),
    searchStep,
    domainStep,
    { title: 'The page plan, and the words on it', sub: 'Every page answers a real search.', hours: 5, kind: 'list', icon: 'doc', items: ['Home — “{noun} in {city}”', 'Services & prices — what people ask before calling', 'Reviews, photos and proof', 'Contact — map, hours, WhatsApp, click-to-call'] },
    { title: 'Designed for {name}', sub: 'Your colours, your photos, your story. No template.', hours: 8, kind: 'design' },
    { title: 'Built, then checked on real phones', sub: 'Fast on a ₹10,000 Android on 4G — not just on our laptops.', hours: 7, kind: 'checks', items: ['Loads in under 2 seconds', 'Core Web Vitals in the green', 'Tested on Android, iPhone & desktop', 'Forms and WhatsApp buttons verified'] },
    { title: 'Set up so Google can read it', sub: 'The technical SEO most sites skip.', hours: 3, kind: 'checks', items: ['Titles, descriptions & schema markup', 'Sitemap submitted to Search Console', 'Google Business Profile linked', 'Analytics installed'] },
    handover(1),
  ],
  store: [
    learnStep(2, '{name} — 120 products, delivery across {city}, COD and UPI.'),
    searchStep,
    { title: 'Catalogue and checkout plan', sub: 'Categories, filters, and the fewest taps to pay.', hours: 4, kind: 'list', icon: 'doc', items: ['Category & product page structure', 'Variants — size, colour, price', 'Cart → address → pay in 3 steps', 'Coupons, shipping rules & GST invoices'] },
    { title: 'Designed for {name}', sub: 'A store that looks as good as what it sells.', hours: 10, kind: 'design' },
    { title: 'Store engine and payments', sub: 'Razorpay, UPI, cards and cash-on-delivery.', hours: 18, kind: 'checks', items: ['Product admin — add items from your phone', 'Razorpay / UPI / card checkout', 'Order emails & WhatsApp alerts', 'Stock tracking & order dashboard'] },
    { title: 'Tested with real orders', sub: 'Every payment path, on real phones.', hours: 6, kind: 'checks', items: ['Successful, failed & refunded payments', 'Mobile checkout speed', 'Invoice and email checks'] },
    { title: 'Ready for Google Shopping', sub: 'Product schema and feeds, set up properly.', hours: 4, kind: 'checks', items: ['Product schema markup', 'Merchant Center feed', 'Sitemap & Search Console'] },
    handover(2),
  ],
  booking: [
    learnStep(2, '{name} — 3 staff, 40 bookings a day, too many missed calls.'),
    { title: 'Mapping how bookings really happen', sub: 'From first tap to reminder message.', hours: 4, kind: 'list', icon: 'doc', items: ['Pick a service → pick a slot → confirm', 'Staff calendars & working hours', 'Deposits or pay-at-visit', 'Reschedule and cancel rules'] },
    { title: 'Designed for {name}', sub: 'Book in under 30 seconds, one-handed.', hours: 8, kind: 'design' },
    { title: 'Booking engine', sub: 'Live availability that never double-books.', hours: 20, kind: 'checks', items: ['Real-time slot availability', 'Online payments via Razorpay / UPI', 'WhatsApp & SMS reminders', 'Google Calendar sync'] },
    { title: 'Your admin dashboard', sub: 'Run the day from your phone.', hours: 8, kind: 'checks', items: ['Today’s bookings at a glance', 'Customer history & notes', 'Revenue and no-show reports'] },
    { title: 'Tested on real phones', sub: 'Every booking path, every edge case.', hours: 5, kind: 'checks', items: ['Double-booking protection', 'Payment failure handling', 'Reminder delivery checks'] },
    handover(2),
  ],
  webapp: [
    learnStep(6, '{name} — teams waste hours in spreadsheets. We want one place to do it.'),
    { title: 'Users, flows and the data model', sub: 'What each user needs to get done, in what order.', hours: 10, kind: 'list', icon: 'doc', items: ['User roles — admin, team, customer', 'Core workflow, step by step', 'Database schema & API plan', 'MVP scope vs. later releases'] },
    { title: 'Wireframes and clickable prototype', sub: 'You click through it before a line of code.', hours: 12, kind: 'design' },
    { title: 'Product UI design', sub: 'A design system, not just screens.', hours: 16, kind: 'checks', items: ['Components & design tokens', 'Responsive layouts for every screen', 'Empty, loading & error states'] },
    { title: 'Full-stack build', sub: 'Next.js, Node.js and PostgreSQL — the stack serious products run on.', hours: 80, kind: 'checks', items: ['Secure login & role-based access', 'Core features & REST/GraphQL API', 'Subscriptions & billing (Razorpay / Stripe)', 'AI features where they earn their place'] },
    { title: 'Admin panel, QA and security', sub: 'Tested like it is going to be attacked.', hours: 28, kind: 'checks', items: ['Admin & analytics dashboard', 'Automated tests & code review', 'OWASP security checks, backups'] },
    { title: 'Deployed and handed over', sub: 'Cloud hosting, CI/CD, and your keys.', hours: 6, kind: 'list', icon: 'key', items: ['Deployed on AWS / Vercel with CI/CD', 'Source code in your GitHub', 'Every login and API key, yours'] },
  ],
  dashboard: [
    learnStep(4, '{name} — data lives in Excel, WhatsApp and three apps. Nobody sees the full picture.'),
    { title: 'Data sources and the numbers that matter', sub: 'Which decisions this dashboard should make easier.', hours: 8, kind: 'list', icon: 'doc', items: ['Leads, sales, stock & staff data', 'KPIs for owners vs. team', 'Imports from Excel / Google Sheets', 'Integrations — Tally, Zoho, WhatsApp'] },
    { title: 'Designed for {name}', sub: 'Clarity first. Every chart answers a question.', hours: 12, kind: 'design' },
    { title: 'CRM & dashboard build', sub: 'One login. Everything in one place.', hours: 60, kind: 'checks', items: ['Lead pipeline & follow-ups', 'Role-based access for staff', 'Live charts & exportable reports', 'Automations & WhatsApp alerts'] },
    { title: 'Integrations', sub: 'Talks to the tools you already use.', hours: 12, kind: 'checks', items: ['Google Sheets & Excel import', 'Payment gateway sync', 'Email & WhatsApp Business API'] },
    { title: 'QA and data migration', sub: 'Your old data, moved over cleanly.', hours: 8, kind: 'checks', items: ['Data import & clean-up', 'Permission & security tests'] },
    { title: 'Deployed and handed over', sub: 'Cloud hosting, CI/CD, and your keys.', hours: 4, kind: 'list', icon: 'key', items: ['Hosted on secure cloud', 'Source code in your GitHub', 'Team training session'] },
  ],
};

/* ---------- What we build ---------- */
export const offerings = [
  {
    id: 'websites',
    eyebrow: 'Websites',
    title: 'Websites that turn searches into enquiries.',
    text: 'Custom-designed, mobile-first business websites, landing pages and online stores — built to rank on Google and get people to call, book or buy.',
    items: [
      'Business & corporate websites',
      'Landing pages for Google & Meta ads',
      'E-commerce stores with Razorpay / UPI',
      'Portfolio, real-estate & listing sites',
      'Blog & CMS-powered websites',
      'Website redesign & speed optimisation',
    ],
  },
  {
    id: 'webapps',
    eyebrow: 'Web applications',
    title: 'Web apps that run the business behind it.',
    text: 'Custom software in the browser — SaaS products, customer portals, CRMs and dashboards. Secure, scalable and built for the way your team actually works.',
    items: [
      'SaaS MVPs for startups',
      'Booking & appointment systems',
      'Custom CRM, ERP & admin dashboards',
      'Customer & vendor portals',
      'Progressive Web Apps (PWA)',
      'AI chatbots & automation built in',
    ],
  },
];

/* ---------- Comparison ---------- */
export const withoutSite = [
  'People search your name and find nothing — or an old listing with a wrong number.',
  'Your only presence is a social page you do not own, shown to whoever the feed decides.',
  'Work runs on spreadsheets, notebooks and WhatsApp threads nobody can search.',
  'Bigger competitors look more established, so buyers assume they are the safer choice.',
  'Every booking, order and follow-up needs a phone call from you.',
];
export const withSite = [
  'You own the first result: your work, your services and a number that reaches you.',
  'A home of your own that keeps working after the post stops being shown.',
  'One web app where orders, leads and customers live — searchable, shareable, safe.',
  'You look like the established one, because your website says so before you speak.',
  'Customers book, pay and get updates on their own — at 2 am if they want.',
];

/* ---------- Industries ---------- */
export const industryUseCases = [
  { title: 'Clinics & healthcare', items: ['Doctor & dental websites', 'Online appointment booking', 'Patient records portal'] },
  { title: 'Restaurants & cafés', items: ['Menu websites with QR', 'Online ordering — no commission', 'Table reservations'] },
  { title: 'Retail & D2C brands', items: ['E-commerce stores', 'Product catalogues', 'Inventory dashboards'] },
  { title: 'Education & coaching', items: ['Institute websites', 'LMS & online courses', 'Fee & attendance apps'] },
  { title: 'Real estate & builders', items: ['Property listing portals', 'Project microsites', 'Lead CRM for agents'] },
  { title: 'Startups & SaaS', items: ['MVP development', 'SaaS dashboards', 'Investor-ready landing pages'] },
  { title: 'Salons, gyms & studios', items: ['Booking websites', 'Membership management', 'WhatsApp reminders'] },
  { title: 'Manufacturers & B2B', items: ['B2B product catalogues', 'Dealer & vendor portals', 'Quote request systems'] },
  { title: 'Services & consultants', items: ['Lawyer & CA websites', 'Client portals', 'Document & invoice apps'] },
];

/* ---------- Included in every project ---------- */
export const included = [
  { icon: 'shield', title: 'You own everything', text: 'Code, design files, domain and every login — handed over in your name.' },
  { icon: 'phone', title: 'Mobile-first', text: 'Designed for thumbs first. Most of your visitors are on a phone.' },
  { icon: 'search', title: 'SEO-ready from day one', text: 'Clean structure, schema markup, sitemap and Search Console set up.' },
  { icon: 'bolt', title: 'Built to load fast', text: 'Optimised images and modern code that pass Core Web Vitals.' },
  { icon: 'lock', title: 'Secure by default', text: 'SSL, secure login, backups and protection against common attacks.' },
  { icon: 'calendar', title: 'A clear delivery date', text: 'A written timeline and a live preview link you can check as we build.' },
];

/* ---------- Process ---------- */
export const steps = [
  { title: 'Tell us your idea', text: 'A message in English or Hindi is enough to begin. No brief needed.' },
  { title: 'Get a written quote', text: 'Scope, price and delivery date — fixed and agreed before we start.' },
  { title: 'See it take shape', text: 'Review designs and a live preview link at every stage.' },
  { title: 'Go live. It’s yours.', text: 'Launch, training, and support after — with full ownership.' },
];

/* ---------- FAQ ---------- */
export const faqs = [
  { q: 'What is the difference between a website and a web application?', a: 'A website mainly shows information — your services, prices and contact details — and brings in enquiries. A web application lets people do things: log in, book, pay, manage orders or track data. Many businesses start with a website and add web-app features like booking or a customer portal later.' },
  { q: 'How long does it take to build a website or web app?', a: 'A one-page site is usually live in 5–7 days, a business website in 2–3 weeks, and an online store in 4–6 weeks. An MVP web app typically takes 4–6 weeks; larger custom web apps are planned in phases with dates in your written quote.' },
  { q: 'Will my website show up on Google?', a: 'Every site is built SEO-ready: keyword research, proper titles and descriptions, schema markup, sitemap, Google Search Console and Google Business Profile linking. Ranking also depends on competition and reviews, so we will not promise a #1 position — but we make sure Google can read and understand every page.' },
  { q: 'Do you build SaaS products and MVPs for startups?', a: 'Yes. We build MVPs and SaaS platforms with Next.js, React, Node.js and PostgreSQL — including login, subscriptions, admin dashboards and AI features. We start with a clickable prototype so you can test the idea before full development.' },
  { q: 'Can you add AI features or a chatbot to my website?', a: 'Yes. We integrate AI chatbots that answer customer questions from your own content, smart search, lead qualification and workflow automation — only where it genuinely saves time or wins customers.' },
  { q: 'Who owns the website and the code?', a: 'You do. The domain is registered in your name and you receive the source code, design files and every login. You are free to move to another developer at any time.' },
  { q: 'Can I update the website myself?', a: 'Yes. CMS websites and all web apps come with an admin panel to edit text, images, products and blog posts from your phone or laptop — no coding needed.' },
  { q: 'Do you integrate payment gateways like Razorpay, UPI and Stripe?', a: 'Yes — Razorpay, UPI, cards, net banking, cash-on-delivery and Stripe for international payments, plus automatic GST invoices and order notifications.' },
  { q: 'Do you redesign existing websites?', a: 'Yes. We rebuild slow or outdated websites on a modern stack, keep your existing Google rankings with proper redirects, and usually make them several times faster.' },
  { q: 'What happens after launch?', a: 'You can choose a monthly care plan for hosting, security updates, backups and small edits. New features or pages are quoted separately in writing.' },
];

/* ---------- Tech stack ---------- */
export const techStack = {
  'Frontend': ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  'Backend & data': ['Node.js', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis'],
  'Cloud & delivery': ['AWS', 'Vercel', 'Cloudflare', 'Docker'],
  'Integrations': ['Razorpay', 'Stripe', 'WhatsApp Business API', 'Google Analytics', 'Search Console', 'OpenAI & Claude APIs'],
};
