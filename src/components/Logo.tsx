import { motion } from 'motion/react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 520 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }}
    >
      <defs>
        {/* Intense Glow for FORGE */}
        <filter id="forge-glow-final" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodColor="#FF4D00" floodOpacity="0.9" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Fiery Gradient for FORGE */}
        <linearGradient id="forge-gradient-final" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF8A00" />
          <stop offset="50%" stopColor="#FFD600" />
          <stop offset="100%" stopColor="#FF4D00" />
        </linearGradient>
      </defs>

      {/* FLOW Section */}
      <g transform="translate(10, 65)">
        <text fontFamily="Orbitron, sans-serif" fontWeight="900" fontSize="52" fill="white" letterSpacing="4">
          FL
        </text>
        
        {/* Robot Icon as 'O' */}
        <g transform="translate(85, -45) scale(0.95)">
          <path d="M15 10 V20 M45 10 V20" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M5 35 C5 20 55 20 55 35 V50 H5 V35Z" fill="#1A1A1A" stroke="white" strokeWidth="4" />
          <rect x="15" y="30" width="30" height="8" rx="4" fill="white" />
          <circle cx="22" cy="34" r="1.5" fill="#1A1A1A" />
          <circle cx="38" cy="34" r="1.5" fill="#1A1A1A" />
          <path d="M20 45 Q30 50 40 45" stroke="white" strokeWidth="2" fill="none" />
          <rect x="22" y="50" width="16" height="6" fill="#1A1A1A" stroke="white" strokeWidth="2" />
        </g>

        <text x="155" fontFamily="Orbitron, sans-serif" fontWeight="900" fontSize="52" fill="white" letterSpacing="4">
          W
        </text>
      </g>

      {/* FORGE Section */}
      <g transform="translate(245, 65)" filter="url(#forge-glow-final)">
        <text fontFamily="Orbitron, sans-serif" fontWeight="900" fontSize="52" fill="url(#forge-gradient-final)" letterSpacing="4">
          FORGE
        </text>
      </g>

      {/* Sparks around FORGE */}
      <g transform="translate(245, 65)">
        {[...Array(35)].map((_, i) => (
          <motion.circle
            key={i}
            r={Math.random() * 1.2 + 0.4}
            fill={i % 2 === 0 ? "#FFD600" : "#FF4D00"}
            initial={{ 
              x: 100 + (Math.random() - 0.5) * 280, 
              y: (Math.random() - 0.5) * 80,
              opacity: Math.random() * 0.7
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.4, 1],
              y: (Math.random() - 0.5) * 90,
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </g>
    </svg>
  );
}