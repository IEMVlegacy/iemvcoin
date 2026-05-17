import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield } from 'lucide-react';
import './CryptoHubPromo.css';

const CryptoHubPromo = () => {
  return (
    <section className="crypto-promo-section">
      <div className="container crypto-promo-container fade-in">
        <div className="crypto-promo-card">
          <div className="promo-header">
            <div className="promo-icon">
              <TrendingUp size={26} />
            </div>
            <div>
              <h2 data-i18n-key="promo.title">Information Center — Crypto</h2>
              <p data-i18n-key="promo.desc">Charts, news, watchlist and alerts to keep your community up to date.</p>
            </div>
          </div>

          <div className="promo-features">
            <div>
              <strong data-i18n-key="promo.feature1.title">✔️ Dados de mercado em tempo real</strong>
              <p data-i18n-key="promo.feature1.desc">Prices, volume and movement of top memecoins.</p>
            </div>
            <div>
              <strong data-i18n-key="promo.feature2.title">✔️ Missões e quiz</strong>
              <p data-i18n-key="promo.feature2.desc">Interactive content to keep the community engaged daily.</p>
            </div>
            <div>
              <strong data-i18n-key="promo.feature3.title">✔️ Navegação integrada</strong>
              <p data-i18n-key="promo.feature3.desc">Abre dentro do nosso site — você mantém o tráfego e a retenção.</p>
            </div>
          </div>

          <div className="promo-actions">
            <Link to="/crypto" className="btn btn-primary" data-i18n-key="promo.btn">
              Go to Information Center
            </Link>
            <Link to="/guardians" className="btn btn-outline">
              Ver Guardians Program
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoHubPromo;
