import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();
        // Merge the backend response with our local profile data
        const mergedData = {
          ...updatedUser,
          phone: profile.phone,
          location: profile.location,
          bio: profile.bio,
        };
        updateUser(mergedData);
        navigate('/profile');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/profile')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Editar Perfil</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {[
          { label: 'Nombre', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Teléfono', name: 'phone', type: 'tel' },
          { label: 'Ubicación', name: 'location' },
          { label: 'Biografía', name: 'bio', multiline: true },
        ].map(({ label, name, type = 'text', multiline }) => (
          <div key={name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            {multiline ? (
              <textarea
                name={name}
                value={profile[name]}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 resize-none"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={profile[name]}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}