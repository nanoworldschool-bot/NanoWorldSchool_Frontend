import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Save, Loader2, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const DEFAULT_CONTENT = {
  home: {
    heroTitle: 'Nano World School',
    heroSubtitle: 'Think Deep. Speak Bold.',
    heroText: 'Empowering students through experiential learning, holistic development, academics, discipline and world-class educational infrastructure.',
    statsStudents: '500+', statsAwards: '25+', statsPrograms: '15+', statsYears: '18+',
    whyChooseTitle: 'Why Choose Nano World School?',
    whyChooseSubtitle: "We don't just teach; we prepare children for the challenges of the 21st century.",
    aboutTitle: 'Nurturing True Potential',
    aboutSubtitle: 'At Nano World School, we believe in shaping the leaders of tomorrow through an integrated approach to education.',
    academicTitle: 'Academic Excellence',
    academicSubtitle: 'A comprehensive curriculum designed for competitive readiness and holistic growth.',
    virtualTourTitle: 'Experience Nano World School',
    virtualTourSubtitle: 'Take a virtual tour of our vibrant campus and engaging learning environment.',
    campusTitle: 'Campus Highlights',
    campusSubtitle: 'Take a glimpse into our world-class educational environment.',
    exploreTitle: 'Explore Our School',
    exploreSubtitle: 'Everything you need to know about Nano World School',
    admissionsTitle: 'Admissions Open 2026–27',
    admissionsSubtitle: 'Secure a bright future for your child at Nano World School. Join our family of lifelong learners and future leaders.',
    brochureTitle: 'Download Official Brochure',
    brochureSubtitle: 'Get complete details about our curriculum, state-of-the-art facilities, and the simplified admission process for the academic year 2024-25.'
  },
  about: {
    aboutHeroTitle: 'About Our School',
    outcomeTitle: 'THE OUTCOME PROMISE',
    outcomeSubtitle: 'By Class X, every Nano World student will:',
    visionText: 'To nurture the future we have to ready individuals by blending academic excellence, strong values, confident communication, and holistic physical well being, empowering every child to learn deeply, live responsibly, and lead with integrity.',
    missionText1: 'Our mission is to shape every Nano Scholar into a self-assured learner and leader. We blend academic excellence with emotional intelligence, communication mastery, and physical fitness — ensuring that each child grows with both intellect and inner strength.',
    missionText2: 'Through a culture of care, challenge, and character, we prepare students not just to clear exams, but to create their own mark in the world — with humility in success and courage in challenges.',
    qualityText1: 'At Nano World School quality is not a system; it is our spirit. Every classroom conversation, every teacher interaction, and every assessment is designed to bring out the best in your child.',
    qualityText2: "We believe in consistent mentoring, trained faculty, personalized attention, and the thoughtful use of technology to ensure your child's learning journey is joyful, focused, and deeply fulfilling.",
    qualityText3: "We promise you that your child's growth here will be measured not only in ranks and results, but also in resilience, values, and a lifelong love for learning."
  },
  academics: {
    academicsHeroTitle: 'Academic Excellence',
    academicsHeroSubtitle: 'A comprehensive approach to learning that prepares students for the future.',
    philosophyTitle: 'The Nano Philosophy',
    philosophySubtitle: 'Head, Heart, Voice, and Body',
    philosophyText: 'Our educational philosophy ensures balanced development across all dimensions of a child\'s growth.',
    coursesTitle: 'Courses Offered',
    techTitle: 'Tech Based Learning',
    facultyTitle: 'Our Esteemed Faculty',
    facultyText: 'At Nano World School, we believe that a school is only as good as its teachers. Our faculty members are handpicked subject matter experts with years of experience in shaping young minds.',
    pedagogyTitle: 'Modern Pedagogy',
    pedagogyText: 'Our teaching methodology combines traditional wisdom with modern technological advancements to create an optimal learning environment.'
  }
};

const PAGE_CONFIG = {
  home: [
    { id: 'hero', title: 'Hero Section', fields: [{ key: 'heroTitle', label: 'Hero Title', type: 'text' }, { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'text' }, { key: 'heroText', label: 'Hero Text', type: 'textarea' }] },
    { id: 'stats', title: 'Stats Section', fields: [{ key: 'statsStudents', label: 'Students Count', type: 'text' }, { key: 'statsAwards', label: 'Awards Count', type: 'text' }, { key: 'statsPrograms', label: 'Programs Count', type: 'text' }, { key: 'statsYears', label: 'Years Count', type: 'text' }] },
    { id: 'whyChoose', title: 'Why Choose Section', fields: [{ key: 'whyChooseTitle', label: 'Section Title', type: 'text' }, { key: 'whyChooseSubtitle', label: 'Section Subtitle', type: 'textarea' }] },
    { id: 'about', title: 'About Section', fields: [{ key: 'aboutTitle', label: 'Section Title', type: 'text' }, { key: 'aboutSubtitle', label: 'Section Subtitle', type: 'textarea' }] },
    { id: 'academic', title: 'Academic Excellence Hub', fields: [{ key: 'academicTitle', label: 'Section Title', type: 'text' }, { key: 'academicSubtitle', label: 'Section Subtitle', type: 'textarea' }] },
    { id: 'tour', title: 'Virtual Tour Section', fields: [{ key: 'virtualTourTitle', label: 'Section Title', type: 'text' }, { key: 'virtualTourSubtitle', label: 'Section Subtitle', type: 'textarea' }] },
    { id: 'campus', title: 'Campus Highlights Section', fields: [{ key: 'campusTitle', label: 'Section Title', type: 'text' }, { key: 'campusSubtitle', label: 'Section Subtitle', type: 'textarea' }] },
    { id: 'explore', title: 'Explore Our School Section', fields: [{ key: 'exploreTitle', label: 'Section Title', type: 'text' }, { key: 'exploreSubtitle', label: 'Section Subtitle', type: 'textarea' }] },
    { id: 'admissions', title: 'Admissions CTA Section', fields: [{ key: 'admissionsTitle', label: 'Section Title', type: 'text' }, { key: 'admissionsSubtitle', label: 'Section Subtitle', type: 'textarea' }] },
    { id: 'brochure', title: 'Brochure CTA Section', fields: [{ key: 'brochureTitle', label: 'Section Title', type: 'text' }, { key: 'brochureSubtitle', label: 'Section Subtitle', type: 'textarea' }] }
  ],
  about: [
    { id: 'hero', title: 'Hero Section', fields: [{ key: 'aboutHeroTitle', label: 'Hero Title', type: 'text' }] },
    { id: 'outcome', title: 'The Outcome Promise Section', fields: [{ key: 'outcomeTitle', label: 'Section Title', type: 'text' }, { key: 'outcomeSubtitle', label: 'Section Subtitle', type: 'text' }] },
    { id: 'vision', title: 'Vision Section', fields: [{ key: 'visionText', label: 'Vision Description', type: 'textarea' }] },
    { id: 'mission', title: 'Mission Section', fields: [{ key: 'missionText1', label: 'Mission Paragraph 1', type: 'textarea' }, { key: 'missionText2', label: 'Mission Paragraph 2', type: 'textarea' }] },
    { id: 'quality', title: 'Quality Policy Section', fields: [{ key: 'qualityText1', label: 'Quality Paragraph 1', type: 'textarea' }, { key: 'qualityText2', label: 'Quality Paragraph 2', type: 'textarea' }, { key: 'qualityText3', label: 'Quality Paragraph 3', type: 'textarea' }] }
  ],
  academics: [
    { id: 'hero', title: 'Hero Section', fields: [{ key: 'academicsHeroTitle', label: 'Hero Title', type: 'text' }, { key: 'academicsHeroSubtitle', label: 'Hero Subtitle', type: 'text' }] },
    { id: 'philosophy', title: 'Philosophy Section', fields: [{ key: 'philosophyTitle', label: 'Section Title', type: 'text' }, { key: 'philosophySubtitle', label: 'Section Subtitle', type: 'text' }, { key: 'philosophyText', label: 'Description', type: 'textarea' }] },
    { id: 'courses', title: 'Courses Offered Section', fields: [{ key: 'coursesTitle', label: 'Section Title', type: 'text' }] },
    { id: 'tech', title: 'Tech Based Learning Section', fields: [{ key: 'techTitle', label: 'Section Title', type: 'text' }] },
    { id: 'faculty', title: 'Faculty Section', fields: [{ key: 'facultyTitle', label: 'Section Title', type: 'text' }, { key: 'facultyText', label: 'Faculty Description', type: 'textarea' }] },
    { id: 'pedagogy', title: 'Modern Pedagogy Section', fields: [{ key: 'pedagogyTitle', label: 'Section Title', type: 'text' }, { key: 'pedagogyText', label: 'Pedagogy Description', type: 'textarea' }] }
  ]
};

function PageManagement() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    fetchContent();
  }, [selectedPage]);

  const fetchContent = async () => {
    setLoading(true);
    setExpandedSections({});
    try {
      const res = await api.get(`/content/${selectedPage}`);
      const fetchedContent = res.data.content || {};
      setContent({ ...DEFAULT_CONTENT[selectedPage], ...fetchedContent });
    } catch (err) {
      console.error('Fetch error:', err);
      setContent({ ...DEFAULT_CONTENT[selectedPage] });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/content/${selectedPage}`, { content });
      alert('Content updated successfully!');
    } catch (err) {
      alert('Failed to update content.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setContent({ ...content, [key]: value });
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentConfig = PAGE_CONFIG[selectedPage] || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0 }}>Page Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={selectedPage} 
            onChange={(e) => setSelectedPage(e.target.value)}
            className="btn"
            style={{ background: 'white', color: 'black', border: '1px solid #e2e8f0', padding: '0.5rem 1rem' }}
          >
            <option value="home">Home Page</option>
            <option value="about">About Page</option>
            <option value="academics">Academics Page</option>
          </select>
          <button 
            onClick={handleSave} 
            className="btn btn-navy" 
            disabled={saving || !content}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <Loader2 className="animate-spin" size={40} style={{ margin: '0 auto', color: 'var(--color-gold)' }} />
          <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading page content...</p>
        </div>
      ) : content ? (
        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '900px' }}>
          {currentConfig.map((section) => (
            <div key={section.id} className="card-premium" style={{ overflow: 'hidden', padding: 0 }}>
              <div 
                onClick={() => toggleSection(section.id)}
                style={{ 
                  padding: '1.5rem', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: expandedSections[section.id] ? '#f8fafc' : 'white',
                  borderBottom: expandedSections[section.id] ? '1px solid #e2e8f0' : 'none'
                }}
              >
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                  <FileText size={20} className="text-gold" /> 
                  {section.title}
                </h3>
                {expandedSections[section.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections[section.id] && (
                <div style={{ padding: '2rem', display: 'grid', gap: '1.5rem', background: 'white' }}>
                  {section.fields.map((field) => (
                    <div key={field.key} className="floating-label-group">
                      {field.type === 'textarea' ? (
                        <textarea 
                          value={content[field.key] || ''} 
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          rows={4}
                          placeholder={field.label}
                        />
                      ) : (
                        <input 
                          type="text" 
                          value={content[field.key] || ''} 
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          placeholder={field.label}
                        />
                      )}
                      <label>{field.label}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default PageManagement;
