import React from 'react';
import { useCart } from '../context/CartContext';

function MediaCard({ media }) {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === media.id);
  const isVideo = media.type === 'video';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        {isVideo ? (
          <video
            src={`http://localhost:3000/uploads/${media.filename}`}
            className="w-full h-full object-cover"
            controls
          />
        ) : (
          <img
            src={`http://localhost:3000/uploads/${media.filename}`}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{media.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{media.description}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-800 font-bold">${media.price.toFixed(2)}</p>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
            {media.type}
          </span>
        </div>
        <button
          onClick={() => !isInCart && addToCart(media)}
          className={`mt-3 w-full py-2 px-4 rounded ${
            isInCart
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold`}
          disabled={isInCart}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default MediaCard;