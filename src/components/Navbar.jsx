import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Início' },
  { path: '/crypto', label: 'Crypto Hub' },
  { path: '/guardians', label: 'Guardians' },
  { path: '/whitepaper', label: 'Whitepaper' },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">I</span>
          <div className="navbar-title">
            <strong>IEMV</strong>
            <small>Crypto & Comunidade</small>
          </div>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/crypto" className="btn btn-primary nav-cta">
            Central de Informação
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
