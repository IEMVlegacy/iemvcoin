import React from 'react';
import { Database, Flame, Lock, Users, TrendingUp } from 'lucide-react';
import './Tokenomics.css';

const Tokenomics = () => {
  const tokenData = [
    { label: "Total Supply", value: "1,000,000,000", icon: <Database size={24} /> },
    { label: "Liquidity", value: "Locked", icon: <Lock size={24} /> },
    { label: "Community Driven", value: "Yes", icon: <Users size={24} /> },
    { label: "Taxes", value: "0%", icon: <Flame size={24} /> }
  ];

  return (
    <section id="tokenomics" className="section tokenomics-section">
      <div className="container">
        <h2 className="section-title fade-in">
          <span className="text-gold">Token</span>omics
        </h2>
        
        <div className="tokenomics-grid fade-in delay-1">
          {tokenData.map((item, index) => (
            <div key={index} className="tokenomics-card">
              <div className="token-icon">{item.icon}</div>
              <h3 className="token-label">{item.label}</h3>
              <p className="token-value">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
