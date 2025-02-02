import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, getTotal, clearCart } = useCart();

  const handlePurchase = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mediaIds: cartItems.map(item => item.id)
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Purchase successful!');
        clearCart();
      }
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('Error processing purchase');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Add some media items to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              {item.type === 'video' ? (
                <video
                  src={`http://localhost:3000/uploads/${item.filename}`}
                  className="w-20 h-20 object-cover rounded"
                  controls
                />
              ) : (
                <img
                  src={`http://localhost:3000/uploads/${item.filename}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <span className="text-sm text-gray-500">{item.type}</span>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${getTotal().toFixed(2)}</span>
        </div>
        <button
          onClick={handlePurchase}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}

export default Cart;