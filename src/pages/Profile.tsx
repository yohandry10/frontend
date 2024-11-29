import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { MapPin, Phone, Mail, User as UserIcon } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      {/* Header con Avatar */}
      <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 h-40 rounded-lg flex items-center justify-center">
        <div className="relative">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User Avatar'}
            className="h-28 w-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Información del Usuario */}
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Nombre de Usuario'}</h1>
        <p className="text-gray-500 mt-2">{user?.bio || 'No se ha proporcionado biografía'}</p>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{user?.email || 'No especificado'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{user?.phone || 'No especificado'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{user?.location || 'No especificado'}</span>
          </div>
        </div>

        <button
          className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          onClick={() => navigate('/edit-profile')}
        >
          <UserIcon className="w-4 h-4" />
          Editar perfil
        </button>
      </div>
    </div>
  );
}