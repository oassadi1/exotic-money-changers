import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CurrencyCalculator from './components/CurrencyCalculator';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin';

function App() {
  React.useEffect(() => {
    document.title = 'Exotic Money Changers | Currency Exchange Services';

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', 'logo.png');
    }
  }, []);

  if (window.location.pathname === '/admin') {
    return <Admin />;
  }

  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Services />
      <CurrencyCalculator />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
