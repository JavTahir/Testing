import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <div className="max-w-md mx-auto pt-16">
                <div className="bg-white shadow-md rounded-lg p-8">
                  <nav className="mb-8 flex justify-center space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-gray-900"
                      data-testid="login-link"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-600 hover:text-gray-900"
                      data-testid="register-link"
                    >
                      Register
                    </Link>
                  </nav>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Welcome</h1>
                    <p>Please login or register to continue.</p>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/register" element={<AuthForm type="register" />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;