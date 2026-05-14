import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import WhitepaperPage from './pages/WhitepaperPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
      </Routes>
    </Router>
  );
}

export default App;
