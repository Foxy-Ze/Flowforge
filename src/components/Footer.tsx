import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Flame, X } from "lucide-react";
import Logo from "./Logo";

// ═══════════════════════════════════════════
// CUSTOM ICON
// ═══════════════════════════════════════════
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const [legalModal, setLegalModal] = useState<string | null>(null);

  // Hardened Scroll Lock for Legal Modal
  useEffect(() => {
    if (legalModal) {
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
  }, [legalModal]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Top Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent opacity-30" />

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Anchor (Left) */}
          <div className="lg:col-span-1">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex items-center gap-2 mb-6 group inline-block cursor-pointer">
              <Logo className="h-8 w-auto group-hover:scale-105 transition-transform duration-300" />
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 font-medium">
              We craft AI-powered websites with fluid animations & professional design. Forged to perform, built to flow.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#FF4D00] hover:border-[#FF4D00]/50 transition-all duration-300 hover:bg-[#FF4D00]/10">
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Services", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
                    onClick={(e) => {
                      if (item === "Home") {
                        e.preventDefault();
                        scrollToTop();
                      }
                    }}
                    className="text-neutral-400 hover:text-[#FF4D00] transition-colors duration-300 text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">Services</h4>
            <ul className="space-y-4">
              {["Web Design", "Landing Pages", "Full Redesign", "AI Solutions"].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-neutral-400 hover:text-[#FF4D00] transition-colors duration-300 text-sm font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">Newsletter</h4>
            <p className="text-neutral-400 text-sm mb-6 font-medium">Stay updated with the latest in AI design.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email"
                className="bg-[#111111] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FF4D00] w-full text-white placeholder-neutral-600 transition-colors"
              />
              <button className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] p-3 rounded-lg text-white hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300 transform hover:scale-105">
                <Flame size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-xs font-medium">
            © 2025 Flowforge. All rights reserved.
          </p>
          <div className="flex gap-8">
            <button onClick={() => setLegalModal("Privacy Policy")} className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors font-medium cursor-pointer">Privacy Policy</button>
            <button onClick={() => setLegalModal("Terms of Service")} className="text-neutral-600 hover:text-neutral-400 text-xs transition-colors font-medium cursor-pointer">Terms of Service</button>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-neutral-500 hover:text-[#FF4D00] hover:border-[#FF4D00]/50 hover:bg-[#FF4D00]/10 transition-all duration-300 cursor-pointer"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* AMBIENT GLOWING LOGO INJECTION              */}
      {/* ═══════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 select-none overflow-hidden pb-4">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 0.15, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[18vw] font-black leading-none tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: "2px #FF6B35",
            textShadow: "0px 0px 80px rgba(255, 107, 53, 0.4), 0px 10px 40px rgba(255, 107, 53, 0.2)",
          }}
        >
          FLOWFORGE
        </motion.h1>
      </div>

      {/* ════ LEGAL MODALS ════ */}
      <AnimatePresence>
        {legalModal && (
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
              className="relative w-full max-w-2xl bg-[#0A0A0A]/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col p-6 md:p-10 max-h-[90vh]"
            >
              <button
                onClick={() => setLegalModal(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              <div 
                className="flex-grow overflow-y-auto custom-scrollbar mt-12 pr-4"
                data-lenis-prevent="true"
              >
                <span className="text-[#FF4D00] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                  Flowforge Legal
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                  {legalModal}
                </h2>

                <div className="space-y-4 text-neutral-400 text-sm leading-relaxed font-medium pb-4">
                  {legalModal === "Privacy Policy" ? (
                    <>
                      <p>Flowforge is committed to data minimalism and protecting your privacy. We only collect the essential information required to facilitate project communication—specifically the name, email address, and phone number submitted directly through our secure contact forms.</p>
                      <p>We do not deploy third-party tracking cookies, and we will absolutely never sell, rent, or share your personal project data with external entities, brokers, or marketers.</p>
                    </>
                  ) : (
                    <>
                      <p>Flowforge is an elite digital engineering studio providing the following core services:</p>
                      <ul className="list-disc pl-5 space-y-2 text-white/80 my-4">
                        <li>High-end Website & Landing Page Design</li>
                        <li>Custom Automation Pipelines & Workflows</li>
                        <li>SaaS (Software as a Service) Development</li>
                      </ul>
                      <p>By engaging our services, you agree to adhere to our highly structured, collaborative project timelines. All project deliverables, visual scopes, and backend architectures are iteratively finalized and locked in prior to the deployment phase to ensure flawless execution.</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}