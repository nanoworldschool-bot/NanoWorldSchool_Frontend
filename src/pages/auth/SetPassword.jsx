import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError('Passwords do not match');
    
    setLoading(true);
    // Placeholder for MongoDB password update logic
    setTimeout(() => {
      alert('Password updated successfully');
      navigate('/login');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-primary)', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium"
        style={{ width: '100%', maxWidth: '400px', padding: '3rem' }}
      >
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Set New Password</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Create a secure password for your account</p>

        {error && (
          <div style={{ padding: '0.8rem', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="floating-label-group">
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label><Lock size={16} /> New Password</label>
          </div>

          <div className="floating-label-group">
            <input 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label><Lock size={16} /> Confirm Password</label>
          </div>

          <button 
            type="submit" 
            className="btn btn-navy" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'Update Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default SetPassword;
