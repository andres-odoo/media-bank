import React, { useState, useEffect } from 'react';
import MediaCard from '../components/MediaCard';

function Videos() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/media?type=video');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setMediaItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Error loading videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Videos</h1>
        
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
            <p className="text-gray-600">No videos available.</p>
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

export default Videos;