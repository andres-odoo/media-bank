import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PreviewModal from './PreviewModal';

function MediaCard({ media }) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const inCart = media?.id ? isInCart(media.id) : false;

  const handleCartAction = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (inCart) {
      removeFromCart(media.id);
    } else {
      addToCart(media);
    }
  };

  if (!media) return null;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-100">
      {/* Media Preview */}
      {media.type === 'video' ? (
        <video
          className="w-full h-48 object-cover"
          src={`http://localhost:3000/uploads/${media.filename}`}
        />
      ) : (
        <img
          className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
          src={`http://localhost:3000/uploads/${media.filename}`}
          alt={media.title}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="text-white text-center p-4">
          <h3 className="text-sm font-semibold mb-2">{media.title}</h3>
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleCartAction}
              className={`px-4 py-2 rounded-full text-sm ${inCart && user
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {inCart && user ? 'Remove' : 'Add to Cart'}
            </button>
            <button 
              onClick={() => setShowPreview(true)} 
              className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-800 text-sm">
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Price Tag */}
      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold shadow">
        ${media.price || 0}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        media={media}
      />
    </div>
  );
}

export default MediaCard;