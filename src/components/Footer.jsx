import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import api from '../utils/api';

// Custom Social Icons with official brand colors
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f09433' }} />
        <stop offset="25%" style={{ stopColor: '#e6683c' }} />
        <stop offset="50%" style={{ stopColor: '#dc2743' }} />
        <stop offset="75%" style={{ stopColor: '#cc2366' }} />
        <stop offset="100%" style={{ stopColor: '#bc1888' }} />
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#000000">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

function Footer() {
  const [settings, setSettings] = useState({
    contactEmail: 'info@nanoworldschool.co.in',
    contactPhone: '+91 98765 43210',
    address: 'Nano World School Road, Hyderabad',
    facebookUrl: '#',
    instagramUrl: '#',
    twitterUrl: '#',
    youtubeUrl: '#',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222623!2d78.4347!3d17.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzQ4LjAiTiA3OMKwMjYnMDQuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.warn('Failed to fetch footer settings');
      }
    };
    fetchSettings();
  }, []);
  return (
    <motion.footer 
      className="footer" 
      style={{ background: '#050A14' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <img 
              src="/logo.jpeg" 
              alt="Nano World School Logo" 
              style={{ height: '60px', marginBottom: '1.5rem', borderRadius: '8px' }} 
            />
            <p style={{ marginBottom: '1.5rem' }}>Empowering the leaders of tomorrow through experiential learning and holistic development.</p>

            <div className="footer-social">
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><FacebookIcon /></a>
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><InstagramIcon /></a>
              <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter"><TwitterIcon /></a>
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Youtube"><YoutubeIcon /></a>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/academics">Academics</Link></li>
              <li><Link to="/gallery">Campus Life</Link></li>
              <li><Link to="/contact">Admissions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={18} className="text-gold" />
                <span>{settings.address}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={18} className="text-gold" />
                <a href={`tel:${settings.contactPhone}`}>{settings.contactPhone}</a>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={18} className="text-gold" />
                <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-heading">Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Subscribe to our newsletter for latest updates.</p>
            <form style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="email" 
                placeholder="Email" 
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  color: 'white',
                  width: '100%'
                }} 
              />
              <button className="btn btn-primary" style={{ padding: '0.75rem 1rem', borderRadius: '8px' }}>
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Location Map */}
        <div className="footer-map" style={{ marginTop: '3rem', borderRadius: '16px', overflow: 'hidden', height: '250px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <iframe 
            src={settings.mapEmbedUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0, opacity: 0.8 }} 
            allowFullScreen="" 
            loading="lazy"
            title="School Location Map"
          ></iframe>
        </div>

        <div className="footer-bottom">

          <p>&copy; {new Date().getFullYear()} Nano World School. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
