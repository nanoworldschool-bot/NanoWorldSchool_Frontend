import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Mail, Image, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    enquiries: 0,
    gallery: 0,
    pages: 3
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [enqRes, galRes] = await Promise.all([
          axios.get('http://localhost:5000/api/enquiries'),
          axios.get('http://localhost:5000/api/gallery')
        ]);
        setStats({
          enquiries: enqRes.data.length,
          gallery: galRes.data.length,
          pages: 3
        });
      } catch (err) {
        console.error('Stats fetch error:', err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'New Enquiries', value: stats.enquiries, icon: <Mail size={24} />, color: '#D4AF37', link: '/admin/inbox' },
    { title: 'Gallery Images', value: stats.gallery, icon: <Image size={24} />, color: '#1A365D', link: '/admin/gallery' },
    { title: 'Active Pages', value: stats.pages, icon: <FileText size={24} />, color: '#10b981', link: '/admin/pages' },
    { title: 'Total Admins', value: 1, icon: <Users size={24} />, color: '#6366f1', link: '/admin/users' },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2.5rem' }}>Welcome, Admin</h1>
      
      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((stat, i) => (
          <Link key={i} to={stat.link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-premium" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.title}</p>
                  <h2 style={{ fontSize: '2rem', margin: 0 }}>{stat.value}</h2>
                </div>
                <div style={{ padding: '0.8rem', background: `${stat.color}15`, color: stat.color, borderRadius: '12px' }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid-2">
        <div className="card-premium" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>System initialized with MongoDB migration successfully.</p>
        </div>
        <div className="card-premium" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <Link to="/admin/pages" className="btn btn-navy" style={{ justifyContent: 'center' }}>Update Home Page</Link>
            <Link to="/admin/gallery" className="btn" style={{ justifyContent: 'center' }}>Upload Photos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
