
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
