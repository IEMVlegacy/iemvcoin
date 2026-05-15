import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import './TopAnnouncement.css';

const TopAnnouncement = () => {
  return (
    <div className="top-announcement">
      <div className="container announcement-content">
        <div className="announcement-badge">
          <Shield size={14} />
          <span>NEW</span>
        </div>
        <p className="announcement-text">
          <span className="highlight">IEMV Guardians Program</span> is live! Complete quests and earn exclusive rewards.
        </p>
        <Link to="/guardians" className="announcement-link">
          Join Now <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default TopAnnouncement;
