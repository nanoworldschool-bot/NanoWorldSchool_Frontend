import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Mail, Phone, Trash2, CheckCircle, Loader2, Calendar, FileText, User } from 'lucide-react';
import Skeleton from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

function Inbox() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/enquiries');
      setEnquiries(res.data);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      setEnquiries(enquiries.filter(e => e._id !== id));
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Admin Inbox</h1>
          <p style={{ color: '#64748b' }}>Manage your admission leads and brochure requests</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchEnquiries} 
          className="btn btn-navy" 
          style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Loader2 size={16} className={loading ? 'animate-spin' : ''} />
          Refresh Inbox
        </motion.button>
      </header>

      {loading ? (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {[1, 2, 3].map(i => <Skeleton key={i} height="150px" borderRadius="24px" />)}
        </div>
      ) : enquiries.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: '6rem 2rem', background: 'white', borderRadius: '32px', boxShadow: 'var(--shadow-premium)' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Mail size={32} style={{ color: '#94a3b8' }} />
          </div>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Your inbox is empty</h2>
          <p style={{ color: '#64748b' }}>When parents submit forms on the website, they will appear here.</p>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <AnimatePresence>
            {enquiries.map((enquiry, index) => (
              <motion.div 
                key={enquiry._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="card-premium" 
                style={{ 
                  padding: '2rem', 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                {/* Type Badge */}
                <div style={{ position: 'absolute', top: 0, left: 0, padding: '0.4rem 1.2rem', background: enquiry.type === 'brochure' ? 'var(--color-gold)' : 'var(--color-primary)', color: 'white', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', borderRadius: '0 0 12px 0', letterSpacing: '0.05em' }}>
                  {enquiry.type === 'brochure' ? 'Brochure Request' : 'Admission Inquiry'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--color-light-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                      <User size={24} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--color-primary)' }}>{enquiry.name}</h3>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.3rem', fontSize: '0.85rem', color: '#64748b' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {formatDate(enquiry.createdAt)}</span>
                        {enquiry.grade && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FileText size={14} /> Grade {enquiry.grade}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      href={`mailto:${enquiry.email}`} 
                      style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}
                    >
                      <Mail size={18} />
                    </motion.a>
                    <motion.button 
                      whileHover={{ scale: 1.1, background: '#fee2e2', color: '#ef4444' }}
                      onClick={() => deleteEnquiry(enquiry._id)}
                      style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '0.3rem' }}>Email Address</div>
                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{enquiry.email}</div>
                  </div>
                  <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '0.3rem' }}>Phone Number</div>
                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{enquiry.phone}</div>
                  </div>
                </div>

                {enquiry.message && (
                  <div style={{ padding: '1.2rem', background: 'white', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '0.5rem' }}>Message / Subject</div>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>{enquiry.message || enquiry.subject}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Inbox;

