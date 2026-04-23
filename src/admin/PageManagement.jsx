import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Loader2, FileText, ChevronRight } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/content';

function PageManagement() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [selectedPage]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/${selectedPage}`);
      setContent(res.data.content);
    } catch (err) {
      console.error('Fetch error:', err);
      // Initialize with default structure if not found
      if (selectedPage === 'home') {
        setContent({
          heroTitle: 'Nano World School',
          heroSubtitle: 'Think Deep. Speak Bold.',
          heroText: 'Empowering students through experiential learning, holistic development, and world-class educational infrastructure.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API_URL}/${selectedPage}`, { content });
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
        <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>
          <section className="card-premium" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} className="text-gold" /> 
              {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Content
            </h3>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {Object.keys(content).map((key) => (
                <div key={key} className="floating-label-group">
                  {key.toLowerCase().includes('text') || key.toLowerCase().includes('desc') ? (
                    <textarea 
                      value={content[key]} 
                      onChange={(e) => handleChange(key, e.target.value)}
                      rows={4}
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={content[key]} 
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  )}
                  <label style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default PageManagement;
