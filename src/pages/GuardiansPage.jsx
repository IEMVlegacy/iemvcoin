import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, ArrowLeft, ExternalLink, Shield, Trophy, FileText, CheckCircle } from 'lucide-react';
import './GuardiansPage.css';
import Footer from '../components/Footer';

const GuardiansPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="guardians-page">
      <div className="guardians-bg-glow"></div>

      <div className="g-nav-top">
        <Link to="/" className="g-back-link">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      <div className="guardians-content">
        {/* SECTION 1 — HERO SECTION */}
        <section className="g-hero g-container">
          <div className="g-hero-content fade-in">
            <h2 className="g-hero-subtitle">IEMV Guardians Program</h2>
            <h1 className="g-hero-title">Earn your place before the launch.</h1>
            <p className="g-hero-desc">
              The IEMV Guardians Program is the official community campaign designed to reward the earliest supporters of the IEMV ecosystem.<br /><br />
              Complete missions, support the community, create content and climb through the ranks as IEMV evolves into a powerful community-driven ecosystem.<br /><br />
              The earliest Guardians will help shape the future of IEMV.
            </p>
            <div className="g-buttons">
              <a href="https://t.me/+BKLnbvKldFdkOWYx" target="_blank" rel="noopener noreferrer" className="g-btn g-btn-primary">
                <Send size={18} /> Join Telegram
              </a>
              <a href="https://x.com/IEMVlegacy" target="_blank" rel="noopener noreferrer" className="g-btn g-btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg> Follow on X
              </a>
              <a href="#missions" className="g-btn g-btn-outline">
                <Shield size={18} /> Start Missions
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2 — ABOUT THE PROGRAM */}
        <section className="g-section g-container">
          <h2 className="g-section-title">What is the Guardians Program?</h2>
          <div className="g-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p className="g-step-desc" style={{ fontSize: '1.1rem' }}>
              The Guardians Program is a long-term community initiative created to reward participation, engagement and ecosystem support.<br /><br />
              This is more than a simple airdrop campaign.<br /><br />
              It is a competitive community experience where participants complete quests, create content, invite new members and help strengthen the IEMV ecosystem.<br /><br />
              Every contribution matters.<br /><br />
              As the ecosystem grows, the most active and valuable Guardians may receive exclusive future benefits inside the IEMV ecosystem.
            </p>
          </div>
        </section>

        {/* SECTION 3 — HOW IT WORKS */}
        <section className="g-section g-container">
          <h2 className="g-section-title">How It Works</h2>
          <div className="g-steps-grid">
            <div className="g-card">
              <div className="g-step-number">01</div>
              <h3 className="g-step-title">Join the Community</h3>
              <p className="g-step-desc">Become part of the official IEMV Telegram and X community.</p>
            </div>
            <div className="g-card">
              <div className="g-step-number">02</div>
              <h3 className="g-step-title">Complete Missions</h3>
              <p className="g-step-desc">Participate in social quests, community events and ecosystem activities.</p>
            </div>
            <div className="g-card">
              <div className="g-step-number">03</div>
              <h3 className="g-step-title">Earn Recognition</h3>
              <p className="g-step-desc">The most active Guardians gain visibility, reputation and future ecosystem opportunities.</p>
            </div>
            <div className="g-card">
              <div className="g-step-number">04</div>
              <h3 className="g-step-title">Grow With IEMV</h3>
              <p className="g-step-desc">As the project evolves, early supporters will become part of the ecosystem foundation.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — MISSIONS */}
        <section id="missions" className="g-section g-container">
          <h2 className="g-section-title">Available Missions</h2>
          <p className="g-section-desc">
            New missions and special events may be added during future ecosystem phases.<br />
            High-quality contributions will always receive more value than spam activity.
          </p>
          <div className="g-table-wrapper">
            <table className="g-table">
              <thead>
                <tr>
                  <th>Mission</th>
                  <th style={{ textAlign: 'right' }}>Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Follow IEMV on X</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">+10 XP</span></td></tr>
                <tr><td>Join Telegram Community</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">+10 XP</span></td></tr>
                <tr><td>Like & Repost Official Posts</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">+15 XP</span></td></tr>
                <tr><td>Invite New Guardians</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">+25 XP</span></td></tr>
                <tr><td>Create IEMV Memes</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">+50 XP</span></td></tr>
                <tr><td>Participate in Community Discussions</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">+10 XP</span></td></tr>
                <tr><td>Create Videos About IEMV</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">+100 XP</span></td></tr>
                <tr><td>Stay Active Weekly</td><td style={{ textAlign: 'right' }}><span className="g-xp-badge">Bonus XP</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5 — RANK SYSTEM */}
        <section className="g-section g-container">
          <h2 className="g-section-title">Guardian Ranks</h2>
          <p className="g-section-desc">
            The ranking system rewards consistency, engagement and contribution quality.<br />
            The higher your rank, the stronger your presence inside the ecosystem.
          </p>
          <div className="g-table-wrapper">
            <table className="g-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th style={{ textAlign: 'right' }}>XP Required</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Recruit</strong></td><td style={{ textAlign: 'right' }}>0 XP</td></tr>
                <tr><td><strong>Guardian</strong></td><td style={{ textAlign: 'right' }}>100 XP</td></tr>
                <tr><td><strong>Elite Guardian</strong></td><td style={{ textAlign: 'right' }}>300 XP</td></tr>
                <tr><td><strong>Commander</strong></td><td style={{ textAlign: 'right' }}>700 XP</td></tr>
                <tr><td><strong style={{ color: '#d4af37' }}>Genesis Guardian</strong></td><td style={{ textAlign: 'right' }}>1500 XP</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6 — LEADERBOARD */}
        <section className="g-section g-container">
          <h2 className="g-section-title">Top Guardians</h2>
          <p className="g-section-desc">
            The leaderboard highlights the most active members of the IEMV community.<br />
            Guardians who consistently contribute to ecosystem growth may receive future recognition and exclusive opportunities.
          </p>
          <div className="g-leaderboard-image-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <img
              src="public/ranking.png"
              alt="IEMV Guardians Ranking"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>

        {/* SECTION 7 — SUBMIT MISSIONS */}
        <section className="g-section g-container">
          <h2 className="g-section-title">Submit Your Participation</h2>
          <div className="g-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <FileText size={40} color="#d4af37" style={{ marginBottom: '20px' }} />
            <p className="g-step-desc" style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
              Complete your missions and submit your proof through the official form.<br />
              All submissions are reviewed to ensure fair participation and community quality.
            </p>
            <div style={{ textAlign: 'left', display: 'inline-block', marginBottom: '30px' }}>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>Required Information:</h4>
              <ul style={{ color: '#a0a0a0', lineHeight: '1.8' }}>
                <li>Wallet Address</li>
                <li>Telegram & X Usernames</li>
                <li>Mission Links / Meme Upload / Video Upload</li>
              </ul>
            </div>
            <br />
            <a href="https://tally.so/r/Y5JPEq" target="_blank" rel="noopener noreferrer" className="g-btn g-btn-primary">
              <ExternalLink size={18} /> Open Submission Form
            </a>
          </div>
        </section>

        {/* SECTION 8 — RULES */}
        <section className="g-section g-container">
          <h2 className="g-section-title">Campaign Rules</h2>
          <ul className="g-rules-list">
            <li>No bots or fake accounts</li>
            <li>No spam submissions</li>
            <li>Multiple accounts may result in disqualification</li>
            <li>Low-quality or fake engagement may be rejected</li>
            <li>Community respect is mandatory</li>
            <li>The team reserves the right to remove suspicious participants</li>
            <li>Rewards depend on participation quality and campaign evolution</li>
          </ul>
          <p className="g-section-desc" style={{ marginTop: '30px', fontStyle: 'italic', color: '#d4af37' }}>
            The goal of the Guardians Program is to build a strong, authentic and long-term ecosystem community.
          </p>
        </section>

        {/* SECTION 9 — FUTURE REWARDS */}
        <section className="g-section g-container">
          <h2 className="g-section-title">Future Ecosystem Rewards</h2>
          <p className="g-section-desc">As the IEMV ecosystem evolves, active Guardians may receive:</p>

          <div className="g-rewards-grid">
            <div className="g-reward-item">Future token allocations</div>
            <div className="g-reward-item">Early ecosystem access</div>
            <div className="g-reward-item">Special community roles</div>
            <div className="g-reward-item">Exclusive campaigns</div>
            <div className="g-reward-item">Governance opportunities</div>
            <div className="g-reward-item">Recognition inside the ecosystem</div>
            <div className="g-reward-item">Whitelist opportunities</div>
            <div className="g-reward-item">Community rewards</div>
          </div>

          <p className="g-section-desc" style={{ fontSize: '0.9rem' }}>
            *Final distribution models may vary depending on ecosystem development and campaign participation.
          </p>
        </section>

        {/* SECTION 10 — WHY JOIN EARLY? */}
        <section className="g-section g-container">
          <h2 className="g-section-title">Why Become an Early Guardian?</h2>
          <div className="g-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="g-step-desc" style={{ fontSize: '1.1rem', marginBottom: '20px', textAlign: 'center' }}>
              The strongest communities are built by the earliest believers.<br />Joining early means:
            </p>
            <ul style={{ color: '#e0e0e0', lineHeight: '2', paddingLeft: '40px', marginBottom: '30px' }}>
              <li>Building reputation before launch</li>
              <li>Becoming part of the ecosystem foundation</li>
              <li>Helping shape the future of IEMV</li>
              <li>Participating in the growth of a long-term community-driven movement</li>
            </ul>
            <p style={{ textAlign: 'center', color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>
              The future is built by those who arrive first.
            </p>
          </div>
        </section>

        {/* SECTION 11 — FAQ */}
        <section className="g-section g-container">
          <h2 className="g-section-title">FAQ</h2>
          <div className="g-faq-list">
            <div className="g-faq-item">
              <div className="g-faq-q">Is the Guardians Program free?</div>
              <div className="g-faq-a">Yes. Participation is completely free.</div>
            </div>
            <div className="g-faq-item">
              <div className="g-faq-q">Do I need to hold tokens?</div>
              <div className="g-faq-a">No. The program is currently focused on community participation.</div>
            </div>
            <div className="g-faq-item">
              <div className="g-faq-q">How are rewards distributed?</div>
              <div className="g-faq-a">Future rewards may depend on activity, participation quality and community contribution.</div>
            </div>
            <div className="g-faq-item">
              <div className="g-faq-q">Are bots allowed?</div>
              <div className="g-faq-a">No. Fake activity and spam may lead to disqualification.</div>
            </div>
            <div className="g-faq-item">
              <div className="g-faq-q">Will new missions be added?</div>
              <div className="g-faq-a">Yes. The ecosystem will continue evolving with new campaigns and activities.</div>
            </div>
          </div>
        </section>

        {/* SECTION 12 — FINAL CTA */}
        <section className="g-section g-container" style={{ borderBottom: 'none', textAlign: 'center', paddingBottom: '40px' }}>
          <h2 className="g-section-title" style={{ fontSize: '2rem' }}>Become a Guardian Before the Next Phase Begins</h2>
          <p className="g-section-desc">
            The IEMV ecosystem is only getting started.<br />
            Join the community, complete missions and secure your place among the earliest Guardians.
          </p>
          <div className="g-buttons">
            <a href="https://t.me/+BKLnbvKldFdkOWYx" target="_blank" rel="noopener noreferrer" className="g-btn g-btn-primary">
              <Send size={18} /> Join Telegram
            </a>
            <a href="https://x.com/IEMVlegacy" target="_blank" rel="noopener noreferrer" className="g-btn g-btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg> Follow on X
            </a>
            <a href="#missions" className="g-btn g-btn-primary">
              Enter the Program
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default GuardiansPage;
