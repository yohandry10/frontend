import React from 'react';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

interface PostProps {
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

export function Post({ author, content, timestamp, likes, comments }: PostProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-3">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-700 font-medium">{author.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-medium text-gray-900">{author.name}</p>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700 whitespace-pre-wrap">{content}</p>
      <div className="mt-4 flex items-center space-x-4">
        <button className="flex items-center text-gray-500 hover:text-purple-600 transition-colors">
          <ThumbsUp className="h-5 w-5 mr-1" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-purple-600 transition-colors">
          <MessageSquare className="h-5 w-5 mr-1" />
          <span>{comments}</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-purple-600 transition-colors">
          <Share2 className="h-5 w-5 mr-1" />
          <span>Compartir</span>
        </button>
      </div>
    </div>
  );
}