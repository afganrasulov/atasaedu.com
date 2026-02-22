import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  const [error, setError] = useState(false);

  const logoUrl = "https://upload-service-production-dd42.up.railway.app/files/1766848410852-874645202.png";

  if (error) {
    return (
      <div className={`${className} bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg transform rotate-3`}>
        A
      </div>
    );
  }

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="absolute inset-0 bg-blue-400/5 blur-xl rounded-full scale-150 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: {
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          },
          tap: { scale: 0.95 }
        }}
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg"
      >
        <img
          src={logoUrl}
          alt="Atasa Danışmanlık Logo"
          width="128"
          height="40"
          fetchPriority="high"
          className="w-full h-full object-contain filter drop-shadow-sm select-none"
          onError={() => setError(true)}
        />

        <motion.div
          initial={{ left: '-150%', opacity: 0 }}
          animate={{ left: '250%', opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 6,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 top-0 bottom-0 w-2/3 skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10"
        />
      </motion.div>
    </motion.div>
  );
};