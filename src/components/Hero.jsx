import React from 'react';

import { Send } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section section">
      <div className="hero-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="particles"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-logo-container fade-in">
          <div className="animated-logo">
            <span className="logo-text">IEMV</span>
          </div>
        </div>
        
        <h1 className="hero-headline fade-in delay-1">
          Building <span className="text-gold">More</span> Than a Memecoin
        </h1>
        
        <p className="hero-subheadline fade-in delay-2">
          A community-driven movement focused on growth, vision, and long-term expansion in Web3.
        </p>
        
        <div className="hero-buttons fade-in delay-3">
          <a href="https://t.me/+BKLnbvKldFdkOWYx" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <Send size={20} />
            Join Telegram
          </a>
          <a href="https://x.com/IEMVlegacy" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            Twitter / X
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
