import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Inbox, FileText, Image, Settings, LogOut, Users, Menu, X } from 'lucide-react';

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 992);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Inbox', path: '/admin/inbox', icon: <Inbox size={20} /> },
    { name: 'Page Management', path: '/admin/pages', icon: <FileText size={20} /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <Image size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 992) setIsSidebarOpen(false);
  };

  return (
    <div className="admin-container" style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6', position: 'relative' }}>
      {/* Mobile Header */}
      <header className="admin-mobile-header" style={{ 
        display: window.innerWidth <= 992 ? 'flex' : 'none', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '60px', 
        background: '#0B192C', 
        color: 'white', 
        alignItems: 'center', 
        padding: '0 1rem', 
        zIndex: 100,
        justifyContent: 'space-between'
      }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-gold)' }}>Admin</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: 'white' }}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && window.innerWidth <= 992 && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ 
        width: '280px', 
        background: '#0B192C', 
        color: 'white', 
        padding: '2rem 1rem',
        position: window.innerWidth <= 992 ? 'fixed' : 'sticky',
        top: 0,
        left: isSidebarOpen ? 0 : '-280px',
        height: '100vh',
        zIndex: 1001,
        transition: '0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '3rem', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', margin: 0 }}>Admin Panel</h2>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: 0 }}>Nano World School</p>
          </div>
          {window.innerWidth <= 992 && <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={20} /></button>}
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menuItems.map((item) => (
              <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                <Link 
                  to={item.path}
                  onClick={closeSidebarOnMobile}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '8px',
                    color: location.pathname === item.path ? '#D4AF37' : 'white',
                    background: location.pathname === item.path ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    textDecoration: 'none',
                    transition: '0.3s'
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: 'auto', padding: '1rem' }}>
          <Link to="/" style={{ color: 'white', opacity: 0.6, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <LogOut size={16} /> Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main" style={{ 
        flex: 1, 
        padding: window.innerWidth <= 992 ? '80px 1rem 2rem' : '2rem', 
        overflowY: 'auto',
        maxWidth: '100%'
      }}>
        <div className="admin-content-card" style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: window.innerWidth <= 992 ? '1.5rem' : '2rem', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
          minHeight: 'calc(100vh - 4rem)' 
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
