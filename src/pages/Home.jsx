import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, BookOpen, Clock, ChevronRight, GraduationCap, Image, Info, Download, FileText } from 'lucide-react';


import SEO from '../components/SEO';
import api from '../utils/api';
import BrochureModal from '../components/BrochureModal';


const containerVariants = {


  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

function Home() {
  const [pageContent, setPageContent] = useState({
    heroTitle: 'Nano World School',
    heroSubtitle: 'Think Deep. Speak Bold.',
    heroText: 'Empowering students through experiential learning, holistic development, and world-class educational infrastructure.'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedType, setSelectedType] = useState('Brochure');

  const openModal = (type) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/home');
        if (res.data && res.data.content) {
          setPageContent(res.data.content);
        }
      } catch (err) {
        console.warn('Using default content');
      }
    };
    fetchContent();
  }, []);


  const stats = [

    { icon: <Users size={32} />, value: '500+', label: 'Students' },
    { icon: <Award size={32} />, value: '25+', label: 'Awards' },
    { icon: <BookOpen size={32} />, value: '15+', label: 'Programs' },
    { icon: <Clock size={32} />, value: '10+', label: 'Years' },
  ];

  const testimonials = [
    { name: 'Mrs. Sharma', role: 'Parent', text: 'Nano World School has transformed my child\'s confidence. The activity-based learning is truly effective.' },
    { name: 'Mr. Rao', role: 'Parent', text: 'Excellent infrastructure and very caring teachers. The smart classrooms make learning fun.' },
    { name: 'Dr. Anita', role: 'Parent', text: 'The focus on public speaking is what sets this school apart. Highly recommended!' },
  ];

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <SEO 
        title="Home" 
        description="Experience world-class education at Nano World School. Focusing on experiential learning, holistic development, and smart educational infrastructure."
      />
      {/* Hero Section */}

      <header className="hero" style={{ overflow: 'hidden', position: 'relative' }}>
        <motion.div 
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <div className="container hero-content">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
          >
            <h1 className="hero-title">{pageContent.heroTitle}</h1>
            <p className="hero-subtitle">{pageContent.heroSubtitle}</p>
            <p className="hero-text">
              {pageContent.heroText}
            </p>
            <div className="hero-buttons">

              <motion.a 
                href="/contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Enquire Now
              </motion.a>
              <motion.a 
                href="#about" 
                className="btn btn-outline"
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="mouse"></div>
          Scroll
        </motion.div>
      </header>

      {/* Stats Section with Staggered Animation */}
      <section className="section bg-navy" style={{ padding: '5rem 0' }}>
        <div className="container">
          <motion.div 
            className="grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={itemVariants}>
                <div className="text-gold" style={{ marginBottom: '1rem' }}>{stat.icon}</div>
                <h2 style={{ color: 'white', fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>{stat.value}</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem' }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section with Side-to-Side Reveal */}
      <section className="section" id="about">
        <div className="container grid-2">
          <motion.div 
            className="about-image"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', boxShadow: 'var(--shadow-premium)' }}>
              <motion.img 
                src="/reception.jpeg" 
                alt="Reception" 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="about-text"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <h2 className="section-title text-left">Nurturing True Potential</h2>
            <p className="section-subtitle text-left" style={{ marginBottom: '2rem' }}>At Nano World School, we believe in shaping the leaders of tomorrow through an integrated approach to education.</p>
            <ul className="about-list">
              {['Experiential Learning', 'Digital Smart Classrooms', 'Activity-Based Curriculum', 'Safe Transportation'].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <ChevronRight size={18} className="text-gold" /> {item}
                </motion.li>
              ))}
            </ul>
            <div style={{ marginTop: '2.5rem' }}>
              <motion.a href="/about" className="btn btn-navy" whileHover={{ x: 5 }}>Discover More</motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore Pages Section */}
      <section className="section bg-light" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <div className="container">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <h2 className="section-title">Explore Our School</h2>
            <p className="section-subtitle">Everything you need to know about Nano World School</p>
          </motion.div>

          <div className="grid-3">
            {[
              { 
                title: 'About Our School', 
                desc: 'Learn about our journey, vision, and the philosophy that makes Nano World School a leader in education.', 
                link: '/about', 
                icon: <Info size={32} />,
                btnText: 'Read More'
              },
              { 
                title: 'Academics', 
                desc: 'Explore our comprehensive curriculum, from activity-based nursery learning to competitive grade 10 coaching.', 
                link: '/academics', 
                icon: <GraduationCap size={32} />,
                btnText: 'View More'
              },
              { 
                title: 'Campus Gallery', 
                desc: 'Take a virtual tour of our state-of-the-art infrastructure, sports facilities, and vibrant student life.', 
                link: '/gallery', 
                icon: <Image size={32} />,
                btnText: 'Explore More'
              }
            ].map((page, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="card-premium"
                style={{ textAlign: 'center', padding: '3rem 2rem' }}
              >
                <div style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  {page.icon}
                </div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>{page.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {page.desc}
                </p>
                <Link 
                  to={page.link} 
                  className="btn btn-navy" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {page.btnText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <h2 className="section-title">Experience Nano World School</h2>
            <p className="section-subtitle">Take a virtual tour of our vibrant campus and engaging learning environment.</p>
          </motion.div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {[
              'https://www.youtube.com/embed/P9GIYNQ9BTE',
              'https://www.youtube.com/embed/iABxTUQKZBg'
            ].map((video, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                style={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-premium)',
                  background: '#000',
                  aspectRatio: '16/9'
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={video}
                  title={`Virtual Tour ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Cards Section with Floating Animation */}
      <section className="section bg-light">
        <div className="container">
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Academic Excellence</h2>
            <p className="section-subtitle">A comprehensive curriculum designed for competitive readiness.</p>
          </motion.div>
          
          <motion.div 
            className="grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ marginTop: '3rem' }}
          >
            {[
              { title: 'Activity-Based', desc: 'Integrated skill development.' },
              { title: 'Co-curricular', desc: 'Coding, robotics, and reasoning.' },
              { title: 'Sports & Arts', desc: 'Physical and creative growth.' },
              { title: 'Smart Tech', desc: 'AI enabled learning environment.' },
            ].map((card, i) => (
              <motion.div 
                key={i} 
                className="card-premium" 
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>

      {/* Admissions CTA Section */}
      <section className="section" style={{ background: '#FFFDF5', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="container">
          <motion.div 
            className="card-premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'white',
              border: '2px solid var(--color-gold)'
            }}
          >
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Admissions Open 2026–27
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
              Secure a bright future for your child at Nano World School. Join our community of lifelong learners and future leaders.
            </p>
            <Link to="/contact" className="btn btn-navy" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
              Enquire Now
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Brochure CTA Section */}
      <section className="section" style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}>

        {/* Decorative Circles */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--color-gold)', opacity: 0.05 }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--color-gold)', opacity: 0.05 }}></div>

        <div className="container">
          <div className="brochure-cta-card">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <FileText size={48} />
              </div>
              <h2 className="brochure-cta-title">
                Download Official Brochure
              </h2>
              <p className="brochure-cta-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                Get complete details about our curriculum, state-of-the-art facilities, and the simplified admission process for the academic year 2024-25.
              </p>


              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button 
                  onClick={() => openModal('Brochure')}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', border: 'none' }}
                >
                  <Download size={20} /> Download Brochure
                </motion.button>
                
                <motion.button 
                  onClick={() => openModal('Prospectus')}
                  className="btn btn-navy"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    padding: '1rem 2.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <Download size={20} /> Download Prospectus
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BrochureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        brochureType={selectedType}
      />

    </motion.main>


  );
}

export default Home;
