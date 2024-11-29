import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send } from 'lucide-react';

const MOCK_CONTACTS = {
  '1': {
    name: 'John Doe',
    role: 'Course Instructor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    status: 'online',
  },
  '2': {
    name: 'Jane Smith',
    role: 'Student Support',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    status: 'offline',
  },
  '3': {
    name: 'Mike Johnson',
    role: 'Technical Support',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    status: 'online',
  },
};

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
}

export default function ChatWindow() {
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const contact = userId ? MOCK_CONTACTS[userId as keyof typeof MOCK_CONTACTS] : null;

  useEffect(() => {
    // Simulate loading previous messages
    setMessages([
      {
        id: '1',
        content: 'Hello! How can I help you today?',
        timestamp: '10:00 AM',
        isSent: false,
      },
    ]);
  }, [userId]);

  const handleSubmit = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'll help you with that right away!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  if (!contact) return <div>Contact not found</div>;

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b bg-purple-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{contact.name}</h2>
            <p className="text-sm text-gray-500">{contact.role}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.isSent
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.isSent ? 'text-purple-200' : 'text-gray-500'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={handleSubmit}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}