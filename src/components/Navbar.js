"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import '../css/Navbar.css';

const links = [
  { href: '#build', label: 'How we build' },
  { href: '#services', label: 'Websites & Apps' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="announce">
        {/* <span className="announce-dot" /> */}
        Now booking website & web app projects — free written quote in 24 hours
      </div>
      <nav className="container nav-inner" aria-label="Main">
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
          <Image src="/images/logos/IMG_3904.jpeg" alt="" width={34} height={34} priority />
          <span>
            Only <span className="nav-logo-accent">Dev</span>
          </span>
        </Link>

        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <ContactButton className="btn btn-dark nav-cta" source="navbar">
            Get a free quote <Icon name="arrow" />
          </ContactButton>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
