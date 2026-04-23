import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Shield, Award } from 'lucide-react';
import SEO from '../components/SEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

function About() {
  const values = [
    { icon: <Target className="text-gold" />, title: 'Vision', text: 'To empower students with the skills and confidence to lead in a global society.' },
    { icon: <Heart className="text-gold" />, title: 'Mission', text: 'Providing a nurturing environment that fosters intellectual and personal growth.' },
    { icon: <Shield className="text-gold" />, title: 'Values', text: 'Integrity, excellence, and respect form the core of everything we do.' },
    { icon: <Award className="text-gold" />, title: 'Motto', text: 'Think Deep. Speak Bold.' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="page-wrapper"
    >
      <SEO 
        title="About Us" 
        description="Learn about the vision, mission, and core values of Nano World School. Nurturing true potential through integrated education."
      />
      <section className="contact-header">
        <div className="container">
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            About Our School
          </motion.h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2 align-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title text-left">Founder's Message</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text)' }}>
                "Nano World School was established with a vision to revolutionize the pre-school and primary education landscape. 
                We believe that every child is unique and deserves an environment that celebrates their individuality while 
                providing rigorous academic foundations."
              </p>
              <p style={{ marginTop: '1rem', fontWeight: 600 }}>— Mr. Venkat, Founder</p>
            </motion.div>
            <motion.div 
              className="image-wrapper"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="/building_exterior.jpeg" alt="School Building" className="about-img-real" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <motion.div 
            className="grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v, i) => (
              <motion.div key={i} className="card-premium" variants={itemVariants}>
                <div style={{ marginBottom: '1rem' }}>{v.icon}</div>
                <h3>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{v.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default About;
