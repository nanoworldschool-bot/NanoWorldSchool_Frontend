import React, { useState, useEffect } from 'react';
import { Users, Mail, Image, FileText, ChevronRight, ArrowRight, Loader2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';

function Dashboard() {
  const [data, setData] = useState({
    counts: { enquiries: 0, gallery: 0, pages: 0, users: 0 },
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'New Enquiries', value: data.counts.enquiries, icon: <Mail size={24} />, color: '#D4AF37', link: '/admin/inbox' },
    { title: 'Gallery Images', value: data.counts.gallery, icon: <Image size={24} />, color: '#1A365D', link: '/admin/gallery' },
    { title: 'Active Pages', value: data.counts.pages, icon: <FileText size={24} />, color: '#10b981', link: '/admin/pages' },
    { title: 'Total Team', value: data.counts.users, icon: <Users size={24} />, color: '#6366f1', link: '/admin/users' },
  ];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <Loader2 className="animate-spin" size={48} color="var(--color-gold)" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Dashboard Overview</h1>
        <p style={{ color: '#64748b' }}>Real-time metrics and recent activity for Nano World School</p>
      </header>
      
      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((stat, i) => (
          <Link key={i} to={stat.link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="card-premium" 
              style={{ padding: '1.5rem', background: 'white' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>{stat.title}</p>
                  <h2 style={{ fontSize: '2.2rem', margin: 0, fontWeight: 800, color: 'var(--color-primary)' }}>{stat.value}</h2>
                </div>
                <div style={{ padding: '0.8rem', background: `${stat.color}10`, color: stat.color, borderRadius: '14px' }}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid-2" style={{ gap: '2rem' }}>
        {/* Recent Enquiries */}
        <div className="card-premium" style={{ padding: '2.5rem', background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0 }}>Recent Enquiries</h3>
            <Link to="/admin/inbox" style={{ fontSize: '0.85rem', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontWeight: 700 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div style={{ display: 'grid', gap: '1.2rem' }}>
            {data.recentEnquiries.length > 0 ? (
              data.recentEnquiries.map((enq, i) => (
                <div key={enq._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.2rem', borderBottom: i < data.recentEnquiries.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    <Mail size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{enq.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Grade: {enq.grade}</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0' }}>No recent enquiries found.</p>
            )}
          </div>
        </div>

        {/* Quick Actions & Maintenance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card-premium" style={{ padding: '2.5rem', background: 'var(--color-primary)', color: 'white' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-gold)' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Link to="/admin/settings" className="btn btn-primary" style={{ justifyContent: 'center', background: 'var(--color-gold)', color: 'var(--color-primary)', border: 'none' }}>
                System Settings
              </Link>
              <Link to="/admin/gallery" className="btn" style={{ justifyContent: 'center', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                Upload Campus Photos
              </Link>
            </div>
          </div>

          <div className="card-premium" style={{ padding: '2.5rem', background: 'white' }}>
            <h3 style={{ marginBottom: '1rem' }}>System Health</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#ecfdf5', borderRadius: '12px', color: '#065f46' }}>
              <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Database Connected</span>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>Last security audit: Successful</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
