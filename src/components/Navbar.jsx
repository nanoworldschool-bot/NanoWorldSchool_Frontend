import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, BookOpen, Camera, Info, Phone, GraduationCap } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
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
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="menu-overlay active"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className="menu-close" onClick={closeMenu}><X size={32} /></button>
            <div className="menu-grid">
              <Link to="/about" className="menu-card" onClick={closeMenu}>
                <Info size={32} className="text-gold" />
                <h3>About Us</h3>
                <p>Our Vision & Mission</p>
              </Link>
              <Link to="/academics" className="menu-card" onClick={closeMenu}>
                <BookOpen size={32} className="text-gold" />
                <h3>Academics</h3>
                <p>Modern Pedagogy</p>
              </Link>
              <Link to="/gallery" className="menu-card" onClick={closeMenu}>
                <Camera size={32} className="text-gold" />
                <h3>Campus</h3>
                <p>Virtual Tour</p>
              </Link>
              <Link to="/contact" className="menu-card" onClick={closeMenu}>
                <Phone size={32} className="text-gold" />
                <h3>Admissions</h3>
                <p>Enquire Now</p>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${location.pathname !== '/' ? 'navbar-dark' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="logo" onClick={closeMenu}>
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

          <button className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

