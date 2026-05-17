import React, { useEffect, useRef, useState } from 'react';
import './MemecoinGallery.css';
import ImageWithFallback from './ImageWithFallback';
import MemecoinModal from './MemecoinModal';

const CACHE_KEY = 'memecoin_gallery_cache_v1';

const MemecoinGallery = ({ limit = 24, perPage = 12 }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openCoin, setOpenCoin] = useState(null);

  useEffect(() => {
    let mounted = true;
    const cached = (() => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.t > 1000 * 60 * 5) return null; // 5min
        return parsed.v;
      } catch {
        return null;
      }
    })();

    const fetchCoins = async () => {
      setLoading(true);
      try {
        if (cached && mounted) {
          setCoins(cached);
          setLoading(false);
          return;
        }
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (mounted) {
          setCoins(data);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v: data }));
        }
      } catch (e) {
        if (mounted) setCoins([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCoins();
    return () => {
      mounted = false;
    };
  }, [limit]);

  const total = coins.length;
  const containerRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visiblePerView = 3;

  const pageCoins = coins; // show all in carousel, scrolling handles view

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let intervalId = null;
    const play = () => {
      if (!container) return;
      const children = container.children;
      if (!children.length) return;
      const cardWidth = children[0].offsetWidth + 12; // gap approx
      const next = () => {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft + cardWidth > maxScroll - 2) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        }
      };
      intervalId = setInterval(() => {
        if (autoplay) next();
      }, 3000);
    };

    play();

    const onPointerDown = () => setAutoplay(false);
    const onPointerUp = () => setAutoplay(true);

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [coins, autoplay]);

  if (loading) return <div className="memecoin-gallery">Loading gallery...</div>;

  return (
    <section className="memecoin-gallery">
      <h3>Memecoin Gallery</h3>
      <p className="muted">Browse icons and quick stats for the top coins.</p>
      <div className="memecoin-grid carousel" ref={containerRef}>
        {pageCoins.map((c, idx) => (
          <article
            key={c.id}
            className="memecoin-card"
            onClick={() => setOpenCoin(c.id)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter') setOpenCoin(c.id); }}
          >
            <ImageWithFallback src={c.image} alt={c.name} className="memecoin-img" />
            <div className="memecoin-info">
              <strong className="memecoin-name">{c.name}</strong>
              <span className="memecoin-symbol">{c.symbol.toUpperCase()}</span>
              <span className="memecoin-price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(c.current_price)}</span>
            </div>
            <div className={`memecoin-change ${c.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
              {c.price_change_percentage_24h ? `${c.price_change_percentage_24h.toFixed(2)}%` : '--'}
            </div>
          </article>
        ))}
      </div>

      <div className="memecoin-gallery-footer">
        <div className="carousel-controls">
          <button type="button" className="btn" onClick={() => { if (containerRef.current) containerRef.current.scrollBy({ left: -300, behavior: 'smooth' }); }}>
            ◀
          </button>
          <button type="button" className="btn" onClick={() => setAutoplay((v) => !v)}>
            {autoplay ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="btn" onClick={() => { if (containerRef.current) containerRef.current.scrollBy({ left: 300, behavior: 'smooth' }); }}>
            ▶
          </button>
        </div>
        <div className="gallery-controls">
          <button type="button" className="btn btn-outline" onClick={() => { window.scrollTo({ left: 0, behavior: 'smooth' }); }}>
            Scroll to top
          </button>
        </div>
      </div>

      {openCoin && <MemecoinModal coinId={openCoin} onClose={() => setOpenCoin(null)} />}
    </section>
  );
};

export default MemecoinGallery;
