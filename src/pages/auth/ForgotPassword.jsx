import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // In a real MongoDB auth system, you'd call an API to send a reset link
    setTimeout(() => {
      setMessage('If an account exists with this email, you will receive password reset instructions.');
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
        <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Reset Password</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Enter your email to receive a reset link</p>

        {message ? (
          <div style={{ padding: '1.5rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem' }}>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="floating-label-group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label><Mail size={16} /> Email Address</label>
            </div>

            <button
              type="submit"
              className="btn btn-navy"
              style={{ width: '100%', padding: '1rem' }}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'Send Reset Link'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
