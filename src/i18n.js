const translations = {
  en: {
    'nav.home': 'Home',
    'nav.crypto': 'Crypto Hub',
    'nav.guardians': 'Guardians',
    'nav.whitepaper': 'Whitepaper',
    'nav.cta': 'Information Center',

    'promo.title': 'Information Center — Crypto',
    'promo.desc': 'Charts, news, watchlist and alerts to keep your community up to date.',
    'promo.btn': 'Go to Information Center',
    'promo.feature1.title': 'Live market data',
    'promo.feature1.desc': 'Prices, volume and movement for top memecoins.',
    'promo.feature2.title': 'Missions & quiz',
    'promo.feature2.desc': 'Interactive content to keep your community engaged daily.',
    'promo.feature3.title': 'Integrated navigation',
    'promo.feature3.desc': 'Stays inside the site — keep traffic and retention.',

    'hub.overview.title': 'Overview',
    'hub.overview.desc': 'Real-time data to keep your audience informed and engaged.',
    'hub.news.title': 'Information Center',
    'hub.news.desc': 'Crypto, finance and market news and insights for your community.',
    'hub.news.refresh': 'Refresh news',
    'hub.news.readmore': 'Read more',
    'hub.news.non': 'No news available right now.',
    'hub.events.title': 'Upcoming events',
    'hub.events.desc': 'Quick market signals that may create opportunities.',
    'hub.missions.title': 'Daily Missions',
    'hub.missions.desc': 'Small tasks that keep the community active in the ecosystem.',
    'hub.quiz.title': 'Quick quiz',
    'footer.telegram': 'Telegram',
    'footer.twitter': 'Twitter/X',
    'footer.cryptohub': 'Crypto Hub',
    'footer.guardians': 'Guardians Program',
    'footer.communityFirst': 'Community First',
  },
  pt: {},
};

export function applyTranslations(lang = 'en') {
  const map = translations[lang] || {};
  Object.keys(map).forEach((key) => {
    const els = document.querySelectorAll(`[data-i18n-key="${key}"]`);
    els.forEach((el) => {
      el.innerText = map[key];
    });
  });
}

export function getSavedLanguage() {
  try {
    return localStorage.getItem('siteLanguage');
  } catch {
    return null;
  }
}

export function saveLanguage(lang) {
  try {
    localStorage.setItem('siteLanguage', lang);
  } catch {}
}

export default translations;
