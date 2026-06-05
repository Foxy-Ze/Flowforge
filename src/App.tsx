import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize Lenis for God-tier smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync Lenis with standard requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-neutral-50 font-sans antialiased selection:bg-[#FF4D00]/30 overflow-x-hidden">
      
      {/* The Hero Reactor */}
      <Hero />

      {/* The Services Grid */}
      <Services />

      {/*Showcase carousel*/}
      <Projects />

      {/* About section */}
      <About />

      {/* Contact with sheets embedded */}
      <Contact />

      `<Footer />
    </main>
  );
}

export default App;