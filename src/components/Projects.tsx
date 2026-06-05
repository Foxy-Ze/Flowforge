import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef, memo } from "react";
import { ExternalLink, X, ArrowRight, Image as ImageIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Brightsmile Dental Clinic",
    category: "LOCAL BUSINESS WEBSITE",
    description: "Modern dental clinic focused on patient trust and appointment booking. Clean layout with strong call-to-action sections.",
    image: "/thumbnails/bright-smile.png",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    features: ["Appointment Booking", "Patient Trust", "Clean Layout"],
    liveLink: "https://brightsmile-dental-clinic-sigma.vercel.app/"
  },
  {
    id: 2,
    title: "Inklust Tattoo Studio",
    category: "EDITORIAL & BOOKING",
    description: "A cinematic, vintage magazine-style showcase featuring high contrast editorial layouts & immersive GSAP motion for heritage tattoo studio.",
    image: "/thumbnails/inklust.png",
    tech: ["React", "GSAP", "Vite", "Tailwind CSS"],
    features: ["Vintage magazine aesthetic", "Scroll-Triggered storytelling", "Interactive Booking"],
    liveLink: "https://inklust-studio.vercel.app/"
  },
  {
    id: 3,
    title: "Saffron & Thyme",
    category: "RESTAURANT WEBSITE",
    description: "A cinematic, Awwwards-tier digital environment for a luxury rooftop restaurant. Engineered with a custom preloader and zero-latency scroll.",
    image: "/thumbnails/saffron-thyme.png",
    tech: ["React", "GSAP", "Framer Motion", "Lenis", "Tailwind CSS"],
    features: ["Cinematic Preloader", "Horizontal Scroll-Pinning", "Asymmetrical Grid", "Reservation Engine"],
    liveLink: "https://safffron-thyme.vercel.app/"
  },
  {
    id: 4,
    title: "The Grooming District",
    category: "E-COMMERCE & BOOKING",
    description: "A high-fidelity luxury web experience featuring cinematic scroll sequences, custom parallax galleries, and a brutalist dark-mode design system.",
    image: "/thumbnails/the-grooming-district.png",
    tech: ["React (Vite)", "Tailwind CSS v4", "Gsap & Framer Motion"],
    features: ["Service Booking", "Landing Page", "Loyalty Integration"],
    liveLink: "https://the-grooming-district.vercel.app/"
  }, 
  {
    id: 5,
    title: "Vortex Gear",
    category: "E-COMMERCE & 3D WEBGL",
    description: "A high-end, cinematic product showcase featuring custom-generated 3D hardware assets, advanced hover physics, and Awwwards-level animations.",
    image: "/thumbnails/vortex-gear.png",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    features: ["3D Scroll Physics", "Nano Banana Assets", "Responsive Bento Grid"],
    liveLink: "https://vortex-gear.vercel.app/"
  },
  {
    id: 6,
    title: "Aura Stays",
    category: "HOSPITALITY & BOOKING", 
    description: "A premium digital experience for luxury accommodations, featuring seamless exploration and immersive property showcases.",
    image: "/thumbnails/aura-stays.png",
    tech: ["React", "Tailwind CSS", "Framer Motion"], 
    features: ["Property Showcase", "Dynamic Routing", "Premium UI"],
    liveLink: "https://aura-stays-three.vercel.app/"
  },
  {
    id: 7,
    title: "Forging...",
    category: "IN DEVELOPMENT",
    description: "A new digital experience is currently being forged in the studio. Stay tuned for our next high-performance deployment.",
    image: "/thumbnails/forging.png",
    tech: ["Wonder", "Top Secret"],
    features: ["Top Secret", "Coming Soon", "Under NDA"],
    liveLink: "#"
  }
];

export type Project = typeof projects[0];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void; }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-xl"
      />
      
      {/* Split Layout Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[700px]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image Preview */}
        <div className="w-full md:w-1/2 bg-black p-8 flex items-center justify-center relative border-r border-white/5">
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex items-center justify-center">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-neutral-600 gap-4">
                <ImageIcon size={48} strokeWidth={1} />
                <span className="uppercase tracking-widest text-xs font-bold">Image Placeholder</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
          <span className="text-[#FF4D00] font-bold text-xs uppercase tracking-[0.2em] mb-3">
            {project.category}
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
            {project.title}
          </h3>
          <p className="text-neutral-400 mb-10 text-lg leading-relaxed">
            {project.description}
          </p>

          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-neutral-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-12 flex-grow">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Key Features</h4>
            <ul className="space-y-3">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D00]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          {project.liveLink === "#" ? (
            <button disabled className="w-full py-4 px-6 bg-white/5 text-neutral-500 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-white/5">
              Explore Prototype <ExternalLink size={18} />
            </button>
          ) : (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="block w-full">
              <button className="w-full py-4 px-6 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                Explore Prototype <ExternalLink size={18} />
              </button>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ProjectCarousel = memo(({ onSelectProject }: { onSelectProject: (project: Project) => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative h-screen bg-[#0A0A0A] overflow-hidden flex flex-col justify-center">
      
      {/* ════ Massive Ambient Background Watermark ════ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none z-0">
        <span 
          className="text-[22vw] font-black uppercase tracking-tighter text-transparent opacity-60"
          style={{ 
            WebkitTextStroke: '2px rgba(255,77,0,0.15)', 
            textShadow: '0 0 80px rgba(255,77,0,0.1)' 
          }}
        >
          Flowforge
        </span>
      </div>

      {/* Scroll Track Container */}
      <div ref={trackRef} className="relative z-10 flex items-center h-full w-max flex-nowrap pt-20">
        
        {/* Intro Block (Sticky Left Emulation) */}
        <div className="w-screen md:w-[45vw] flex-shrink-0 px-8 md:px-20 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#FF4D00] font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Design <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF8A00] to-[#FF4D00]">Explorations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-md font-medium leading-relaxed"
          >
            A collection of digital experiences we've forged with passion and precision. Scroll to explore the depth.
          </motion.p>
        </div>

        {/* Uniform Project Cards Feed */}
        <div className="flex gap-12 pr-32 items-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="w-[350px] md:w-[420px] flex-shrink-0 group"
            >
              {/* Image Container (Strict Height) */}
              <div 
                className="w-full h-[320px] md:h-[400px] bg-[#111111] border border-white/5 rounded-2xl overflow-hidden relative mb-8 group-hover:border-[#FF4D00]/30 transition-colors duration-500 flex items-center justify-center cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="flex flex-col items-center text-neutral-700 gap-4 group-hover:scale-105 transition-transform duration-700">
                    <ImageIcon size={40} strokeWidth={1.5} />
                    <span className="uppercase tracking-widest text-[10px] font-bold">Image Placeholder</span>
                  </div>
                )}
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-[#FF4D00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Area (Strict Structure) */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-4">
                   <h3 className="text-2xl font-bold text-white group-hover:text-[#FF4D00] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-neutral-600 font-black text-xl">0{index + 1}</span>
                </div>
                
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 mb-6 h-[40px]">
                  {project.description}
                </p>

                <button 
                  onClick={() => onSelectProject(project)}
                  className="flex items-center gap-3 text-[#FF4D00] font-bold text-sm tracking-widest uppercase hover:text-white transition-colors duration-300 w-fit"
                >
                  Explore prototype <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <ProjectCarousel onSelectProject={setSelectedProject} />
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}