import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './MemecoinModal.css';

const CACHE_KEY = 'memecoin_details_cache_v1';

const sanitizeHtml = (html) => {
  if (!html) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    doc.querySelectorAll('script, style').forEach((n) => n.remove());
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null, false);
    let node = walker.nextNode();
    while (node) {
      // remove on* attrs and javascript: hrefs
      Array.from(node.attributes || []).forEach((attr) => {
        if (attr.name.startsWith('on')) node.removeAttribute(attr.name);
        if (attr.name === 'style') node.removeAttribute('style');
        if (attr.name === 'href' && attr.value.trim().toLowerCase().startsWith('javascript:')) node.removeAttribute('href');
      });
      node = walker.nextNode();
    }
    return doc.body.innerHTML;
  } catch {
    return '';
  }
};

const MemecoinModal = ({ coinId, onClose }) => {
  const [coin, setCoin] = useState(null);
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coinId) return;
    let mounted = true;

    const getCached = () => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const entry = parsed[coinId];
        if (!entry) return null;
        if (Date.now() - entry.t > 1000 * 60 * 60 * 6) return null; // 6h cache
        return entry.v;
      } catch {
        return null;
      }
    };

    const setCache = (data) => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        parsed[coinId] = { t: Date.now(), v: data };
        localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
      } catch {}
    };

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const cached = getCached();
        if (cached && mounted) {
          setCoin(cached.details);
          setChart(cached.chart);
          setLoading(false);
          return;
        }

        const [detailsRes, chartRes] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`),
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`),
        ]);
        const details = await detailsRes.json();
        const chartData = await chartRes.json();
        if (!mounted) return;
        const labels = (chartData.prices || []).map((p) => new Date(p[0]).toLocaleDateString('en-US'));
        const values = (chartData.prices || []).map((p) => p[1]);
        const payload = { details, chart: { labels, values } };
        setCoin(details);
        setChart(payload.chart);
        setCache(payload);
      } catch (e) {
        if (mounted) {
          setCoin(null);
          setChart(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchDetails();

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      mounted = false;
      window.removeEventListener('keydown', onKey);
    };
  }, [coinId, onClose]);

  if (!coinId) return null;

  const homepage = coin?.links?.homepage?.[0] || '';
  const twitter = coin?.links?.twitter_screen_name || '';
  const repo = coin?.links?.repos_url?.github?.[0] || '';

  return (
    <div className="memecoin-modal-backdrop" onClick={onClose} role="dialog">
      <div className="memecoin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        {loading && <div className="modal-loading">Loading...</div>}
        {!loading && coin && (
          <div className="modal-content">
            <div className="modal-header">
              <img src={coin.image?.large || coin.image?.small} alt={coin.name} />
              <div>
                <h2>{coin.name} <small>({coin.symbol.toUpperCase()})</small></h2>
                <p>Rank #{coin.market_cap_rank}</p>
                <div className="modal-links">
                  {homepage && <a href={homepage} target="_blank" rel="noreferrer">Homepage</a>}
                  {twitter && <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">Twitter</a>}
                  {repo && <a href={repo} target="_blank" rel="noreferrer">Source</a>}
                  <a href={`https://www.coingecko.com/en/coins/${coin.id}`} target="_blank" rel="noreferrer">View on CoinGecko</a>
                </div>
              </div>
            </div>
            <div className="modal-chart">
              {chart ? (
                <Line
                  data={{ labels: chart.labels, datasets: [{ data: chart.values, borderColor: '#d4af37', backgroundColor: 'rgba(212,175,55,0.12)', fill: true, tension:0.2 }] }}
                  options={{ plugins:{ legend:{ display:false } }, scales:{ x:{ ticks:{ color:'#c4c4cf' } }, y:{ ticks:{ color:'#c4c4cf' } } } }}
                />
              ) : (
                <div className="modal-loading">No chart available</div>
              )}
            </div>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(coin.description?.en || '') }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemecoinModal;
