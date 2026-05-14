import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-content fade-in">
          <h2 className="section-title">
            <span className="text-gold">About</span> IEMV
          </h2>
          <div className="about-card">
            <p className="about-text">
              IEMV is more than just a memecoin.
            </p>
            <p className="about-text">
              It is a growing community focused on building a strong ecosystem driven by people, consistency, and long-term vision.
            </p>
            <p className="about-text">
              Our mission is to create a recognizable and respected movement inside the crypto space while empowering early supporters and building a global community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
