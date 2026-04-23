import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Upload, Trash2, Image as ImageIcon, Loader2, Plus } from 'lucide-react';

function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 1. Upload to Cloudinary via backend
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = uploadRes.data.url;

      // 2. Save reference to MongoDB
      const saveRes = await api.post('/gallery', {
        url: imageUrl,
        title: file.name,
        category: 'Campus'
      });

      setImages([saveRes.data, ...images]);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0 }}>Gallery Management</h1>
        <label className="btn btn-navy" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {uploading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
          {uploading ? 'Uploading...' : 'Add Image'}
          <input type="file" hidden onChange={handleUpload} accept="image/*" disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {[1, 2, 3, 4].map(i => <div key={i} style={{ height: '200px', background: '#eee', borderRadius: '12px' }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>

          {images.map((img) => (
            <div key={img._id} className="card-premium" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
              <img src={img.url} alt={img.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{img.category}</span>
                <button onClick={() => deleteImage(img._id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryManagement;
