import React from 'react';
import { Target, Rocket, Globe, Crown } from 'lucide-react';
import './Roadmap.css';

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      icon: <Target size={32} />,
      items: [
        "Community creation",
        "Social media launch",
        "Branding",
        "Website launch"
      ]
    },
    {
      phase: "Phase 2",
      icon: <Rocket size={32} />,
      items: [
        "Marketing expansion",
        "Partnerships",
        "Influencer outreach",
        "Community growth"
      ]
    },
    {
      phase: "Phase 3",
      icon: <Globe size={32} />,
      items: [
        "Listings",
        "Ecosystem development",
        "Strategic expansion",
        "Global visibility"
      ]
    },
    {
      phase: "Phase 4",
      icon: <Crown size={32} />,
      items: [
        "Long-term utility",
        "Bigger partnerships",
        "Massive community scaling"
      ]
    }
  ];

  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="container">
        <h2 className="section-title fade-in">
          <span className="text-gold">Project</span> Roadmap
        </h2>
        
        <div className="roadmap-container fade-in delay-1">
          <div className="roadmap-line"></div>
          {phases.map((phase, index) => (
            <div key={index} className={`roadmap-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="roadmap-marker">
                {phase.icon}
              </div>
              <div className="roadmap-content">
                <h3 className="phase-title">{phase.phase}</h3>
                <ul className="phase-list">
                  {phase.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
