import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Youtube, Link as LinkIcon } from 'lucide-react';
import api from '../utils/api';

function Contact() {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (err) {
        console.warn('Using default contact info');
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/contact', formData);
      alert('Thank you for your enquiry! Our team will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', grade: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    email: settings?.contactEmail || 'admissions@nanoworldschool.com',
    phone: settings?.contactPhone || '+91 98765 43210',
    address: settings?.address || 'Plot No. 45, Nano World School Road, Hyderabad, 500001',
    mapUrl: settings?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222623!2d78.4347!3d17.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzQ4LjAiTiA3OMKwMjYnMDQuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
  };

  return (
    <motion.main 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="contact-header">
        <div className="container">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hero-title"
          >
            Get In Touch
          </motion.h1>
          <p className="section-subtitle" style={{ color: 'white' }}>
            We're here to answer any questions you may have about our school.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          {/* Contact Information */}
          <motion.div 
            className="contact-info"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="info-card">
              <h2 className="section-title text-left">Visit Us</h2>
              <p className="section-subtitle text-left" style={{ marginBottom: '2.5rem' }}>
                Come and experience our campus first-hand.
              </p>

              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </div>

              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h4>Call Us</h4>
                  <p>{contactInfo.phone}</p>
                </div>
              </div>

              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>{contactInfo.email}</p>
                </div>
              </div>

              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <h4>Office Hours</h4>
                  <p>Monday - Sunday   8:30 AM - 6:30 PM</p>
                </div>
              </div>

              {/* Social Connect */}
              {(settings?.facebookUrl || settings?.instagramUrl || settings?.twitterUrl || settings?.youtubeUrl) && (
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                  <h4 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Follow Our Journey</h4>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {settings?.facebookUrl && (
                      <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="social-icon">
                        <Facebook size={20} />
                      </a>
                    )}
                    {settings?.instagramUrl && (
                      <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="social-icon">
                        <Instagram size={20} />
                      </a>
                    )}
                    {settings?.twitterUrl && (
                      <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="social-icon">
                        <Twitter size={20} />
                      </a>
                    )}
                    {settings?.youtubeUrl && (
                      <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="social-icon">
                        <Youtube size={20} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="map-container">
              <iframe 
                src={contactInfo.mapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="School Location"
              ></iframe>
            </div>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div 
            className="form-premium"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-left">Admission Enquiry</h2>
            <form onSubmit={handleSubmit}>
              <div className="floating-label-group">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Parent/Guardian Name</label>
              </div>

              <div className="floating-label-group">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Email Address</label>
              </div>

              <div className="floating-label-group">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                <label>Phone Number</label>
              </div>

              <div className="floating-label-group">
                <select 
                  name="grade" 
                  value={formData.grade} 
                  onChange={handleChange} 
                  required
                  style={{ width: '100%', padding: '1rem 0', border: 'none', borderBottom: '2px solid var(--color-border)', background: 'transparent', marginBottom: '1rem' }}
                >
                  <option value="" disabled>Select Grade for Admission</option>
                  <option value="grade6-10">Grade 6</option>
                  <option value="grade6-10">Grade 7</option>
                  <option value="grade6-10">Grade 8</option>
                  <option value="grade6-10">Grade 9</option>
                  <option value="grade6-10">Grade 10</option>
                </select>
              </div>

              <div className="floating-label-group">
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="4"></textarea>
                <label>Message / Specific Questions</label>
              </div>

              <button 
                type="submit" 
                className="btn btn-navy" 
                style={{ width: '100%', gap: '0.5rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : <><Send size={20} /> Send Enquiry</>}
              </button>

            </form>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}

export default Contact;

