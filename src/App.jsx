import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import WhitepaperPage from './pages/WhitepaperPage';
import GuardiansPage from './pages/GuardiansPage';
import CryptoHubPage from './pages/CryptoHubPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="/guardians" element={<GuardiansPage />} />
        <Route path="/crypto" element={<CryptoHubPage />} />
      </Routes>
    </Router>
  );
}

export default App;
