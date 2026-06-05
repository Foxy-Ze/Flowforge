import React, { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Code, Layout, Rocket, Zap } from "lucide-react";
import { gsap } from "gsap";

const services = [
  {
    title: "Website Design",
    description: "Custom, modern website designs tailored to your brand's unique identity and flow.",
    icon: <Layout className="w-8 h-8 text-[#FF4D00]" />,
  },
  {
    title: "Landing Page Design",
    description: "High-converting landing pages forged to turn visitors into loyal customers.",
    icon: <Rocket className="w-8 h-8 text-[#FF4D00]" />,
  },
  {
    title: "Full Website & Redesign",
    description: "Complete builds or refreshes that breathe new life into your digital presence.",
    icon: <Code className="w-8 h-8 text-[#FF4D00]" />,
  },
  {
    title: "AI Automation",
    description: "Smart, automated web solutions that streamline your workflow and boost efficiency.",
    icon: <Zap className="w-8 h-8 text-[#FF4D00]" />,
  },
];

export default function Services() {
  // ═══════════════════════════════════════════
  // AMBIENT FORGE GLOW PHYSICS (Optimized)
  // ═══════════════════════════════════════════
  const emitterRefs = useRef<{ [key: string]: ReturnType<typeof setInterval> }>({});

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';

    emitterRefs.current[id] = setInterval(() => {
      const spark = document.createElement('div');
      const size = Math.random() * 4 + 1;
      const colors = ['#FF4D00', '#FF8A00', '#FFD600']; // Refined to Burnt Saffron palette
      const rect = card.getBoundingClientRect();

      const isEdge = Math.random() > 0.5;
      const spawnX = isEdge ? Math.random() * rect.width : (Math.random() > 0.5 ? 0 : rect.width);
      const spawnY = isEdge ? rect.height - (Math.random() * 20) : Math.random() * rect.height;

      spark.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        left: ${spawnX}px;
        top: ${spawnY}px;
        pointer-events: none;
        box-shadow: 0 0 ${size * 3}px currentColor;
        z-index: -1;
      `;

      card.appendChild(spark);

      gsap.to(spark, {
        y: (Math.random() - 0.5) * 80 - 40,
        x: (Math.random() - 0.5) * 80,
        opacity: 0,
        scale: 0,
        duration: 1 + Math.random(),
        ease: "sine.out",
        onComplete: () => spark.remove()
      });
    }, 50);
  };

  const handleMouseLeave = (id: string) => {
    clearInterval(emitterRefs.current[id]);
  };

  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D00]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] mb-6"
          >
            What We Forge
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          >
            We combine cutting-edge AI technology with expert design principles to forge digital experiences that flow seamlessly.
          </motion.p>
        </div>

        {/* Staggered Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              
              /* STAGGER LOGIC: Even index = Left Column (normal), Odd index = Right Column (pushed down) */
              className={`p-10 rounded-2xl bg-[#111111] border border-white/5 relative group transition-all duration-500 hover:border-[#FF4D00]/40 hover:shadow-[0_0_40px_rgba(255,77,0,0.15)] hover:-translate-y-2 ${
                index % 2 !== 0 ? 'md:mt-16' : ''
              }`}
              
              onMouseEnter={(e) => handleMouseEnter(e, service.title)}
              onMouseLeave={() => handleMouseLeave(service.title)}
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#FF4D00]/10 transition-all duration-500">
                {service.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#FF4D00] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-neutral-400 mb-10 text-lg leading-relaxed">
                {service.description}
              </p>
              
              {/* Interactive Link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#FF4D00] font-bold text-lg group/link"
              >
                Learn More
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform duration-300" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}