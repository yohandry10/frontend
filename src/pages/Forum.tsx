import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Post } from '../components/forum/Post';
import { CreatePostModal } from '../components/forum/CreatePostModal';
import { PenSquare, Filter, TrendingUp } from 'lucide-react';

interface PostType {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function Forum() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [filter, setFilter] = useState<'recent' | 'trending'>('recent');
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    // Simulated initial posts load
    setPosts([
      {
        id: 1,
        author: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        content: '¡Acabo de terminar una sesión increíble de cálculo! 📚✨',
        timestamp: 'Hace 2 horas',
        likes: 24,
        comments: 8,
      },
      {
        id: 2,
        author: {
          name: 'Michael Chen',
          avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        content: 'Busco compañeros para estudiar física. ¿Alguien se apunta? 🤓',
        timestamp: 'Hace 5 horas',
        likes: 15,
        comments: 12,
      },
    ]);
  }, []);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    const newPost: PostType = {
      id: posts.length + 1,
      author: {
        name: user?.name || 'Usuario Anónimo',
        avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'A'}&background=random`,
      },
      content: newPostContent,
      timestamp: 'Ahora',
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsModalOpen(false);
  };

  const filteredPosts = React.useMemo(() => {
    return filter === 'trending'
      ? [...posts].sort((a, b) => b.likes - a.likes)
      : posts;
  }, [posts, filter]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Foro de Discusión</h1>
          <button
            onClick={() => isAuthenticated ? setIsModalOpen(true) : alert('Por favor inicia sesión para crear un post')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            <PenSquare className="h-5 w-5" />
            <span>Nuevo Post</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('recent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              filter === 'recent'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter className="h-4 w-4" />
            Recientes
          </button>
          <button
            onClick={() => setFilter('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              filter === 'trending'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Tendencias
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={newPostContent}
        onContentChange={setNewPostContent}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}