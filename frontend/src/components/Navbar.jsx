import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and main navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-red-500">
              MediaBank
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/images" className="text-gray-600 hover:text-gray-900">
                Imágenes
              </Link>
              <Link to="/videos" className="text-gray-600 hover:text-gray-900">
                Videos
              </Link>
              {user && (
                <Link to="/upload" className="text-gray-600 hover:text-gray-900">
                  Subir
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  {user.name || user.email}
                </Link>
                <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                  Carrito
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;