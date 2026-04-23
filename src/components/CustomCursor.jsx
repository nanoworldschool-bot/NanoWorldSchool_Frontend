import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isHovering ? '60px' : '32px',
        height: isHovering ? '60px' : '32px',
        borderRadius: '50%',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        border: '1px solid var(--color-gold)',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        x: cursorX,
        y: cursorY,
        transition: 'width 0.3s, height 0.3s, background-color 0.3s',
      }}
    >
      <div style={{
        width: '4px',
        height: '4px',
        backgroundColor: 'var(--color-gold)',
        borderRadius: '50%',
      }} />
    </motion.div>
  );
}

export default CustomCursor;
