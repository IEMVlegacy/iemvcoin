import React from 'react';
import { Send } from 'lucide-react';
import './Community.css';

const Community = () => {
  return (
    <section id="community" className="section community-section">
      <div className="container">
        <div className="community-wrapper fade-in">
          <div className="community-glow"></div>
          <h2 className="section-title">
            <span className="text-gold">Join</span> The Movement
          </h2>
          <p className="community-text">
            The strength of IEMV comes from its community.
            <br />
            Join thousands of supporters building the future together.
          </p>
          <div className="community-buttons">
            <a href="https://t.me/+BKLnbvKldFdkOWYx" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Send size={20} />
              Telegram
            </a>
            <a href="https://x.com/IEMVlegacy" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              Twitter / X
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
