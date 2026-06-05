import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Layers, Zap, ShieldCheck } from "lucide-react";

export default function About() {
  const [showProcessModal, setShowProcessModal] = useState(false);

  // Hardened Scroll Lock (Catches both native and smooth-scroll setups)
  useEffect(() => {
    if (showProcessModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [showProcessModal]);

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative group border border-white/10 bg-[#111111] flex flex-col items-center justify-center">
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-700 transition-transform duration-700 group-hover:scale-105">
                <span className="uppercase tracking-widest text-sm font-bold">Image Placeholder</span>
                <span className="text-xs mt-2">Insert Founder Image Here</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 z-10">
                <p className="text-3xl font-black text-white mb-1">Ayush</p>
                <p className="text-[#FF4D00] font-bold tracking-wider text-sm uppercase">Founder & Lead Designer</p>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF4D00]/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
          </motion.div>

          <div>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#FF4D00] font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              About Flowforge
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-8 leading-tight text-white"
            >
              Blending Creativity with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF4D00]">Technology</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-neutral-400 text-lg mb-10 leading-relaxed font-medium"
            >
              We are Flowforge — an AI-powered design studio crafting stunning, animated, and high-performing websites. We blend creativity with technology to forge digital experiences that flow seamlessly.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
              {[
                "AI-Powered Websites",
                "Fluid Animations",
                "Professional Design",
                "End-to-End Solutions"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D00]" />
                  <span className="text-neutral-300 font-bold text-sm tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button 
                onClick={() => setShowProcessModal(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 border border-neutral-700 rounded-xl overflow-hidden hover:border-transparent cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10">Learn More About Our Process</span>
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {showProcessModal && (
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
              // Standardized the modal padding to p-6/p-10
              className="relative w-full max-w-4xl bg-[#0A0A0A]/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col p-6 md:p-10"
            >
              <button
                onClick={() => setShowProcessModal(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              {/* Applied mt-16 / mt-20 to push the scrollable container down.
                This shrinks the scrollbar track so it stays well below the close button.
              */}
              <div 
                className="flex-grow overflow-y-auto custom-scrollbar mt-16 md:mt-20 pr-4 md:pr-6"
                data-lenis-prevent="true"
              >
                <span className="text-[#FF4D00] font-bold tracking-[0.2em] uppercase text-xs mb-4 block text-center mt-2">
                  Inside The Forge
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-12">
                  Our Process & Philosophy
                </h2>

                <div className="space-y-12 max-w-3xl mx-auto pb-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#FF4D00]">
                      <Layers size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Architectural Design</h3>
                      <p className="text-neutral-400 leading-relaxed font-medium">
                        Every project begins in the blueprint phase. We map out user journeys, establish aesthetic guidelines, and prototype fluid animations using GSAP and Framer Motion before a single line of code is written. We build high-end websites, landing pages, and full digital redesigns tailored to convert.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#FF4D00]">
                      <Zap size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">AI & Automation Logic</h3>
                      <p className="text-neutral-400 leading-relaxed font-medium">
                        We don't just build static pages. We engineer sophisticated backend pipelines, integrating intelligent AI solutions and automated workflows directly into your digital infrastructure, turning your website into an active, data-processing engine that operates 24/7.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#FF4D00]">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">How We Work (Terms of Service)</h3>
                      <p className="text-neutral-400 leading-relaxed font-medium">
                        We operate on transparency, strict timelines, and a collaborative iterative process. Once a project enters the forge, communication is locked in. Revisions are handled strategically to ensure the final deployment exactly matches the initial vision, with zero compromises on quality or performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}