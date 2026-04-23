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
        <div className="cookie-consent-container">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="cookie-consent-box"
          >
            <div className="cookie-consent-content">
              <div className="cookie-consent-icon">
                <ShieldCheck size={24} />
              </div>
              <div className="cookie-consent-text">
                <p>
                  <strong>We respect your privacy.</strong> Our site uses cookies to personalize content, analyze traffic, and remember your device for a seamless experience. 
                </p>
              </div>
            </div>
            
            <div className="cookie-consent-actions">
              <button onClick={() => setIsVisible(false)} className="cookie-consent-link">
                Learn More
              </button>
              <button onClick={handleAccept} className="btn btn-primary cookie-consent-btn">
                Accept All Cookies
              </button>
              <button onClick={() => setIsVisible(false)} className="cookie-consent-close">
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
