import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { ForBrands } from './sections/ForBrands';
import { ForCreators } from './sections/ForCreators';
import { Features } from './sections/Features';
import { HowItWorks } from './sections/HowItWorks';
import { WhyTwynn } from './sections/WhyThreeC';
import { GlobalMission } from './sections/GlobalMission';
import { Waitlist } from './sections/Waitlist';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { siteConfig } from './config';
import WaitlistModal from './components/WaitlistModal';
import { useState } from 'react'
import './App.css';

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleWaitlistSuccess = (entry) => {
  //   console.log('Successfully captured entry for database:', entry);
  //   You could put a global toast notification here if you wanted!
  // };

  useEffect(() => {
    if (siteConfig.siteTitle) {
      document.title = siteConfig.siteTitle;
    }
    if (siteConfig.siteDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', siteConfig.siteDescription);
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#0a0a0a]">
      {/* Navigation */}
      <Navigation setIsModalOpen={setIsModalOpen} />

      {/* Hero Section */}
      <Hero setIsModalOpen={setIsModalOpen}/>

      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {console.log('lmao')}}
      />

      <Features />

      {/* How It Works Section */}
      <HowItWorks />    

      {/* For Brands Section */}
      <ForBrands setIsModalOpen={setIsModalOpen} />

      {/* For Creators Section */}
      <ForCreators setIsModalOpen={setIsModalOpen} />


      {/* Who It Is For Section */}
      {/* <WhoItIsFor /> */}

      {/* Why ThreeC Section */}
      <WhyTwynn />

      {/* Global Mission Section */}
      <GlobalMission />

      {/* Waitlist CTA Section */}
      <Waitlist setIsModalOpen={setIsModalOpen} />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default App;
