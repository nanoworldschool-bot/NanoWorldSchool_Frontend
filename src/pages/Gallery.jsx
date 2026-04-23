import React from 'react';
import { motion } from 'framer-motion';

function Gallery() {
  const photos = [
    { src: '/building_exterior.jpeg', title: 'Campus View' },
    { src: '/reception.jpeg', title: 'Reception' },
    { src: '/classroom.jpeg', title: 'Smart Classroom' },
    { src: '/interior_seating.jpeg', title: 'Student Lounge' },
    { src: '/seminar_hall.jpeg', title: 'Seminar Hall' },
    { src: '/branding_wall.jpeg', title: 'Inspiration Wall' },
  ];

  return (
    <main className="gallery-page">
      <section className="contact-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title"
          >
            Campus Life
          </motion.h1>
          <p className="section-subtitle" style={{ color: 'white' }}>
            Capturing the vibrant moments and world-class infrastructure.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="campus-gallery-grid">
            {photos.map((photo, index) => (
              <motion.div 
                key={index} 
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <img src={photo.src} alt={photo.title} />
                <div className="gallery-overlay">
                  <h3>{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
