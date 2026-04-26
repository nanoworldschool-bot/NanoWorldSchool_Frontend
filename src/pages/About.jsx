import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Gem } from 'lucide-react';
import SEO from '../components/SEO';

function About() {
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
          <motion.div 
            className="outcome-promise-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="outcome-title">THE OUTCOME PROMISE</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
              By Class X, every Nano World student will:
            </p>
            <ul className="outcome-list">
              <li>Master concepts with depth, clarity, and a spirit of curiosity.</li>
              <li>Communicate fluently, confidently, and respectfully in every situation.</li>
              <li>Live with empathy, gratitude, discipline, and emotional resilience.</li>
              <li>Build strong physical fitness, stamina, and healthy lifelong habits.</li>
              <li>Be fully prepared for competitive exams and equally ready for life beyond school.</li>
            </ul>

            <div className="outcome-commitment">
              <p>This is a commitment from the Nano World School Management.</p>
              <div className="outcome-confidence">
                <p>
                  Parents can have complete confidence on Nano World School that we stand by 
                  every child, every step of the way — guiding, nurturing, and shaping them with the highest standards of academics, values, life skills, and well-being.
                </p>
              </div>
            </div>

            <div className="outcome-footer">
              <div className="powered-by">Powered by Nano Eduventures</div>
              <div className="school-sign-off">
                — Nano World School <span className="school-motto">| Think Deep. Speak Bold.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="core-identity-section">
        <div className="container">
          <div className="core-identity-list">
            {/* Vision */}
            <motion.div 
              className="core-identity-item"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="core-identity-icon-wrapper">
                <Target />
              </div>
              <div className="core-identity-content">
                <h2>Vision</h2>
                <p>
                  To nurture the future we have to ready individuals by blending academic excellence, 
                  strong values, confident communication, and holistic physical well being, 
                  empowering every child to learn deeply, live responsibly, and lead with integrity.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div 
              className="core-identity-item"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="core-identity-icon-wrapper">
                <Eye />
              </div>
              <div className="core-identity-content">
                <h2>Mission</h2>
                <p>
                  Our mission is to shape every Nano Scholar into a self-assured learner and leader. 
                  We blend academic excellence with emotional intelligence, communication mastery, 
                  and physical fitness — ensuring that each child grows with both intellect and inner strength.
                </p>
                <p>
                  Through a culture of care, challenge, and character, we prepare students not just to clear exams, 
                  but to create their own mark in the world — with humility in success and courage in challenges.
                </p>
              </div>
            </motion.div>

            {/* Quality Policy */}
            <motion.div 
              className="core-identity-item"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="core-identity-icon-wrapper">
                <Gem />
              </div>
              <div className="core-identity-content">
                <h2>Quality Policy</h2>
                <p>
                  At Nano World School quality is not a system; it is our spirit. Every classroom conversation, 
                  every teacher interaction, and every assessment is designed to bring out the best in your child.
                </p>
                <p>
                  We believe in consistent mentoring, trained faculty, personalized attention, 
                  and the thoughtful use of technology to ensure your child's learning journey 
                  is joyful, focused, and deeply fulfilling.
                </p>
                <p>
                  We promise you that your child's growth here will be measured not only in ranks and results, 
                  but also in resilience, values, and a lifelong love for learning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default About;
