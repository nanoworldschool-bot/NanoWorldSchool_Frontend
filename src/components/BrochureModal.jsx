import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import api from '../utils/api';

function BrochureModal({ isOpen, onClose, brochureType }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/enquiries/brochure', { 
        ...formData, 
        brochureType 
      });
      
      setSubmitted(true);
      
      // Trigger actual download after 1 second
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = brochureType === 'Brochure' ? '/SchoolBroucher.pdf' : '/Prospectus.pdf';
        link.download = brochureType === 'Brochure' ? 'SchoolBroucher.pdf' : 'Prospectus.pdf';


        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 3500);

    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 10001, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '2rem' 
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(5, 10, 20, 0.85)', backdropFilter: 'blur(8px)' }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="card-premium"
            style={{ 
              width: '100%', 
              maxWidth: '450px', 
              padding: '3rem', 
              position: 'relative',
              background: 'white'
            }}
          >
            <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <X size={24} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ color: '#16a34a', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle size={64} />
                </div>
                <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Thank You!</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Your download is starting automatically. We will contact you soon with more details.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Download {brochureType}</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Please provide your details to access the official {brochureType.toLowerCase()}.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                  <div className="floating-label-group">
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <label>Parent Full Name</label>
                  </div>

                  <div className="floating-label-group">
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <label>Email Address</label>
                  </div>

                  <div className="floating-label-group">
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <label>Phone Number</label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-navy" 
                    style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Submit & Download</>}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default BrochureModal;
