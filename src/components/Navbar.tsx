import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onForgeClick }: { onForgeClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 lg:px-12 lg:py-6 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="relative z-50 w-40 lg:w-48">
          <Logo />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-white transition-colors duration-300">
              {link.name}
            </a>
          ))}
          <button 
            onClick={onForgeClick}
            className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-6 py-2 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300"
          >
            Forge Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-50 text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-screen bg-neutral-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white tracking-wider"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                setIsOpen(false);
                if (onForgeClick) onForgeClick();
              }}
              className="mt-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white px-8 py-3 rounded-full font-semibold text-lg"
            >
              Forge Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}