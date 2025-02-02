import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
              <Link to="/gallery" className="text-gray-600 hover:text-gray-900">
                Imágenes
              </Link>
              <Link to="/videos" className="text-gray-600 hover:text-gray-900">
                Videos
              </Link>
              <Link to="/upload" className="text-gray-600 hover:text-gray-900">
                Subir
              </Link>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              Iniciar sesión
            </button>
            <button className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;