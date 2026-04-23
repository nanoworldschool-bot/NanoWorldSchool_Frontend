import React from 'react';
import { motion } from 'framer-motion';

function Skeleton({ width = '100%', height = '100px', borderRadius = '8px', className = '' }) {
  return (
    <motion.div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['100% 0', '-100% 0'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export default Skeleton;
