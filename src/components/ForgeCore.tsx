import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export default function ForgeCore() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-500, 500], [20, -20]);
  const rotateY = useTransform(smoothX, [-500, 500], [-20, 20]);

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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.div
        style={{
          rotateX,
          rotateY,
          perspective: 1200,
        }}
        className="relative w-[600px] h-[600px] flex items-center justify-center"
      >
        {/* Outer Pulsing Ring */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-full h-full border border-[#FF4D00]/20 rounded-full blur-[2px]"
        />

        {/* Inner Molten Core */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            borderRadius: [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "70% 30% 30% 70% / 70% 70% 30% 30%",
              "30% 70% 70% 30% / 30% 30% 70% 70%",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-80 h-80 bg-gradient-to-br from-[#FF4D00] via-[#FF8A00] to-[#FFD600] blur-[60px] opacity-40"
        />

        {/* Central Bright Spot */}
        <motion.div
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-32 h-32 bg-white blur-[40px] rounded-full"
        />

        {/* Orbiting Embers */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              rotate: { duration: 5 + Math.random() * 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: "50%",
              top: "50%",
              transformOrigin: `${150 + Math.random() * 100}px center`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-tr from-[#FF4D00] to-[#FFD600] rounded-full blur-[1px] shadow-[0_0_10px_#FF4D00]" />
          </motion.div>
        ))}

        {/* Floating Vertical Sparks */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            animate={{
              y: [0, -400],
              opacity: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
            className="absolute bottom-0 w-1 h-4 bg-gradient-to-t from-[#FF4D00] to-[#FFD600] rounded-full blur-[1px]"
            style={{
              left: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}