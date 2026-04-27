import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, Music, Dumbbell, Palette, BrainCircuit, Brain, Heart, Mic, Activity, MonitorSmartphone } from 'lucide-react';
import SEO from '../components/SEO';
import api from '../utils/api';

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
  const [pageContent, setPageContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/academics');
        if (res.data && res.data.content) {
          setPageContent(res.data.content);
        }
      } catch (err) {
        console.warn('Using default content');
      }
    };
    fetchContent();
  }, []);

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
            {pageContent.academicsHeroTitle || 'Academic Excellence'}
          </motion.h1>
          <p className="section-subtitle" style={{ color: 'white' }}>
            {pageContent.academicsHeroSubtitle || 'A holistic curriculum designed for the 21st-century learner.'}
          </p>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="section" style={{ backgroundColor: '#213054', overflow: 'hidden' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <h2 className="section-title text-left" style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
              {pageContent.philosophyTitle || 'Philosophy'}
            </h2>
            <h3 style={{ color: 'white', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
              {pageContent.philosophySubtitle || 'The Balance Between Brilliance and Being'}
            </h3>
            <p style={{ color: 'white', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', opacity: 0.9 }}>
              {pageContent.philosophyText || 'At Nano World School, learning means nurturing the Head, Heart, Voice and Body — developing intellect, empathy, expression, and holistic physical vitality.'}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginTop: '6rem', padding: '0 2rem', flexWrap: 'wrap', gap: '2rem' }}
          >
            {/* Decorative Line (Desktop only, via flex layout we might just hide it on small screens but inline style is fine for now) */}
            <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '2px', backgroundColor: 'rgba(255,255,255,0.2)', zIndex: 1, '@media (max-width: 768px)': { display: 'none' } }}></div>
            
            {/* Mind */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', flex: '1 1 150px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#213054', border: '4px solid #16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1rem', boxShadow: '0 0 20px rgba(22, 163, 74, 0.3)' }}>
                <Brain size={48} color="#16a34a" />
              </div>
              <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}>Mind</span>
            </div>

            {/* Heart */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', flex: '1 1 150px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#213054', border: '4px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1rem', boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}>
                <Heart size={48} color="#ef4444" />
              </div>
              <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}>Heart</span>
            </div>

            {/* Voice */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', flex: '1 1 150px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#213054', border: '4px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1rem', boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' }}>
                <Mic size={48} color="#f59e0b" />
              </div>
              <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}>Voice</span>
            </div>

            {/* Body */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', flex: '1 1 150px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#213054', border: '4px solid #fbcfe8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1rem', boxShadow: '0 0 20px rgba(251, 207, 232, 0.3)' }}>
                <Activity size={48} color="#fbcfe8" />
              </div>
              <span style={{ color: '#fbcfe8', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}>Body</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COURSES OFFERED SECTION */}
      <section className="section" style={{ backgroundColor: '#fdfbf7', padding: '0' }}>
        <div style={{ backgroundColor: '#213054', padding: '3rem 0', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div className="container">
            <h2 style={{ color: 'white', fontSize: '2.5rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
              {pageContent.coursesTitle || 'Courses Offered'}
            </h2>
          </div>
        </div>
        <div className="container" style={{ padding: '5rem 2rem' }}>
          <div className="grid-2 align-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 style={{ color: '#213054', fontSize: '2.2rem', marginBottom: '2rem', fontWeight: '800' }}>iNANO (Classes VI to X)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  "Early foundation for Maths, Science, and English.",
                  "Preparation for Olympiads, NTSE, and national level exams.",
                  "Regular worksheets, tests, and revision cycles.",
                  "Integrated curriculum combining best educational practices.",
                  "Focus on communication, values, and mental well being.",
                  "Activities for leadership, creativity, and teamwork.",
                  "Balanced development with physical fitness"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.2rem', color: '#334155', fontSize: '1.15rem', lineHeight: '1.6' }}
                  >
                    <span style={{ color: '#213054', marginRight: '15px', marginTop: '5px', fontSize: '1.5rem', lineHeight: '1' }}>•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', maxWidth: '500px' }}>
                <img src="/inano_students.png" alt="iNANO Students" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TECH BASED LEARNING SECTION */}
      <section className="section" style={{ backgroundColor: '#f6f3e6', padding: '0' }}>
        <div style={{ backgroundColor: '#213054', padding: '3rem 0', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div className="container">
            <h2 style={{ color: 'white', fontSize: '2.5rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
              {pageContent.techTitle || 'Tech Based Learning'}
            </h2>
          </div>
        </div>
        <div className="container" style={{ padding: '5rem 2rem' }}>
          <div className="grid-2 align-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 style={{ color: '#213054', fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>AI enabled learning</h3>
              <p style={{ color: '#475569', fontSize: '1.15rem', marginBottom: '3rem', lineHeight: '1.7' }}>
                NANO's AI enabled scholastic monitor maps student's competence in each subtopic for focusing on optimum practice to enable smart learning.
              </p>

              <h3 style={{ color: '#213054', fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>Myclassroom App</h3>
              <p style={{ color: '#475569', fontSize: '1.15rem', marginBottom: '2rem', lineHeight: '1.7' }}>
                Live and recorded classes, online tests with smart analytics, practice questions, attendance records - all at one place.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center' }}
            >
               <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'inline-block', maxWidth: '400px' }}>
                 <img src="/app.jpeg" alt="Myclassroom App" style={{ width: '100%', height: 'auto', display: 'block' }} />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FACULTY SECTION */}
      <section className="section" style={{ backgroundColor: '#fdfbf7', padding: '0' }}>
        <div className="grid-2" style={{ minHeight: '500px', display: 'flex', flexWrap: 'wrap' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ backgroundColor: '#213054', padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: '1 1 500px' }}
          >
            <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {pageContent.facultyTitle || 'Faculty'}
            </h2>
            <p style={{ color: 'white', fontSize: '1.3rem', marginBottom: '1.5rem', lineHeight: '1.6', opacity: 0.9 }}>
              {pageContent.facultyText || 'At Nano World School, our greatest strength is our faculty. They are the people who shape every child\'s growth with dedication and care.'}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ flex: '1 1 500px', backgroundColor: '#e2e8f0', backgroundImage: 'url("https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '400px' }}
          >
          </motion.div>
        </div>

        <div className="container" style={{ padding: '6rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { title: "Eminent Alumni from Top Institutions", desc: "Our teachers come from leading universities and prestigious colleges. They bring academic excellence, strong fundamentals, and deep subject mastery." },
              { title: "Clear and Effective Teaching", desc: "Every teacher explains concepts with clarity, connects with students naturally, and helps them understand even the most difficult topics with ease." },
              { title: "Deep Subject Knowledge", desc: "With years of experience and continuous training, our faculty stay ahead of the curve. They ensure students learn with depth, accuracy, and confidence." },
              { title: "Passionate, Caring, and Approachable", desc: "Our teachers are not only subject experts. They are mentors who listen, guide, motivate, and support students with genuine care." },
              { title: "Committed to Every Child's Success", desc: "In academics, life skills, values, and emotional well being, our faculty take personal responsibility for each student's progress and growth." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h4 style={{ color: '#213054', fontSize: '1.4rem', marginBottom: '0.8rem', fontWeight: 'bold' }}>{item.title}</h4>
                <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: '1.7' }}>{item.desc}</p>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginTop: '2rem', padding: '3rem', backgroundColor: '#213054', borderRadius: '16px', boxShadow: '0 20px 40px rgba(33, 48, 84, 0.2)' }}
            >
              <p style={{ color: 'white', fontSize: '1.3rem', lineHeight: '1.8', margin: 0, fontStyle: 'italic', textAlign: 'center' }}>
                At Nano World School, teaching is not simply a profession.<br/>
                It is a purpose, a passion, and a promise we uphold every day for every child.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* ORIGINAL PILLARS SECTION - Kept for continuity but placed below the new ones */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Other Learning Pillars</h2>
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

      {/* ORIGINAL PEDAGOGY SECTION */}
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
            <h2 className="section-title text-left" style={{ color: 'var(--color-gold)' }}>
              {pageContent.pedagogyTitle || 'Modern Pedagogy'}
            </h2>
            <p style={{ color: 'white', opacity: 0.9 }}>
              {pageContent.pedagogyText || 'Our teaching methodology is rooted in the "Speak Bold" philosophy. We encourage students to voice their opinions, ask questions, and engage in healthy debates.'}
            </p>
            <ul className="about-list" style={{ marginTop: '2rem' }}>
              <li style={{ color: 'white' }}>Smart Boards in every classroom</li>
              <li style={{ color: 'white' }}>Limited student-teacher ratio (15:1)</li>
              <li style={{ color: 'white' }}>Individualized Attention</li>
            </ul>
          </motion.div>
        </div>
      </section>

    </motion.main>
  );
}

export default Academics;
