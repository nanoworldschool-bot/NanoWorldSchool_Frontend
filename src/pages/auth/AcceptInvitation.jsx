import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import api from '../../utils/api';

function AcceptInvitation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    if (!token) {
      setStatus({ ...status, error: 'Invalid or missing invitation token.' });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setStatus({ ...status, error: 'Passwords do not match.' });
    }

    setStatus({ ...status, loading: true, error: '' });
    try {
      await api.post('/users/accept-invitation', {
        token,
        fullName: formData.fullName,
        password: formData.password
      });
      setStatus({ loading: false, success: true, error: '' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.error || 'Failed to set up account. Link may be expired.'
      });
    }
  };

  if (status.success) {
    return (
      <div className="auth-page">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="auth-card text-center"
        >
          <div className="success-icon-wrapper" style={{ margin: '0 auto 2rem' }}>
            <CheckCircle2 size={48} color="var(--color-gold)" />
          </div>
          <h2 className="auth-title">Welcome Aboard!</h2>
          <p className="auth-subtitle">
            Your account has been set up successfully. Redirecting you to login...
          </p>
          <button onClick={() => navigate('/login')} className="btn btn-navy" style={{ width: '100%', marginTop: '1rem' }}>
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
      >
        <div className="auth-header">
          <img src="/logo.jpeg" alt="School Logo" className="auth-logo" />
          <h2 className="auth-title">Complete Setup</h2>
          <p className="auth-subtitle">Join the Nano World School Admin Team</p>
        </div>

        {status.error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="error-message"
          >
            {status.error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="floating-label-group">
            <input 
              type="text" 
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              required 
            />
            <label><User size={16} /> Your Full Name</label>
          </div>

          <div className="floating-label-group">
            <input 
              type="password" 
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required 
            />
            <label><Lock size={16} /> Create Password</label>
          </div>

          <div className="floating-label-group">
            <input 
              type="password" 
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              required 
            />
            <label><Lock size={16} /> Confirm Password</label>
          </div>

          <button 
            type="submit" 
            className="btn btn-navy" 
            disabled={status.loading || !token}
            style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            {status.loading ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle2 size={20} /> Finish Setup</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AcceptInvitation;
