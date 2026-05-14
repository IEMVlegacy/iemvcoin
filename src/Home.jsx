import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Whitepaper from './components/Whitepaper';
import Community from './components/Community';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
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
