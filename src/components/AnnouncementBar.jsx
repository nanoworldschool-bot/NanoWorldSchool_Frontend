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
        className="announcement-bar"
      >
        <Megaphone size={16} />
        <span className="announcement-text">{announcement}</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="announcement-close"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default AnnouncementBar;
