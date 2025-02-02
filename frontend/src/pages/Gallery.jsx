import React, { useState, useEffect } from 'react';
import MediaCard from '../components/MediaCard';

function Gallery() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('all');

  const fetchMedia = async (query = '', type = 'all') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (type !== 'all') params.append('type', type);
      
      const response = await fetch(`http://localhost:3000/api/media?${params}`);
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

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedia(searchQuery, mediaType);
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
          <form onSubmit={handleSearch} className="flex gap-4 max-w-4xl">
            <div className="flex-1 flex">
              <select
                className="px-4 py-3 rounded-l-lg border-r bg-white text-gray-700"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
              >
                <option value="all">Todas las imágenes</option>
                <option value="image">Imágenes</option>
                <option value="video">Videos</option>
              </select>
              <input
                type="text"
                placeholder="Buscar imágenes"
                className="flex-1 px-4 py-3 focus:outline-none text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-red-500 text-white px-8 py-3 rounded-r-lg hover:bg-red-600"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Trending */}
          <div className="mt-6 text-sm">
            <span className="text-gray-400">Tendencias:</span>
            <span className="ml-2">
              {['feliz cumpleaños', 'gracias', 'fondo', 'felicitaciones'].map((tag, index) => (
                <React.Fragment key={tag}>
                  {index > 0 && <span className="mx-2">•</span>}
                  <button 
                    className="hover:underline"
                    onClick={() => {
                      setSearchQuery(tag);
                      fetchMedia(tag, mediaType);
                    }}
                  >
                    {tag}
                  </button>
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