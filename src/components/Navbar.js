"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import Logo from './Logo';
import ContactButton from './contact/ContactButton';
import '../css/Navbar.css';

const links = [
  { href: '#build', label: 'How we build' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Concepts' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="announce">
        <span className="announce-dot" aria-hidden="true" />
        Now booking website & web app projects <span className="announce-sep">—</span>{' '}
        <b>free written quote in 24 hours</b>
      </div>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="container">
          <nav className="nav-inner" aria-label="Main">
            <Link href="/" className="nav-logo" aria-label="Only Dev — home" onClick={() => setOpen(false)}>
              <Logo id="nav-logo" />
            </Link>

            <div className="nav-links" id="nav-links">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <ContactButton className="btn btn-primary nav-cta" source="navbar">
                Get a free quote <Icon name="arrow" />
              </ContactButton>
              <button
                className="nav-toggle"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="nav-links"
                onClick={() => setOpen((o) => !o)}
              >
                <span />
                <span />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
