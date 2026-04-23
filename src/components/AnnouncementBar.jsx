import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { Megaphone, X } from 'lucide-react';

function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data && res.data.announcementActive) {
          setAnnouncement(res.data.announcementText);
        }
      } catch (err) {
        console.warn('Failed to fetch announcement');
      }
    };
    fetchAnnouncement();
  }, []);

  useEffect(() => {
    if (isVisible && announcement) {
      document.documentElement.classList.add('has-announcement');
    } else {
      document.documentElement.classList.remove('has-announcement');
    }
    return () => document.documentElement.classList.remove('has-announcement');
  }, [isVisible, announcement]);

  if (!announcement || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        style={{ 
          background: 'var(--color-gold)', 
          color: 'var(--color-primary)',
          padding: '0.6rem 1rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          fontWeight: 700,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8rem',
          zIndex: 1100,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Megaphone size={16} />
        <span>{announcement}</span>
        <button 
          onClick={() => setIsVisible(false)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--color-primary)', 
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            position: 'absolute',
            right: '1rem'
          }}
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default AnnouncementBar;
