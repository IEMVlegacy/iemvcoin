import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Heart, Shield } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">IEMV</span>
          </div>
          
          <div className="footer-links">
            <a href="https://t.me/+BKLnbvKldFdkOWYx" target="_blank" rel="noopener noreferrer" className="footer-link">
              <Send size={18} />
              Telegram
            </a>
            <a href="https://x.com/IEMVlegacy" target="_blank" rel="noopener noreferrer" className="footer-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              Twitter/X
            </a>
            <Link to="/guardians" className="footer-link">
              <Shield size={18} />
              Guardians Program
            </Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} IEMV. All rights reserved.
          </p>
          <p className="community-first">
            Community First <Heart size={14} className="heart-icon" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
