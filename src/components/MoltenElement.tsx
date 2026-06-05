import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export default function MoltenElement() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse position to rotation and movement
  const rotateX = useTransform(smoothY, [-500, 500], [15, -15]);
  const rotateY = useTransform(smoothX, [-500, 500], [-15, 15]);
  const translateX = useTransform(smoothX, [-500, 500], [-20, 20]);
  const translateY = useTransform(smoothY, [-500, 500], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          perspective: 1000,
        }}
        className="relative w-[500px] h-[500px]"
      >
        {/* Core Molten Shape */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-br from-[#FF4D00] via-[#FF8A00] to-[#FFD600] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[80px] opacity-30"
        />

        {/* Secondary Flowing Layer */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -10, 0],
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 50% 60% 40% 60%",
              "40% 60% 70% 30% / 40% 50% 60% 50%",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-[#FF8A00]/20 blur-[100px] opacity-20"
        />

        {/* Bright Core Glow */}
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 blur-[60px] rounded-full"
        />

        {/* Floating Particles/Embers */}
        {[...Array(48)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150 - Math.random() * 100, 0],
              x: [0, Math.sin(i) * (30 + Math.random() * 50), 0],
              opacity: [0, 0.4 + Math.random() * 0.4, 0],
              scale: [0, 1 + Math.random(), 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-tr from-[#FF4D00] to-[#FFD600] rounded-full blur-[1px]"
            style={{
              marginLeft: `${(Math.random() - 0.5) * 400}px`,
              marginTop: `${(Math.random() - 0.5) * 400}px`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}