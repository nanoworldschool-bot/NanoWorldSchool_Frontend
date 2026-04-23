import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('device-remembered', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          left: 0, 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          zIndex: 10000,
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
              width: '100%',
              maxWidth: '1100px',
              background: 'rgba(5, 10, 20, 0.95)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '24px',
              padding: '1.2rem 2.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem'
            }}
          >

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
            <div style={{ 
              background: 'rgba(212, 175, 55, 0.1)', 
              padding: '0.7rem', 
              borderRadius: '12px', 
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                <strong>We respect your privacy.</strong> Our site uses cookies to personalize content, analyze traffic, and remember your device for a seamless experience. 
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => setIsVisible(false)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'rgba(255,255,255,0.6)', 
                padding: '0.6rem 1rem', 
                fontSize: '0.85rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Learn More
            </button>
            <button 
              onClick={handleAccept}
              className="btn btn-primary"
              style={{ 
                padding: '0.8rem 2rem', 
                borderRadius: '12px', 
                fontSize: '0.9rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              Accept All Cookies
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', marginLeft: '0.5rem' }}
            >
              <X size={20} />
            </button>
          </div>

        </motion.div>
        </div>
      )}
    </AnimatePresence>

  );
}

export default CookieConsent;
