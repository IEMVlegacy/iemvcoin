import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './CryptoHubPage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const coinsConfig = [
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'pepe', symbol: 'PEPE', name: 'Pepe' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'floki', symbol: 'FLOKI', name: 'Floki' },
  { id: 'bonk', symbol: 'BONK', name: 'Bonk' },
];

const tabOptions = [
  { id: 'overview', label: 'Overview' },
  { id: 'trends', label: 'Tendências' },
  { id: 'education', label: 'Educação' },
];

const makeSparklinePath = (values = []) => {
  if (!values.length) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 160;
  const height = 40;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '--';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

const CryptoHubPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedChartCoin, setSelectedChartCoin] = useState(coinsConfig[0]);
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [newsFeed, setNewsFeed] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);

  const ids = useMemo(() => coinsConfig.map((coin) => coin.id).join(','), []);

  const summaryStats = useMemo(() => {
    if (!cryptoData.length) return { topGainer: null, worstPerformer: null, averageChange: null };
    const sorted = [...cryptoData].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
    const averageChange = cryptoData.reduce((acc, coin) => acc + (coin.price_change_percentage_24h || 0), 0) / cryptoData.length;
    return {
      topGainer: sorted[0],
      worstPerformer: sorted[sorted.length - 1],
      averageChange,
    };
  }, [cryptoData]);

  const topCoins = useMemo(() => cryptoData.slice(0, 3), [cryptoData]);

  const fetchMarketData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
      );
      if (!response.ok) {
        throw new Error('Falha ao carregar dados de mercado');
      }

      const data = await response.json();
      setCryptoData(data);
      setLastUpdated(new Date());
    } catch (fetchError) {
      setError(fetchError.message || 'Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsFeed = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/status_updates?category=general&per_page=6');
      if (!response.ok) {
        throw new Error('Falha ao carregar notícias');
      }
      const data = await response.json();
      setNewsFeed(data.status_updates || []);
    } catch {
      setNewsFeed([]);
    }
  };

  const fetchTrending = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
      if (!response.ok) {
        throw new Error('Falha ao carregar tendências');
      }
      const data = await response.json();
      setTrendingCoins(data.coins?.slice(0, 6) || []);
    } catch {
      setTrendingCoins([]);
    }
  };

  const fetchChartData = async (coinId) => {
    setChartLoading(true);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=hourly`);
      if (!response.ok) {
        throw new Error('Não foi possível carregar o gráfico');
      }
      const data = await response.json();
      const labels = data.prices?.map((item) => new Date(item[0]).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })) || [];
      const values = data.prices?.map((item) => item[1]) || [];
      setChartData({ labels, values });
    } catch {
      setChartData(null);
    } finally {
      setChartLoading(false);
    }
  };

  const refreshData = () => {
    if (!loading) {
      fetchMarketData();
      fetchNewsFeed();
      fetchTrending();
      fetchChartData(selectedChartCoin.id);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMarketData();
    fetchNewsFeed();
    fetchTrending();
    fetchChartData(selectedChartCoin.id);
    const intervalId = setInterval(() => {
      fetchMarketData();
      fetchNewsFeed();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [ids, selectedChartCoin]);

  const chartConfig = chartData
    ? {
        labels: chartData.labels,
        datasets: [
          {
            label: `${selectedChartCoin.symbol} 24h`,
            data: chartData.values,
            borderColor: '#d4af37',
            backgroundColor: 'rgba(212, 175, 55, 0.18)',
            fill: true,
            tension: 0.35,
            pointRadius: 0,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Preço: ${formatCurrency(context.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#c4c4cf' },
      },
      y: {
        grid: { borderDash: [4, 4], color: 'rgba(196,196,207,0.12)' },
        ticks: { color: '#c4c4cf' },
      },
    },
  };

  return (
    <div className="crypto-hub-page">
      <div className="crypto-hub-hero">
        <div className="container">
          <Link to="/" className="crypto-back-link">
            <ArrowLeft size={18} /> Voltar ao Home
          </Link>
          <div className="crypto-hero-content">
            <h1>Crypto Hub</h1>
            <p>
              Tudo sobre meme coins e cripto em um só lugar. Preços em tempo real, tendências e insights para
              manter seu ecossistema conectado.
            </p>
            <div className="crypto-hero-badges">
              <span>Memes</span>
              <span>Gráficos</span>
              <span>Atualização automática</span>
              <span>Educação</span>
            </div>
            <div className="crypto-hero-actions">
              <button type="button" className="btn btn-outline refresh-btn" onClick={refreshData}>
                {loading ? 'Atualizando...' : 'Atualizar agora'}
              </button>
            </div>
            <div className="crypto-tabs">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`crypto-tab-button ${selectedTab === tab.id ? 'active' : ''}`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container crypto-hub-body">
        {selectedTab === 'overview' && (
          <>
            <section className="crypto-hub-section">
              <div className="crypto-section-heading">
                <h2>Visão geral</h2>
                <p>Dados em tempo real para manter seu público informado e engajado.</p>
              </div>

              <div className="crypto-summary-grid">
                <div className="crypto-summary-card">
                  <span>Top performer</span>
                  <strong>{summaryStats.topGainer ? `${summaryStats.topGainer.name} ${summaryStats.topGainer.price_change_percentage_24h?.toFixed(2)}%` : 'Aguardando dados'}</strong>
                </div>
                <div className="crypto-summary-card">
                  <span>Maior queda</span>
                  <strong>{summaryStats.worstPerformer ? `${summaryStats.worstPerformer.name} ${summaryStats.worstPerformer.price_change_percentage_24h?.toFixed(2)}%` : 'Aguardando dados'}</strong>
                </div>
                <div className="crypto-summary-card">
                  <span>Média 24h</span>
                  <strong>{summaryStats.averageChange !== null ? `${summaryStats.averageChange.toFixed(2)}%` : 'Aguardando dados'}</strong>
                </div>
              </div>

              <div className="crypto-chart-panel">
                <div className="crypto-chart-header">
                  <div>
                    <h3>{selectedChartCoin.name} — Evolução 24h</h3>
                    <p>Selecione um ativo e veja o movimento do preço nas últimas 24 horas.</p>
                  </div>
                  <select
                    className="crypto-chart-select"
                    value={selectedChartCoin.id}
                    onChange={(event) => {
                      const nextCoin = coinsConfig.find((coin) => coin.id === event.target.value);
                      setSelectedChartCoin(nextCoin || coinsConfig[0]);
                    }}
                  >
                    {coinsConfig.map((coin) => (
                      <option key={coin.id} value={coin.id}>
                        {coin.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="crypto-chart-container">
                  {chartLoading && <div className="crypto-status">Carregando gráfico...</div>}
                  {!chartLoading && chartConfig && <Line data={chartConfig} options={chartOptions} />}
                </div>
              </div>
            </section>

            <section className="crypto-hub-section crypto-news-section">
              <div className="section-heading-with-button">
                <div>
                  <h2>Notícias do ecossistema</h2>
                  <p>Headlines em tempo real para manter seu público dentro do seu site.</p>
                </div>
                <button type="button" className="btn btn-outline refresh-btn" onClick={refreshData}>
                  Atualizar notícias
                </button>
              </div>
              <div className="crypto-news-grid">
                {newsFeed.length > 0 ? (
                  newsFeed.map((item) => (
                    <article key={item.id} className="crypto-news-card">
                      <span>{item.project?.name || 'Crypto News'}</span>
                      <h3>{item.title || item.description || 'Atualização do mercado'}</h3>
                      <p>{item.description || 'Acompanhe as últimas movimentações e tendências do mercado cripto.'}</p>
                      <a href={item.project?.homepage?.[0] || '#'} target="_blank" rel="noopener noreferrer">
                        Ver mais
                      </a>
                    </article>
                  ))
                ) : (
                  <div className="crypto-status">Sem notícias disponíveis no momento.</div>
                )}
              </div>
            </section>
          </>
        )}

        {selectedTab === 'trends' && (
          <>
            <section className="crypto-hub-section">
              <div className="crypto-section-heading">
                <h2>Top Memecoins</h2>
                <p>As moedas que estão bombando agora e movimentando a comunidade.</p>
              </div>
              <div className="crypto-top-coins-grid">
                {topCoins.length > 0 ? (
                  topCoins.map((coin) => (
                    <div key={coin.id} className="crypto-top-coin-card">
                      <span>{coin.symbol.toUpperCase()}</span>
                      <h3>{coin.name}</h3>
                      <p>{formatCurrency(coin.current_price)}</p>
                      <strong className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </strong>
                    </div>
                  ))
                ) : (
                  <div className="crypto-status">Aguardando dados para tendências.</div>
                )}
              </div>
            </section>

            <section className="crypto-hub-section">
              <div className="crypto-section-heading">
                <h2>Trending Coins</h2>
                <p>Os ativos mais buscados e comentados atualmente.</p>
              </div>
              <div className="crypto-trending-grid">
                {trendingCoins.length > 0 ? (
                  trendingCoins.map((item) => (
                    <article key={item.item.id} className="crypto-trending-card">
                      <span>{item.item.symbol.toUpperCase()}</span>
                      <h3>{item.item.name}</h3>
                      <p>Rank #{item.item.market_cap_rank || '–'}</p>
                      <p>Preço: {item.item.price_btc ? `${item.item.price_btc.toFixed(8)} BTC` : 'Não disponível'}</p>
                    </article>
                  ))
                ) : (
                  <div className="crypto-status">Sem tendências carregadas.</div>
                )}
              </div>
            </section>
          </>
        )}

        {selectedTab === 'education' && (
          <section className="crypto-hub-section crypto-education">
            <h2>Educação cripto</h2>
            <div className="crypto-education-grid">
              <article>
                <h3>O que são memecoins?</h3>
                <p>Memecoins são tokens criados com referências culturais da internet. Eles ganham tração por comunidade, memes e storytelling.</p>
              </article>
              <article>
                <h3>Como usar o hub</h3>
                <p>Use esta página para comparar preços, identificar movimentos de alta e compartilhar tendências com sua comunidade.</p>
              </article>
              <article>
                <h3>Estratégias de retenção</h3>
                <p>Ofereça valor: gráficos, notícias e explicações claras ajudam usuários a voltar sempre.</p>
              </article>
              <article>
                <h3>Gestão de risco</h3>
                <p>Nunca invista tudo em um único ativo. Analise histórico, volume e sentimento antes de qualquer decisão.</p>
              </article>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CryptoHubPage;
