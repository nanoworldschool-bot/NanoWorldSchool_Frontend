import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Academics from './pages/Academics';
import Gallery from './pages/Gallery';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Inbox from './admin/Inbox';
import GalleryManagement from './admin/GalleryManagement';
import Settings from './admin/Settings';
import UserManagement from './admin/UserManagement';
import PageManagement from './admin/PageManagement';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import SetPassword from './pages/auth/SetPassword';
import AcceptInvitation from './pages/auth/AcceptInvitation';
import Setup from './pages/auth/Setup';
import CookieConsent from './components/CookieConsent';



import './style.css';

import './premium_additions.css';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimationWrapper() {
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = document.querySelectorAll('.fade-up');
    observeElements.forEach(el => observer.observe(el));

    return () => {
      observeElements.forEach(el => observer.unobserve(el));
    };
  }, [location]);

  return null;
}

import AnnouncementBar from './components/AnnouncementBar';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app-container">
        <CookieConsent />
        <ScrollToTop />
        <AnimationWrapper />
        <AppContent />
      </div>
    </Router>
  );
}


function AppContent() {
  const location = useLocation();
  const path = location.pathname;
  
  // Hide header/footer on any administrative or authentication page
  const hideLayout = path.startsWith('/admin') || 
                     path === '/login' || 
                     path === '/setup' ||
                     path === '/forgot-password' ||
                     path === '/set-password' ||
                     path === '/accept-invitation' ||
                     path === '/reset-password';

  return (
    <>
      {!hideLayout && <AnnouncementBar />}
      {!hideLayout && <Navbar />}
      <AppRoutes />
      {!hideLayout && <Footer />}
    </>
  );
}


function AppRoutes() {

  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Routes (Protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="pages" element={<PageManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/accept-invitation" element={<AcceptInvitation />} />
        <Route path="/setup" element={<Setup />} />
      </Routes>



    </AnimatePresence>
  );
}


export default App;

