import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
}

export function CreatePostModal({
  isOpen,
  onClose,
  content,
  onContentChange,
  onSubmit,
}: CreatePostModalProps) {
  const { user } = useContext(AuthContext);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Post</h2>
        
        {/* User info preview */}
        <div className="mb-4 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-700 font-medium">
              {user?.name.charAt(0)}
            </span>
          </div>
          <p className="font-medium text-gray-900">{user?.name}</p>
        </div>

        <textarea
          className="w-full p-3 border rounded-md mb-4 min-h-[120px] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="¿Qué quieres compartir?"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={onSubmit}
            disabled={!content.trim()}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}