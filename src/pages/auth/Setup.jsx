import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Setup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/setup', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during setup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--color-primary)',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium"
        style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'rgba(212, 175, 55, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem',
            color: 'var(--color-gold)'
          }}>
            <UserPlus size={30} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', margin: '0 0 0.5rem' }}>Initial Setup</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Create your Super Admin account to get started.</p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            background: '#fee2e2', 
            color: '#dc2626', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="floating-label-group">
            <input 
              type="text" 
              required 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            <label><User size={16} /> Full Name</label>
          </div>

          <div className="floating-label-group">
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <label><Mail size={16} /> Email Address</label>
          </div>

          <div className="floating-label-group">
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <label><Lock size={16} /> Password</label>
          </div>

          <div className="floating-label-group">
            <input 
              type="password" 
              required 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
            <label><Lock size={16} /> Confirm Password</label>
          </div>

          <button 
            type="submit" 
            className="btn btn-navy" 
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'Initialize System'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Setup;
