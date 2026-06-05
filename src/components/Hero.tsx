import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import MoltenElement from './MoltenElement';
import Navbar from './Navbar';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const flowTextRef = useRef<HTMLSpanElement>(null);
  const forgeTextRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  // Separated refs to prevent GSAP conflicts between mouse parallax and scroll scrubbing
  const threeDRef = useRef<HTMLDivElement>(null);
  const threeDScrollRef = useRef<HTMLDivElement>(null); 
  
  const lastScrollY = useRef(0);

  const [showContactModal, setShowContactModal] = useState(false);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      // Mouse parallax only affects the outer wrapper
      gsap.to(threeDRef.current, {
        x: xPos * 60,
        y: yPos * 60,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(glowRef.current, {
        x: xPos * -50,
        y: yPos * -50,
        duration: 1.5,
        ease: "power2.out"
      });

      gsap.to(taglineRef.current, {
        x: xPos * 10,
        y: yPos * 10,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    const ctx = gsap.context(() => {
      window.addEventListener('mousemove', handleMouseMove);

      // Set initial scale on the inner scroll wrapper
      gsap.set(threeDScrollRef.current, { scale: 1.35 });
      
      const entryTl = gsap.timeline({ delay: 0.5 });

      entryTl.fromTo(flowTextRef.current,
        { opacity: 0, x: -50, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }
      )
      .fromTo(forgeTextRef.current,
        { opacity: 0, scale: 1.4, y: -30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "+=0.1"
      )
      .to(heroRef.current,
        { x: 5, duration: 0.05, repeat: 5, yoyo: true, ease: "power2.inOut" },
        "<"
      )
      .add(() => createForgesparks(), "<")
      .to(forgeTextRef.current,
        {
          textShadow: "0 0 10px rgba(255,107,53,0.8), 0 0 20px rgba(255,107,53,0.6), 0 0 40px rgba(255,107,53,0.4)",
          duration: 0.4
        },
        "-=0.4"
      )
      .fromTo(subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "+=0.2"
      )
      .fromTo(buttonsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 },
        "-=0.4"
      );

      // Endless ambient pulse
      gsap.to(forgeTextRef.current, {
        textShadow: "0 0 20px rgba(255,107,53,1), 0 0 40px rgba(255,107,53,0.8), 0 0 60px rgba(255,107,53,0.6)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const currentScrollY = self.scroll();
          const scrollDelta = currentScrollY - lastScrollY.current;

          if (Math.abs(scrollDelta) > 1) {
            const count = Math.min(Math.floor(Math.abs(scrollDelta) / 2), 5);
            for (let i = 0; i < count; i++) {
              if (Math.random() > 0.3) spawnScrollEmber(self.progress);
            }
          }
          lastScrollY.current = currentScrollY;
        }
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // ═════════════════════════════════════════════════════════════════════
      // THE FIX: We use fromTo with immediateRender: false to explicitly 
      // tell GSAP what the "returned" state should look like, ignoring 
      // the initial opacity: 0 from the entry animation.
      // ═════════════════════════════════════════════════════════════════════
      scrollTl.fromTo(glowRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: 200, scale: 2.5, opacity: 0, ease: "none", immediateRender: false }, 0
      )
      .fromTo(threeDScrollRef.current, 
        { scale: 1.35, filter: "brightness(1) saturate(1) grayscale(0)", y: 0, opacity: 1 },
        { scale: 0.75, filter: "brightness(0.3) saturate(0.2) grayscale(0.8)", y: 300, opacity: 0.3, ease: "none", immediateRender: false }, 0
      )
      .fromTo(flowTextRef.current,
        { y: 0, opacity: 1, filter: "blur(0px)" },
        { y: -250, opacity: 0, filter: "blur(10px)", ease: "power2.in", immediateRender: false }, 0
      )
      .fromTo(forgeTextRef.current,
        { y: 0, opacity: 1, filter: "blur(0px)" },
        { y: -180, opacity: 0, filter: "blur(5px)", ease: "power2.in", immediateRender: false }, 0.05
      )
      .fromTo(subtextRef.current,
        { y: 0, opacity: 1 },
        { y: -120, opacity: 0, ease: "power2.in", immediateRender: false }, 0.1
      )
      .fromTo(buttonsRef.current,
        { y: 0, opacity: 1 },
        { y: -80, opacity: 0, ease: "power2.in", immediateRender: false }, 0.15
      )
      .fromTo(heroRef.current,
        { backgroundColor: "#0A0A0A" },
        { backgroundColor: "#030303", ease: "none", immediateRender: false }, 0
      );

    }, heroRef);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createForgesparks = () => {
    const colors = ['#FF6B35', '#FFC145', '#FF8C42', '#FFD700'];
    const container = heroRef.current;
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const spark = document.createElement('div');
      const size = Math.random() * 6 + 2;

      spark.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: 50%;
        top: 45%;
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px currentColor;
        z-index: 50;
      `;

      container.appendChild(spark);

      gsap.to(spark, {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 300 - 100,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => spark.remove()
      });
    }
  };

  const spawnScrollEmber = (progress: number) => {
    const ember = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const colors = ['#FF6B35', '#FFC145', '#FF8C42', '#FFFFFF'];

    ember.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${10 + Math.random() * 80}%;
      top: ${20 + progress * 60}%;
      pointer-events: none;
      box-shadow: 0 0 ${size * 4}px currentColor;
      z-index: 100;
      opacity: ${0.4 + Math.random() * 0.6};
    `;

    document.body.appendChild(ember);

    gsap.to(ember, {
      y: -(Math.random() * 200 + 100),
      x: (Math.random() - 0.5) * 150,
      opacity: 0,
      scale: 0,
      duration: 1 + Math.random() * 1,
      ease: "sine.out",
      onComplete: () => ember.remove()
    });
  };

  return (
    <section id="hero" ref={heroRef} className="relative w-full h-screen min-h-[800px] bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">
      <Navbar onForgeClick={() => setShowContactModal(true)} />
      
      {/* Background glow */}
      <div ref={glowRef} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.15)_0%,transparent_60%)] blur-3xl pointer-events-none"></div>

      {/* 3D Element container */}
      <div ref={threeDRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Inner Scroll Wrapper added to isolate parallax from scroll scrub */}
        <div ref={threeDScrollRef} className="absolute inset-0 flex items-center justify-center">
          <MoltenElement />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-20">
      <h1 ref={taglineRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
          <span ref={flowTextRef} className="text-white inline-block">Let it Flow, </span>
          <span 
            ref={forgeTextRef} 
            className="text-[#FFF5F0] inline-block ml-2 relative z-10"
          >
            Watch it Forge
          </span>
        </h1>

        <p ref={subtextRef} className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-medium">
          We craft AI-powered websites with fluid animations & professional design.
          Forged to perform, built to flow with your vision.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-6">
          <button 
            className="px-8 py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,77,0,0.5)] transition-all duration-300 transform hover:scale-105"
            onClick={() => setShowContactModal(true)}
          >
            Forge Your Vision
          </button>
          <button 
            className="px-8 py-4 bg-transparent border-2 border-neutral-700 text-white rounded-full font-bold text-lg hover:border-white hover:bg-white/5 transition-all duration-300"
            onClick={() => handleScrollTo('projects')}
          >
            View Projects
          </button>
        </div>
      </div>

      {/* ════ GLOBAL CONTACT MODAL ════ */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-7xl bg-[#0A0A0A]/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="flex-grow overflow-y-auto custom-scrollbar relative [&>section]:!bg-transparent [&>section]:!py-8 md:[&>section]:!py-16">
                <Contact /> 
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}