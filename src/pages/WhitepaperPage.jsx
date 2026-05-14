import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './WhitepaperPage.css';

const WhitepaperPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wp-page-container">
      <div className="wp-header-nav">
        <div className="container">
          <Link to="/" className="wp-back-btn">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="wp-content-wrapper fade-in">
          <div className="wp-title-section">
            <h1 className="wp-main-title">
              <span className="text-gold">IEMV</span> — Official White Paper
            </h1>
            <div className="wp-subtitle-row">
              <span className="wp-version">Version 2.0 Premium Edition</span>
              <span className="wp-date">Publication Date: May 11, 2026</span>
            </div>
          </div>

          <div className="wp-card disclaimer-card">
            <h3 className="wp-card-title">Disclaimer</h3>
            <p>This document is for informational purposes only and does not constitute financial advice, investment solicitation, or a guarantee of profits.</p>
            <p>Cryptocurrency investments involve significant risks and market volatility. Always conduct your own research before participating.</p>
          </div>

          <div className="wp-section">
            <h2>1. Introduction</h2>
            <p>IEMV was created with one clear vision: <strong>To build a powerful global meme-driven ecosystem fueled by community, culture, engagement, and digital expansion.</strong></p>
            <p>In the modern crypto market, attention has become one of the most valuable assets in the world. Memecoins are no longer just internet jokes — they are communities, movements, brands, and digital economies capable of reaching millions of people worldwide.</p>
            <p>IEMV was designed to embrace this new era. Our mission is to combine:</p>
            <ul>
              <li>Viral digital culture;</li>
              <li>Strong branding;</li>
              <li>Community power;</li>
              <li>Strategic marketing;</li>
              <li>Long-term ecosystem growth.</li>
            </ul>
            <p>IEMV is not simply another token.<br/>It is a community-driven movement built for the future of internet culture.</p>
          </div>

          <div className="wp-section">
            <h2>2. Vision</h2>
            <p>Our vision is to establish IEMV as one of the most recognizable and influential meme communities in the cryptocurrency industry.</p>
            <p>We believe the strongest projects are not built solely by developers or investors. They are built by communities.</p>
            <p>The goal of IEMV is to create:</p>
            <ul>
              <li>A globally recognized brand;</li>
              <li>A highly engaged community;</li>
              <li>Sustainable long-term growth;</li>
              <li>Viral digital presence;</li>
              <li>Future utility integrations;</li>
              <li>Continuous ecosystem expansion.</li>
            </ul>
            <p>We aim to transform attention into adoption and community into value.</p>
          </div>

          <div className="wp-section">
            <h2>3. Mission</h2>
            <p>The mission of IEMV is to unite people through digital culture, innovation, entertainment, and decentralized community participation.</p>
            <p>We are focused on:</p>
            <ul>
              <li>Transparency;</li>
              <li>Organic growth;</li>
              <li>Community engagement;</li>
              <li>Strategic expansion;</li>
              <li>Long-term development.</li>
            </ul>
            <p>Every stage of the project is designed to strengthen the ecosystem and empower the community.</p>
          </div>

          <div className="wp-section">
            <h2>4. The Market Problem</h2>
            <p>The memecoin market continues to grow rapidly. However, many projects fail because of:</p>
            <ul>
              <li>Weak communities;</li>
              <li>Lack of transparency;</li>
              <li>Poor branding;</li>
              <li>No long-term vision;</li>
              <li>Abandoned development;</li>
              <li>Unsustainable hype cycles.</li>
            </ul>
            <p>Many tokens rely exclusively on temporary hype without creating a strong ecosystem or loyal community foundation. This creates instability and short project lifespans.</p>
          </div>

          <div className="wp-section">
            <h2>5. The IEMV Solution</h2>
            <p>IEMV was created to build a stronger foundation from day one. Our strategy focuses on combining:</p>
            
            <h3>5.1 Community First</h3>
            <p>The community is the core engine of IEMV. We believe real growth comes from loyal supporters who actively participate in the ecosystem. Community initiatives include:</p>
            <ul>
              <li>Viral campaigns;</li>
              <li>Giveaways;</li>
              <li>Online events;</li>
              <li>Community spaces on X;</li>
              <li>Strategic collaborations;</li>
              <li>International expansion;</li>
              <li>Reward systems;</li>
              <li>Future governance possibilities.</li>
            </ul>

            <h3>5.2 Viral Marketing Strategy</h3>
            <p>Modern crypto success depends heavily on visibility and attention. IEMV will focus on:</p>
            <ul>
              <li>High-impact content;</li>
              <li>Viral memes;</li>
              <li>Promotional videos;</li>
              <li>Social media growth;</li>
              <li>Influencer collaborations;</li>
              <li>Sponsored campaigns;</li>
              <li>Trend-based marketing;</li>
              <li>Community-driven promotion.</li>
            </ul>
            <p>The objective is to continuously expand brand awareness across multiple platforms.</p>

            <h3>5.3 Long-Term Ecosystem Development</h3>
            <p>The IEMV ecosystem is designed with future scalability in mind. Potential future developments may include:</p>
            <ul>
              <li>NFT integrations;</li>
              <li>Staking systems;</li>
              <li>Community reward programs;</li>
              <li>Marketplace utilities;</li>
              <li>Exclusive digital products;</li>
              <li>Community tools;</li>
              <li>Strategic partnerships;</li>
              <li>Gamification features.</li>
            </ul>
            <p>Future developments will be implemented progressively according to ecosystem growth.</p>
          </div>

          <div className="wp-section">
            <h2>6. Tokenomics</h2>
            <div className="tokenomics-table">
              <div className="t-row"><span className="t-label">Token Name</span><span className="t-val">IEMV</span></div>
              <div className="t-row"><span className="t-label">Symbol</span><span className="t-val">$IEMV</span></div>
              <div className="t-row"><span className="t-label">Token Type</span><span className="t-val">Community Memecoin</span></div>
              <div className="t-row"><span className="t-label">Blockchain</span><span className="t-val">To Be Announced</span></div>
              <div className="t-row"><span className="t-label">Total Supply</span><span className="t-val text-gold">1,000,000,000 $IEMV</span></div>
            </div>

            <h3 className="mt-8">Token Allocation</h3>
            <div className="allocation-list">
              <div className="alloc-item">
                <div className="alloc-percent">40%</div>
                <div className="alloc-desc">
                  <strong>Liquidity:</strong> Reserved to maintain healthy trading conditions and ecosystem stability.
                </div>
              </div>
              <div className="alloc-item">
                <div className="alloc-percent">25%</div>
                <div className="alloc-desc">
                  <strong>Marketing & Expansion:</strong> Dedicated to viral campaigns, partnerships, advertising, and global community growth.
                </div>
              </div>
              <div className="alloc-item">
                <div className="alloc-percent">15%</div>
                <div className="alloc-desc">
                  <strong>Development:</strong> Allocated for future ecosystem development, infrastructure, and utilities.
                </div>
              </div>
              <div className="alloc-item">
                <div className="alloc-percent">10%</div>
                <div className="alloc-desc">
                  <strong>Community Rewards:</strong> Reserved for giveaways, community incentives, events, and ecosystem participation.
                </div>
              </div>
              <div className="alloc-item">
                <div className="alloc-percent">5%</div>
                <div className="alloc-desc">
                  <strong>Strategic Partnerships:</strong> Used for collaborations, influencers, ambassadors, and ecosystem integrations.
                </div>
              </div>
              <div className="alloc-item">
                <div className="alloc-percent">5%</div>
                <div className="alloc-desc">
                  <strong>Project Reserve:</strong> Reserved for future strategic opportunities and operational sustainability.
                </div>
              </div>
            </div>

            <h3 className="mt-8">Liquidity Security</h3>
            <p>Liquidity may be locked to strengthen trust, transparency, and long-term commitment to the project. Additional security measures may also be implemented as the ecosystem evolves.</p>
          </div>

          <div className="wp-section">
            <h2>7. Roadmap</h2>
            <div className="wp-roadmap-grid">
              <div className="wp-rm-card">
                <h4>Phase 1 — Foundation</h4>
                <ul>
                  <li>Brand identity creation;</li>
                  <li>Community building;</li>
                  <li>Social media expansion;</li>
                  <li>White Paper release;</li>
                  <li>Initial marketing campaigns;</li>
                  <li>Website development.</li>
                </ul>
              </div>
              <div className="wp-rm-card">
                <h4>Phase 2 — Launch</h4>
                <ul>
                  <li>Official token launch;</li>
                  <li>Initial listings;</li>
                  <li>Community growth campaigns;</li>
                  <li>Viral marketing expansion;</li>
                  <li>Influencer partnerships;</li>
                  <li>Giveaway events.</li>
                </ul>
              </div>
              <div className="wp-rm-card">
                <h4>Phase 3 — Expansion</h4>
                <ul>
                  <li>International marketing campaigns;</li>
                  <li>Strategic partnerships;</li>
                  <li>Community scaling;</li>
                  <li>Utility development;</li>
                  <li>Ecosystem integrations.</li>
                </ul>
              </div>
              <div className="wp-rm-card">
                <h4>Phase 4 — Ecosystem Growth</h4>
                <ul>
                  <li>NFT ecosystem exploration;</li>
                  <li>Community reward systems;</li>
                  <li>Platform development;</li>
                  <li>Brand expansion;</li>
                  <li>Long-term ecosystem scaling.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="wp-section">
            <h2>8. Marketing Strategy</h2>
            <p>IEMV is designed to operate with a modern digital-first marketing strategy. Our expansion model includes:</p>
            <ul>
              <li>Social media domination;</li>
              <li>Influencer collaborations;</li>
              <li>Viral trend participation;</li>
              <li>Community engagement campaigns;</li>
              <li>Paid promotional strategies;</li>
              <li>International audience expansion;</li>
              <li>Strategic content production.</li>
            </ul>
            <p>Brand visibility and consistent engagement are critical pillars of our long-term strategy.</p>
          </div>

          <div className="wp-section">
            <h2>9. Community Philosophy</h2>
            <p>The IEMV community is not just an audience. It is the foundation of the entire ecosystem. We aim to build:</p>
            <ul>
              <li>An active community;</li>
              <li>A strong digital identity;</li>
              <li>Global engagement;</li>
              <li>Loyal holders;</li>
              <li>A culture-driven movement.</li>
            </ul>
            <p>Community participation will remain central to future development.</p>
          </div>

          <div className="wp-section">
            <h2>10. Transparency & Security</h2>
            <p>Transparency is one of the core values of IEMV. The project is committed to:</p>
            <ul>
              <li>Clear communication;</li>
              <li>Community updates;</li>
              <li>Responsible development;</li>
              <li>Strategic ecosystem management;</li>
              <li>Long-term sustainability.</li>
            </ul>
            <p>Official announcements and updates will always be shared through official channels.</p>
          </div>

          <div className="wp-section">
            <h2>11. Risk Statement</h2>
            <p>Cryptocurrency markets are highly volatile. Participation in digital assets involves financial risks. Every participant should:</p>
            <ul>
              <li>Conduct independent research;</li>
              <li>Understand market volatility;</li>
              <li>Invest responsibly;</li>
              <li>Never invest more than they can afford to lose.</li>
            </ul>
            <p>IEMV does not guarantee profits or investment returns.</p>
          </div>

          <div className="wp-section">
            <h2>12. Long-Term Objectives</h2>
            <p>The long-term objectives of IEMV include:</p>
            <ul>
              <li>Building a globally recognized meme brand;</li>
              <li>Expanding the ecosystem internationally;</li>
              <li>Developing future utilities;</li>
              <li>Creating sustainable community growth;</li>
              <li>Strengthening digital brand presence;</li>
              <li>Establishing a long-term ecosystem.</li>
            </ul>
          </div>

          <div className="wp-section">
            <h2>13. Final Statement</h2>
            <p>IEMV was created with a simple but powerful objective: <strong>To build a strong, viral, and globally connected community capable of growing together inside the digital economy.</strong></p>
            <p>We believe the future belongs to communities capable of transforming culture into movement.</p>
            <p>IEMV is more than a token. It is:<br/><strong>A brand. A community. A movement. A digital identity.</strong></p>
            <p>The journey is only beginning.</p>
          </div>

          <div className="wp-footer-card">
            <h3>Official Channels</h3>
            <div className="wp-channels">
              <a href="https://x.com/IEMVlegacy" target="_blank" rel="noopener noreferrer">X (Twitter): @IEMVlegacy</a>
              <a href="https://t.me/+BKLnbvKldFdkOWYx" target="_blank" rel="noopener noreferrer">Telegram: Join Here</a>
              <span>Website: You are here</span>
            </div>
            <p className="wp-copyright">© 2026 IEMV — All Rights Reserved</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhitepaperPage;
