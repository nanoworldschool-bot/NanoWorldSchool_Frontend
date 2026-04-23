import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      
      // Store token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-primary)', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium"
        style={{ width: '100%', maxWidth: '400px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Admin Portal</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Secure access to school management</p>
        </div>

        {error && (
          <div style={{ padding: '0.8rem', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="floating-label-group">
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label><Mail size={16} /> Email Address</label>
          </div>

          <div className="floating-label-group">
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label><Lock size={16} /> Password</label>
          </div>

          <button 
            type="submit" 
            className="btn btn-navy" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--color-gold)', textDecoration: 'none' }}>
            Forgot your password?
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
