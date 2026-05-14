import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import './Whitepaper.css';

const Whitepaper = () => {
  return (
    <section id="whitepaper" className="section whitepaper-section">
      <div className="container">
        <div className="whitepaper-content fade-in">
          <h2 className="section-title">
            Read Our <span className="text-gold">Vision</span>
          </h2>
          <p className="whitepaper-text">
            Explore the official IEMV whitepaper and understand the mission, structure, and future plans of the project.
          </p>
          <Link to="/whitepaper" className="btn btn-primary mt-4">
            <BookOpen size={20} />
            Read Full Whitepaper
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Whitepaper;
