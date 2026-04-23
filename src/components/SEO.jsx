import { useEffect } from 'react';

/**
 * SEO COMPONENT
 * Dynamically updates page metadata for search engines
 */
function SEO({ title, description, keywords }) {
  useEffect(() => {
    // 1. Update Title
    document.title = `${title} | Nano World School`;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Nano World School - Think Deep. Speak Bold. A premium holistic educational institution in Hyderabad.');
    }

    // 3. Update Meta Keywords (Optional)
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'Nano World School, Preschool, Primary School, Hyderabad, Holistic Education');
    }
  }, [title, description, keywords]);

  return null;
}

export default SEO;
