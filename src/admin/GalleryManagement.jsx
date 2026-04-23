import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Trash2, Image as ImageIcon, Loader2, Plus, Globe, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [systemAssets, setSystemAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('uploads');

  useEffect(() => {
    fetchImages();
    fetchSystemAssets();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get('/gallery');
      setImages(res.data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemAssets = async () => {
    try {
      const res = await api.get('/gallery/assets');
      setSystemAssets(res.data);
    } catch (err) {
      console.error('Error fetching system assets:', err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = uploadRes.data.url;

      const saveRes = await api.post('/gallery', {
        url: imageUrl,
        title: file.name,
        category: 'Campus'
      });

      setImages([saveRes.data, ...images]);
      setActiveTab('uploads');
    } catch (err) {
      alert('Upload failed. Check backend console.');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      setImages(images.filter(img => img._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Gallery Management</h1>
          <p style={{ color: '#64748b' }}>Manage your school's visual assets and dynamic gallery</p>
        </div>
        <label className="btn btn-navy" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem' }}>
          {uploading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
          {uploading ? 'Uploading...' : 'Add New Photo'}
          <input type="file" hidden onChange={handleUpload} accept="image/*" disabled={uploading} />
        </label>
      </header>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid #e2e8f0' }}>
        {[
          { id: 'uploads', label: 'Cloudinary Uploads', icon: <Globe size={18} /> },
          { id: 'system', label: 'System Assets (Public)', icon: <Database size={18} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 0.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              color: activeTab === tab.id ? 'var(--color-primary)' : '#94a3b8',
              position: 'relative',
              transition: '0.3s'
            }}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeGalleryTab"
                style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '3px', background: 'var(--color-gold)', borderRadius: '3px 3px 0 0' }} 
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card-premium" style={{ height: '280px', background: '#f8fafc', border: '1px dashed #e2e8f0' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {(activeTab === 'uploads' ? images : systemAssets).map((img) => (
                <div key={img._id} className="card-premium" style={{ padding: '0', overflow: 'hidden', position: 'relative', height: 'fit-content' }}>
                  <img src={img.url} alt={img.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{img.category}</span>
                    </div>
                    {activeTab === 'uploads' && (
                      <button 
                        onClick={() => deleteImage(img._id)} 
                        style={{ 
                          color: '#ef4444', 
                          background: 'rgba(239, 68, 68, 0.1)', 
                          border: 'none', 
                          padding: '0.5rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: '0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {(activeTab === 'uploads' ? images : systemAssets).length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0', color: '#94a3b8' }}>
                  <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                  <p>No images found in this collection.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default GalleryManagement;
