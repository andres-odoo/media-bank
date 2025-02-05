import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user } = useAuth();
  const [userMedia, setUserMedia] = useState([]);
  const [editingMedia, setEditingMedia] = useState(null);

  useEffect(() => {
    fetchUserMedia();
  }, []);

  const fetchUserMedia = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/media`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserMedia(data);
      }
    } catch (error) {
      console.error('Error fetching user media:', error);
    }
  };

  const handleEdit = (media) => {
    setEditingMedia({ ...media });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/media/${editingMedia.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editingMedia)
      });

      if (response.ok) {
        setEditingMedia(null);
        fetchUserMedia();
      }
    } catch (error) {
      console.error('Error updating media:', error);
    }
  };

  const handleDelete = async (mediaId) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/media/${mediaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchUserMedia();
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Uploads</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userMedia.map((media) => (
          <div key={media.id} className="bg-white rounded-lg shadow-md p-4">
            {media.type === 'video' ? (
              <video
                src={`http://localhost:3000/uploads/${media.filename}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
                controls
              />
            ) : (
              <img
                src={`http://localhost:3000/uploads/${media.filename}`}
                alt={media.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            {editingMedia?.id === media.id ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={editingMedia.title}
                    onChange={(e) => setEditingMedia({...editingMedia, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingMedia.price}
                    onChange={(e) => setEditingMedia({...editingMedia, price: parseFloat(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingMedia(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="font-semibold text-lg">{media.title}</h3>
                <p className="text-gray-600">${media.price.toFixed(2)}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(media)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(media.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;