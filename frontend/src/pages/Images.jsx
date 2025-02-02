import React, { useState, useEffect } from 'react';
import MediaCard from '../components/MediaCard';

function Images() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/media?type=image');
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setMediaItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Error loading images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Imágenes</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-600">{error}</p>
          </div>
        ) : !mediaItems.length ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No images available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Images;