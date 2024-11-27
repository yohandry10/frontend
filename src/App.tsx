// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Reports from './pages/Reports';
import MySessions from './pages/MySessions';
import Forum from './pages/Forum';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Match from './pages/Match';
import Notifications from './pages/Notifications';
import EditProfile from './pages/EditProfile'; // Importar el nuevo componente de edición de perfil
import DashboardContent from './pages/DashboardContent';
import Unauthorized from './pages/Unauthorized';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['mentor', 'student']}>
                {/* Layout para las rutas protegidas */}
                <div className="flex">
                  <Sidebar /> {/* Sidebar solo se muestra si se accede a una ruta protegida */}
                  <div className="flex-1 pl-80 bg-gray-100 min-h-screen p-8">
                    <Dashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardContent />} />
            <Route
              path="reports"
              element={
                <ProtectedRoute allowedRoles={['mentor', 'student']}>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="sessions"
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor']}>
                  <MySessions />
                </ProtectedRoute>
              }
            />
            <Route
              path="forum"
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor']}>
                  <Forum />
                </ProtectedRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor']}>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="match"
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor']}>
                  <Match />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-profile"
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor']}>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor']}>
                  <Notifications />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
