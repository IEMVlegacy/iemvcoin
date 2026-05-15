import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import WhitepaperPage from './pages/WhitepaperPage';
import GuardiansPage from './pages/GuardiansPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="/guardians" element={<GuardiansPage />} />
      </Routes>
    </Router>
  );
}

export default App;
