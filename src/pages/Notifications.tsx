import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, AlertCircle, Info, MessageCircle, Check, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Tarea completada',
    message: 'Has completado exitosamente el módulo de React Avanzado',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Recordatorio',
    message: 'La entrega del proyecto final es en 3 días',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Nuevo contenido disponible',
    message: 'Se ha añadido una nueva lección sobre TypeScript',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '4',
    type: 'message',
    title: 'Mensaje del mentor',
    message: 'Revisé tu código. ¡Excelente trabajo en la implementación!',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    case 'warning':
      return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    case 'info':
      return <Info className="w-6 h-6 text-blue-500" />;
    case 'message':
      return <MessageCircle className="w-6 h-6 text-purple-500" />;
    default:
      return null;
  }
};

const NotificationCard = ({ 
  notification, 
  onMarkAsRead, 
  onDelete 
}: { 
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
    className={`mb-4 p-4 rounded-xl border ${
      notification.read ? 'bg-white' : 'bg-purple-50'
    } transition-all hover:shadow-md`}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{notification.title}</h3>
        <p className="text-gray-600 mt-1">{notification.message}</p>
        <span className="text-sm text-gray-500 mt-2 block">
          {formatDistanceToNow(notification.timestamp, { 
            addSuffix: true,
            locale: es 
          })}
        </span>
      </div>
      <div className="flex gap-2">
        {!notification.read && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMarkAsRead(notification.id)}
            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
            title="Marcar como leída"
          >
            <Check className="w-5 h-5" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(notification.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          title="Eliminar"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const EmptyState = ({ filterType }: { filterType: 'all' | 'unread' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-12"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    </motion.div>
    <h3 className="text-lg font-medium text-gray-500">
      No hay notificaciones {filterType === 'unread' ? 'sin leer' : ''}
    </h3>
  </motion.div>
);

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Bell className="w-8 h-8 text-purple-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium"
            >
              {notifications.filter(n => !n.read).length} nuevas
            </motion.span>
          </div>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Marcar todas como leídas
            </motion.button>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todas</option>
              <option value="unread">No leídas</option>
            </select>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <EmptyState filterType={filter} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}