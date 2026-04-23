import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { UserPlus, Shield, Mail, Trash2, Loader2, Key, Calendar, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Editor');
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    try {
      await api.post('/users/invite', { email: inviteEmail, role: inviteRole });
      alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
      setInviteEmail('');
      setInviteRole('Editor');
      fetchUsers();
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to send invitation';
      alert(errorMsg);
    } finally {
      setInviting(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Remove this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const getInitials = (email) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Team Management</h1>
        <p style={{ color: '#64748b' }}>Control administrative access and invite new team members</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
        {/* Left: Invite Form */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-premium"
          style={{ padding: '2.5rem', background: 'white', position: 'sticky', top: '2rem' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
            <UserPlus size={24} />
          </div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Invite Admin</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>Send a secure invitation link to their email address.</p>

          <form onSubmit={handleInvite} style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="floating-label-group">
              <input
                type="email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                required
              />
              <label>Email Address</label>
            </div>
            <div className="floating-label-group">
              <select 
                value={inviteRole} 
                onChange={e => setInviteRole(e.target.value)}
                style={{ width: '100%', padding: '1rem 0', border: 'none', borderBottom: '2px solid var(--color-border)', background: 'transparent' }}
              >
                <option value="Editor">Editor (Content Management)</option>
                <option value="Admin">Admin (User & Settings Management)</option>
                <option value="Viewer">Viewer (Read-only Access)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-navy" disabled={inviting} style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
              {inviting ? <Loader2 className="animate-spin" /> : 'Send Invite'}
            </button>
          </form>
        </motion.section>

        {/* Right: User List */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <Shield size={20} style={{ color: 'var(--color-gold)' }} />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Active Administrators ({users.length})</h3>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[1, 2, 3].map(i => <div key={i} style={{ height: '80px', background: '#f1f5f9', borderRadius: '16px', animation: 'pulse 2s infinite' }} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <AnimatePresence>
                {users.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="card-premium"
                    style={{
                      padding: '1.2rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'white',
                      border: '1px solid rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                      <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: '2px solid rgba(212, 175, 55, 0.3)'
                      }}>
                        {getInitials(user.email)}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, margin: '0 0 0.1rem', color: 'var(--color-primary)', fontSize: '1rem' }}>{user.email}</p>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                            <Key size={12} /> {user.role}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Calendar size={12} /> {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, background: '#fee2e2', color: '#ef4444' }}
                      onClick={() => deleteUser(user._id)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: '#f8fafc',
                        color: '#64748b',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s'
                      }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserManagement;

