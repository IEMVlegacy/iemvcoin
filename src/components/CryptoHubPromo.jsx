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
              <h2>Central de Informação Crypto</h2>
              <p>Gráficos, notícias, watchlist e alertas para sua comunidade ficar por dentro do mercado.</p>
            </div>
          </div>

          <div className="promo-features">
            <div>
              <strong>✔️ Dados de mercado em tempo real</strong>
              <p>Preços, volume e movimentação das principais memecoins.</p>
            </div>
            <div>
              <strong>✔️ Missões e quiz</strong>
              <p>Conteúdo interativo para manter a comunidade engajada diariamente.</p>
            </div>
            <div>
              <strong>✔️ Navegação integrada</strong>
              <p>Abre dentro do nosso site — você mantém o tráfego e a retenção.</p>
            </div>
          </div>

          <div className="promo-actions">
            <Link to="/crypto" className="btn btn-primary">
              Ir para a Central
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
