"use client";

import React, { useId, useState } from 'react';
import Icon from './Icon';

// Accordion built with buttons. Opening and closing is a click, so it uses a CSS transition instead of GSAP.
// Collapsed answers stay in the HTML, so search engines still read them.
export default function FaqList({ items }) {
  const [openItems, setOpenItems] = useState(() => new Set([0]));
  const idBase = useId();

  const toggle = (i) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="faq-list" data-stagger>
      {items.map((f, i) => {
        const open = openItems.has(i);
        const panelId = `${idBase}-faq-${i}`;
        return (
          <div key={f.q} className={`faq-item ${open ? 'is-open' : ''}`}>
            <button type="button" className="faq-q" aria-expanded={open} aria-controls={panelId} onClick={() => toggle(i)}>
              {f.q}
              <Icon name="plus" size={16} />
            </button>
            <div className="faq-panel" id={panelId}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
