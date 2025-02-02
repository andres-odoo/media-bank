import React, { useState, useEffect } from 'react';
import MediaCard from '../components/MediaCard';

function Gallery() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/media');
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const data = await response.json();
      setMediaItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Error loading media items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold mb-6">
            Una biblioteca, millones de maneras de contar tu historia
          </h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 max-w-4xl">
            <div className="flex-1 flex">
              <select className="px-4 py-3 rounded-l-lg border-r bg-white text-gray-700">
                <option>Todas las imágenes</option>
                <option>Videos</option>
              </select>
              <input
                type="text"
                placeholder="Buscar imágenes"
                className="flex-1 px-4 py-3 focus:outline-none text-gray-700"
              />
              <button className="bg-red-500 text-white px-8 py-3 rounded-r-lg hover:bg-red-600">
                Buscar
              </button>
            </div>
            
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <span className="material-icons">file_upload</span>
              Buscar por imagen
            </button>
          </div>

          {/* Trending */}
          <div className="mt-6 text-sm">
            <span className="text-gray-400">Tendencias:</span>
            <span className="ml-2">
              {['feliz cumpleaños', 'gracias', 'fondo', 'felicitaciones'].map((tag, index) => (
                <React.Fragment key={tag}>
                  {index > 0 && <span className="mx-2">•</span>}
                  <a href="#" className="hover:underline">{tag}</a>
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
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
            <p className="text-gray-600">No media items available. Try uploading some!</p>
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

export default Gallery;