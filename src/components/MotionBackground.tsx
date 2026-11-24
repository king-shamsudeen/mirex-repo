import React, { useId } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const PARTICLES: Particle[] = [
  { id: 1, x: '10%', y: '15%', size: 4, duration: 12, delay: 0, opacity: 0.25 },
  { id: 2, x: '25%', y: '60%', size: 6, duration: 16, delay: 2, opacity: 0.2 },
  { id: 3, x: '45%', y: '25%', size: 3, duration: 10, delay: 1, opacity: 0.3 },
  { id: 4, x: '70%', y: '40%', size: 5, duration: 14, delay: 3, opacity: 0.25 },
  { id: 5, x: '85%', y: '75%', size: 4, duration: 18, delay: 0.5, opacity: 0.2 },
  { id: 6, x: '92%', y: '20%', size: 7, duration: 15, delay: 2.5, opacity: 0.15 },
  { id: 7, x: '15%', y: '85%', size: 5, duration: 13, delay: 1.5, opacity: 0.2 },
  { id: 8, x: '60%', y: '80%', size: 3, duration: 11, delay: 4, opacity: 0.3 },
];

export const MotionBackground: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Subtle Luxury Gradient Light Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.2, 0.12],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#DCCBB8]/30 dark:bg-[#B98F77]/10 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.1, 0.18, 0.1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-[#B98F77]/20 dark:bg-[#D4A388]/10 blur-3xl"
      />

      {/* Floating Golden Scent Mist Particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: ['0px', '-40px', '0px'],
            x: ['0px', '20px', '0px'],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          className="absolute rounded-full bg-[#B98F77] dark:bg-[#D4A388] blur-[0.5px]"
        />
      ))}
    </div>
  );
};
