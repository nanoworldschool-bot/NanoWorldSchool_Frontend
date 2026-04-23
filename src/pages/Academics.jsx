import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, Music, Dumbbell, Palette, BrainCircuit } from 'lucide-react';
import SEO from '../components/SEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

function Academics() {
  const programs = [
    { icon: <BookOpen />, title: "Foundation Stage", desc: "Focusing on literacy, numeracy, and social skills through play-based learning." },
    { icon: <BrainCircuit />, title: "Primary Education", desc: "Integrated curriculum with emphasis on conceptual clarity and critical thinking." },
    { icon: <Laptop />, title: "Digital Literacy", desc: "Introduction to technology, coding, and safe internet practices from an early age." },
    { icon: <Dumbbell />, title: "Physical Education", desc: "Structured sports programs to build stamina, teamwork, and leadership." },
    { icon: <Palette />, title: "Visual Arts", desc: "Encouraging self-expression through painting, sculpting, and design." },
    { icon: <Music />, title: "Performing Arts", desc: "Music, dance, and theatre modules to build confidence and stage presence." },
  ];

  return (
    <motion.main 
      className="academics-page"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <SEO 
        title="Academics" 
        description="Explore our holistic academic programs, from foundation stage to primary education, integrated with digital literacy and performing arts."
      />
      <section className="contact-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title"
          >
            Academic Excellence
          </motion.h1>
          <p className="section-subtitle" style={{ color: 'white' }}>
            A holistic curriculum designed for the 21st-century learner.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Our Learning Pillars</h2>
            <p className="section-subtitle">We follow an experiential learning methodology that goes beyond textbooks.</p>
          </div>
          
          <motion.div 
            className="grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {programs.map((prog, index) => (
              <motion.div key={index} variants={itemVariants} className="card-premium" whileHover={{ y: -10 }}>
                <div className="card-icon" style={{ color: 'var(--color-gold)' }}>{prog.icon}</div>
                <h3>{prog.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{prog.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section bg-navy">
        <div className="container grid-2 align-center">
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <img src="/classroom.jpeg" alt="Smart Classroom" />
            </div>
          </motion.div>
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-left" style={{ color: 'var(--color-gold)' }}>Modern Pedagogy</h2>
            <p style={{ color: 'white', opacity: 0.9 }}>Our teaching methodology is rooted in the "Speak Bold" philosophy. We encourage students to voice their opinions, ask questions, and engage in healthy debates.</p>
            <ul className="about-list" style={{ marginTop: '2rem' }}>
              <li style={{ color: 'white' }}>Smart Boards in every classroom</li>
              <li style={{ color: 'white' }}>Low student-teacher ratio (15:1)</li>
              <li style={{ color: 'white' }}>Individualized Attention</li>
              <li style={{ color: 'white' }}>Regular Parent-Teacher Interaction</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}

export default Academics;
