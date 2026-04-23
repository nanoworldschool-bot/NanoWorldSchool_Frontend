import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, BookOpen, Camera, Info, Phone, GraduationCap, Home } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={24} /> },
    { name: 'About', path: '/about', icon: <Info size={24} /> },
    { name: 'Academics', path: '/academics', icon: <BookOpen size={24} /> },
    { name: 'Gallery', path: '/gallery', icon: <Camera size={24} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={24} /> },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="menu-overlay active"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="menu-header">
              <Link to="/" className="logo" onClick={closeMenu}>
                <img src="/logo.jpeg" alt="Nano World School" style={{ height: '50px', borderRadius: '8px' }} />
              </Link>
              <button className="menu-close-btn" onClick={closeMenu}>
                <X size={32} />
              </button>
            </div>

            <div className="menu-content">
              <div className="menu-links-container">
                {navLinks.map((link, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <Link 
                      to={link.path} 
                      className={`menu-link-item ${location.pathname === link.path ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="menu-footer">
                <p>Join the Nano World Family</p>
                <Link to="/contact" className="btn btn-primary" onClick={closeMenu}>Enquire Now</Link>
                <div className="menu-socials">
                  {/* Social icons could go here */}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${location.pathname !== '/' ? 'navbar-dark' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="logo">
            <img src="/logo.jpeg" alt="Nano World School" style={{ borderRadius: '8px' }} />
          </Link>
          
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="nav-cta-wrapper">
              <Link to="/contact" className="btn btn-primary nav-cta">Enquire Now</Link>
            </li>
          </ul>

          <button 
            className={`hamburger-premium ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

