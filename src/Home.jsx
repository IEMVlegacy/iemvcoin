import React from 'react';
import TopAnnouncement from './components/TopAnnouncement';
import Hero from './components/Hero';
import GuardiansPromo from './components/GuardiansPromo';
import CryptoHubPromo from './components/CryptoHubPromo';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Whitepaper from './components/Whitepaper';
import Community from './components/Community';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div className="home-container">
      <TopAnnouncement />
      <Hero />
      <GuardiansPromo />
      <CryptoHubPromo />
      <About />
      <Tokenomics />
      <Roadmap />
      <Whitepaper />
      <Community />
      <Footer />
    </div>
  );
};

export default Home;
