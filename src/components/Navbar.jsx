import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/', key: 'nav.home', label: 'Home' },
  { path: '/crypto', key: 'nav.crypto', label: 'Crypto Hub' },
  { path: '/guardians', key: 'nav.guardians', label: 'Guardians' },
  { path: '/whitepaper', key: 'nav.whitepaper', label: 'Whitepaper' },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="IEMV Homepage">
          <img
            src="/og-image.png"
            alt="IEMV logo"
            className="navbar-logo-img"
            loading="lazy"
          />
          <div className="navbar-title">
            <strong>IEMV</strong>
            <small>Crypto & Community</small>
          </div>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
              data-i18n-key={link.key}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/crypto" className="btn btn-primary nav-cta" data-i18n-key="nav.cta">
            Information Center
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
