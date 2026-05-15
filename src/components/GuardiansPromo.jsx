import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Trophy, Gift, Users, Rocket, Info, Calendar, PieChart, CheckCircle, Lock } from 'lucide-react';
import './GuardiansPromo.css';

const GuardiansPromo = () => {
  return (
    <section className="guardians-promo-section section">
      <div className="container">
        <div className="promo-card">
          <div className="promo-overlay"></div>
          
          <div className="promo-content-wrapper">
            <div className="promo-header">
              <Shield size={48} className="promo-main-icon text-gold" />
              <div className="promo-title-group">
                <h2 className="promo-title">IEMV <span>GUARDIANS</span></h2>
                <h3 className="promo-subtitle">PROGRAM</h3>
              </div>
            </div>
            
            <p className="promo-description">
              Join the movement. Complete quests. <br/>
              <span className="text-gold">Earn rewards. Shape the future.</span>
            </p>
            
            <div className="promo-features-grid">
              <div className="promo-feature-item">
                <div className="feature-icon-wrapper"><Shield size={24} /></div>
                <h4>COMPLETE QUESTS</h4>
                <p>Engage in tasks and missions that strengthen the IEMV ecosystem.</p>
              </div>
              <div className="promo-feature-item">
                <div className="feature-icon-wrapper"><Trophy size={24} /></div>
                <h4>CLIMB LEADERBOARD</h4>
                <p>Compete with other Guardians and rise through the ranks.</p>
              </div>
              <div className="promo-feature-item">
                <div className="feature-icon-wrapper"><Gift size={24} /></div>
                <h4>EARN REWARDS</h4>
                <p>The most active Guardians will receive exclusive allocations.</p>
              </div>
              <div className="promo-feature-item">
                <div className="feature-icon-wrapper"><Users size={24} /></div>
                <h4>STRONG COMMUNITY</h4>
                <p>Connect, grow and build real relationships.</p>
              </div>
            </div>
            
            <div className="promo-info-footer">
              <div className="info-title">
                <Info size={18} className="text-gold" />
                <span>IMPORTANT INFORMATION</span>
              </div>
              <div className="info-items">
                <div className="info-item">
                  <Calendar size={16} className="text-gold" />
                  <span>Limited Duration Campaign</span>
                </div>
                <div className="info-item">
                  <PieChart size={16} className="text-gold" />
                  <span>Fair Rewards Distribution</span>
                </div>
                <div className="info-item">
                  <CheckCircle size={16} className="text-gold" />
                  <span>Verified Participants Only</span>
                </div>
                <div className="info-item">
                  <Lock size={16} className="text-gold" />
                  <span>Quality over Quantity</span>
                </div>
              </div>
            </div>

            <div className="promo-cta-container">
              <Link to="/guardians" className="btn btn-primary btn-large promo-btn">
                <Rocket size={20} />
                Access Guardians Program
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardiansPromo;
