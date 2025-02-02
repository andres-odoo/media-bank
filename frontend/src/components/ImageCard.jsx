import React from 'react';
import { useCart } from '../context/CartContext';

function ImageCard({ image }) {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === image.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={`http://localhost:3000/uploads/${image.filename}`}
        alt={image.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{image.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{image.description}</p>
        <p className="text-gray-800 font-bold mt-2">${image.price.toFixed(2)}</p>
        <button
          onClick={() => !isInCart && addToCart(image)}
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

export default ImageCard;