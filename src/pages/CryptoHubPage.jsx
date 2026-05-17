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
import MemecoinGallery from '../components/MemecoinGallery';

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

const fallbackNewsFeed = [
  {
    id: 'fallback-1',
    title: 'Bitcoin se mantém acima de níveis críticos',
    description: 'The crypto market is recovering as traders watch BTC price resistance.',
    source: 'Crypto Center',
    url: 'https://www.coindesk.com',
  },
  {
    id: 'fallback-2',
    title: 'Mercado financeiro reage a decisões de taxas de juros',
    description: 'Notícias macro levam investidores a revisar posições em cripto e ações, com foco em proteção e crescimento.',
    source: 'Market News',
    url: 'https://www.bloomberg.com',
  },
  {
    id: 'fallback-3',
    title: 'Ethereum e DeFi em destaque',
    description: 'Fluxo de capital para DeFi continua, com projetos de staking e rendimentos atraindo interesse.',
    source: 'DeFi Pulse',
    url: 'https://www.coingecko.com',
  },
  {
    id: 'fallback-4',
    title: 'Ações e cripto: correlação em alta',
    description: 'Movimentos recentes mostram maior alinhamento entre mercados digitais e tradicionais.',
    source: 'Financial Hub',
    url: 'https://www.reuters.com',
  },
];

const timeframeOptions = [
  { id: '24h', label: '24h', days: 1, interval: 'hourly' },
  { id: '7d', label: '7d', days: 7, interval: 'daily' },
  { id: '30d', label: '30d', days: 30, interval: 'daily' },
];

const marketEvents = [
  {
    id: 'event-1',
    label: 'Evento importante',
    title: 'Atualização de rede Ethereum',
    date: 'Hoje',
  },
  {
    id: 'event-2',
    label: 'Oportunidade',
    title: 'Alta de memecoins com volume crescente',
    date: 'Nas próximas 24h',
  },
  {
    id: 'event-3',
    label: 'Alerta',
    title: 'Volatilidade global de mercado',
    date: 'Acompanhar',
  },
];

const dailyMissions = [
  {
    id: 'mission-1',
    title: 'Compare duas memecoins',
    description: 'Veja o desempenho e adicione sua favorita à watchlist.',
  },
  {
    id: 'mission-2',
    title: 'Leia uma notícia importante',
    description: 'Atualize o feed e compartilhe o headline com seu grupo.',
  },
  {
    id: 'mission-3',
    title: 'Faça um mini-quiz',
    description: 'Responda rápido e teste seus conhecimentos em cripto.',
  },
];

const quizQuestions = [
  {
    id: 'quiz-1',
    question: 'O que significa “dominância BTC”?',
    options: [
      'Percentual do mercado total de cripto controlado pelo Bitcoin',
      'Quantidade de BTC em staking',
      'Expected future price of Bitcoin',
    ],
    answer: 'Percentual do mercado total de cripto controlado pelo Bitcoin',
  },
  {
    id: 'quiz-2',
    question: 'Qual métrica indica movimentação de capital em 24h?',
    options: ['Volume 24h', 'Market cap', 'Número de transações'],
    answer: 'Volume 24h',
  },
  {
    id: 'quiz-3',
    question: 'Qual item é mais útil para monitorar tendências?',
    options: ['Trending Coins', 'Documento técnico', 'Logo da moeda'],
    answer: 'Trending Coins',
  },
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

const formatNumber = (value) => {
  if (value === null || value === undefined) return '--';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value) => {
  if (value === null || value === undefined) return '--';
  return `${value.toFixed(2)}%`;
};

const CryptoHubPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedChartCoin, setSelectedChartCoin] = useState(coinsConfig[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframeOptions[0]);
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [newsFeed, setNewsFeed] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [globalData, setGlobalData] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cryptoWatchlist') || '[]');
    } catch {
      return [];
    }
  });
  const [completedMissions, setCompletedMissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cryptoCompletedMissions') || '[]');
    } catch {
      return [];
    }
  });
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
      const response = await fetch('https://api.coingecko.com/api/v3/status_updates?category=all&per_page=10');
      if (!response.ok) {
        throw new Error('Falha ao carregar notícias');
      }
      const data = await response.json();
      const feed = (data.status_updates || []).map((item) => ({
        id: item.id,
        title: item.title || item.description || 'Atualização do mercado',
        description: item.description || '',
        source: item.project?.name || item.category || 'Crypto News',
        url: item.project?.homepage?.[0] || item.user?.profile_url || '#',
      }));
      setNewsFeed(feed.length > 0 ? feed : fallbackNewsFeed);
    } catch {
      setNewsFeed(fallbackNewsFeed);
    }
  };

  const fetchGlobalData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      if (!response.ok) {
        throw new Error('Falha ao carregar dados globais');
      }
      const data = await response.json();
      setGlobalData(data.data || null);
    } catch {
      setGlobalData(null);
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

  const fetchChartData = async (coinId, timeframe) => {
    setChartLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeframe.days}&interval=${timeframe.interval}`
      );
      if (!response.ok) {
        throw new Error('Não foi possível carregar o gráfico');
      }
      const data = await response.json();
      const labels = data.prices?.map((item) => {
        const date = new Date(item[0]);
        return timeframe.id === '24h'
          ? date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          : date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      }) || [];
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
      fetchGlobalData();
      fetchChartData(selectedChartCoin.id, selectedTimeframe);
    }
  };

  useEffect(() => {
    localStorage.setItem('cryptoCompletedMissions', JSON.stringify(completedMissions));
  }, [completedMissions]);

  const toggleMissionCompletion = (missionId) => {
    const nextCompleted = completedMissions.includes(missionId)
      ? completedMissions.filter((id) => id !== missionId)
      : [...completedMissions, missionId];
    setCompletedMissions(nextCompleted);
  };

  const handleQuizSelect = (option) => {
    setSelectedAnswer(option);
    setQuizFeedback(null);
  };

  const submitQuiz = () => {
    const current = quizQuestions[quizIndex];
    if (!current) return;
    const correct = selectedAnswer === current.answer;
    setQuizFeedback({
      correct,
      message: correct ? 'Correto! Boa visão do mercado.' : `Ops, a resposta certa é: ${current.answer}`,
    });
    if (correct && quizIndex === quizQuestions.length - 1) {
      setQuizCompleted(true);
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
      setQuizFeedback(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizFeedback(null);
    setQuizCompleted(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMarketData();
    fetchNewsFeed();
    fetchTrending();
    fetchGlobalData();
    fetchChartData(selectedChartCoin.id, selectedTimeframe);
    const intervalId = setInterval(() => {
      fetchMarketData();
      fetchNewsFeed();
      fetchGlobalData();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [ids, selectedChartCoin, selectedTimeframe]);

  const chartConfig = chartData
    ? {
        labels: chartData.labels,
        datasets: [
          {
            label: `${selectedChartCoin.symbol} ${selectedTimeframe.label}`,
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
          label: (context) => `Price: ${formatCurrency(context.parsed.y)}`,
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

  const lastUpdatedText = lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` : 'Refreshing...';

  const isFavorite = (coinId) => watchlist.includes(coinId);

  const toggleWatchlist = (coinId) => {
    const nextWatchlist = isFavorite(coinId)
      ? watchlist.filter((id) => id !== coinId)
      : [...watchlist, coinId];
    setWatchlist(nextWatchlist);
    localStorage.setItem('cryptoWatchlist', JSON.stringify(nextWatchlist));
  };

  return (
    <div className="crypto-hub-page">
      <div className="crypto-hub-hero">
        <div className="container">
          <Link to="/" className="crypto-back-link">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <div className="crypto-hero-content">
            <h1>Crypto Hub</h1>
            <p>
              Everything about memecoins and crypto in one place. Real-time prices, trends and insights to
              manter seu ecossistema conectado.
            </p>
            <div className="crypto-hero-badges">
              <span>Memes</span>
              <span>Gráficos</span>
              <span>Atualização automática</span>
              <span>Educação</span>
              <span>Watchlist</span>
              <span>Missões</span>
              <span>Quiz</span>
            </div>
            <div className="crypto-hero-actions">
              <button type="button" className="btn btn-outline refresh-btn" onClick={refreshData}>
                {loading ? 'Refreshing...' : 'Refresh now'}
              </button>
            </div>
            <div className="crypto-ticker">
              {newsFeed.slice(0, 3).map((item, index) => (
                <span key={item.id}>
                  {item.title}
                  {index < 2 ? ' • ' : ''}
                </span>
              ))}
            </div>
            <div className="crypto-last-updated">{lastUpdatedText}</div>
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
                <h2 data-i18n-key="hub.overview.title">Visão geral</h2>
                <p data-i18n-key="hub.overview.desc">Dados em tempo real para manter seu público informado e engajado.</p>
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

              <section className="crypto-hub-section crypto-watchlist-section">
                <div className="crypto-section-heading">
                  <h2>Minha Watchlist</h2>
                  <p>Mark your favorite assets to return quickly and track them easily.</p>
                </div>
                <div className="crypto-watchlist-grid">
                  {watchlist.length > 0 ? (
                    watchlist.map((coinId) => {
                      const coin = coinsConfig.find((item) => item.id === coinId);
                      return (
                        <div key={coinId} className="crypto-top-coin-card">
                          <span>{coin?.symbol.toUpperCase() || '–'}</span>
                          <h3>{coin?.name || 'Ativo'}</h3>
                          <button
                            type="button"
                            className={`favorite-button ${isFavorite(coinId) ? 'active' : ''}`}
                            onClick={() => toggleWatchlist(coinId)}
                          >
                            {isFavorite(coinId) ? 'Remove' : 'Favorite'}
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="crypto-status">Add coins to your watchlist by clicking Favorite on the cards below.</div>
                  )}
                </div>
              </section>

              <section className="crypto-hub-section crypto-missions-section">
                <div className="crypto-section-heading">
                  <h2>Missões diárias</h2>
                  <p>Activate the community with small missions that keep everyone engaged in the ecosystem.</p>
                </div>
                <div className="crypto-missions-grid">
                  {dailyMissions.map((mission) => (
                    <article key={mission.id} className={`crypto-mission-card ${completedMissions.includes(mission.id) ? 'completed' : ''}`}>
                      <span>{mission.title}</span>
                      <p>{mission.description}</p>
                      <button
                        type="button"
                        className={`favorite-button ${completedMissions.includes(mission.id) ? 'active' : ''}`}
                        onClick={() => toggleMissionCompletion(mission.id)}
                      >
                        {completedMissions.includes(mission.id) ? 'Concluído' : 'Marcar como feito'}
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <section className="crypto-hub-section crypto-quiz-section">
                <div className="crypto-section-heading">
                  <h2>Quiz rápido</h2>
                  <p>Teste seus conhecimentos em cripto com perguntas rápidas e responda na hora.</p>
                </div>
                <div className="crypto-quiz-card">
                  <h3>{quizQuestions[quizIndex].question}</h3>
                  <div className="quiz-options">
                    {quizQuestions[quizIndex].options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
                        onClick={() => handleQuizSelect(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="quiz-actions">
                    <button type="button" className="btn btn-outline" disabled={!selectedAnswer} onClick={submitQuiz}>
                      Responder
                    </button>
                    {quizFeedback && !quizCompleted && (
                      <button type="button" className="btn btn-primary" onClick={nextQuizQuestion}>
                        Próxima pergunta
                      </button>
                    )}
                    {quizCompleted && (
                      <button type="button" className="btn btn-primary" onClick={restartQuiz}>
                        Refazer quiz
                      </button>
                    )}
                  </div>
                  {quizFeedback && <div className={`quiz-feedback ${quizFeedback.correct ? 'correct' : 'incorrect'}`}>{quizFeedback.message}</div>}
                </div>
              </section>

              <div className="crypto-info-center-grid">
                <div className="crypto-info-card">
                  <span>Mercado cripto total</span>
                  <strong>{globalData ? formatCurrency(globalData.total_market_cap.usd) : 'Aguardando dados'}</strong>
                </div>
                <div className="crypto-info-card">
                  <span>Dominância BTC</span>
                  <strong>{globalData ? formatPercent(globalData.market_cap_percentage.btc) : 'Aguardando dados'}</strong>
                </div>
                <div className="crypto-info-card">
                  <span>Dominância ETH</span>
                  <strong>{globalData ? formatPercent(globalData.market_cap_percentage.eth) : 'Aguardando dados'}</strong>
                </div>
                <div className="crypto-info-card">
                  <span>Volume 24h</span>
                  <strong>{globalData ? formatCurrency(globalData.total_volume.usd) : 'Aguardando dados'}</strong>
                </div>
              </div>

              <div className="crypto-chart-panel">
                <div className="crypto-chart-header">
                  <div>
                    <h3>{selectedChartCoin.name} — Evolução {selectedTimeframe.label}</h3>
                    <p>Select an asset and view price movement over the {selectedTimeframe.label} timeframe.</p>
                  </div>
                  <div className="crypto-chart-controls">
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
                    <div className="crypto-timeframe-buttons">
                      {timeframeOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className={`timeframe-button ${selectedTimeframe.id === option.id ? 'active' : ''}`}
                          onClick={() => setSelectedTimeframe(option)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
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
                  <h2 data-i18n-key="hub.news.title">Information Center</h2>
                  <p data-i18n-key="hub.news.desc">Crypto, finance and market news and insights for your community.</p>
                </div>
                <button type="button" className="btn btn-outline refresh-btn" data-i18n-key="hub.news.refresh" onClick={refreshData}>
                  Refresh news
                </button>
              </div>
              <div className="crypto-news-grid">
                {newsFeed.length > 0 ? (
                  newsFeed.map((item) => (
                    <article key={item.id} className="crypto-news-card">
                      <span>{item.project?.name || item.source || 'Crypto News'}</span>
                      <h3>{item.title || 'Market update'}</h3>
                      <p>{item.description || 'Follow the latest moves and trends in crypto and finance.'}</p>
                      <a href={item.project?.homepage?.[0] || item.url || '#'} target="_blank" rel="noopener noreferrer" data-i18n-key="hub.news.readmore">
                        Read more
                      </a>
                    </article>
                  ))
                  ) : (
                  <div className="crypto-status" data-i18n-key="hub.news.non">No news available right now.</div>
                )}
              </div>
            </section>
            <section className="crypto-hub-section crypto-events-section">
              <div className="crypto-section-heading">
                <h2>Próximos eventos</h2>
                <p>Veja os sinais rápidos do mercado que podem gerar novas oportunidades.</p>
              </div>
              <div className="crypto-events-grid">
                {marketEvents.map((event) => (
                  <article key={event.id} className="crypto-event-card">
                    <span>{event.label}</span>
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {selectedTab === 'trends' && (
          <>
            <section className="crypto-hub-section">
              <MemecoinGallery limit={20} />
              <div className="crypto-section-heading">
                <h2>Top Memecoins</h2>
                <p>Coins that are pumping right now and moving the community.</p>
              </div>
              <div className="crypto-top-coins-grid">
                {topCoins.length > 0 ? (
                  topCoins.map((coin) => (
                    <div key={coin.id} className="crypto-top-coin-card">
                      <div className="coin-row">
                        <img src={coin.image} alt={coin.name} className="coin-logo" />
                        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                      </div>
                      <h3>{coin.name}</h3>
                      <p>{formatCurrency(coin.current_price)}</p>
                      <strong className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </strong>
                      <button
                        type="button"
                        className={`favorite-button ${isFavorite(coin.id) ? 'active' : ''}`}
                        onClick={() => toggleWatchlist(coin.id)}
                      >
                        {isFavorite(coin.id) ? 'Remove' : 'Favorite'}
                      </button>
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
                      <div className="coin-row">
                        <img src={item.item.small || item.item.thumb || item.item.large} alt={item.item.name} className="coin-logo" />
                        <span className="coin-symbol">{item.item.symbol.toUpperCase()}</span>
                      </div>
                      <h3>{item.item.name}</h3>
                      <p>Rank #{item.item.market_cap_rank || '–'}</p>
                      <p>Price: {item.item.price_btc ? `${item.item.price_btc.toFixed(8)} BTC` : 'Not available'}</p>
                      {coinsConfig.some((coin) => coin.id === item.item.id) && (
                        <button
                          type="button"
                          className={`favorite-button ${isFavorite(item.item.id) ? 'active' : ''}`}
                          onClick={() => toggleWatchlist(item.item.id)}
                        >
                          {isFavorite(item.item.id) ? 'Remove' : 'Favorite'}
                        </button>
                      )}
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
                <p>Memecoins are tokens created with internet culture references. They gain traction through community, memes, and storytelling.</p>
              </article>
              <article>
                <h3>Como usar o hub</h3>
                <p>Use this page to compare prices, spot breakouts, and share trends with your community.</p>
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
