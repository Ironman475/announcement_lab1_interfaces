import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogIn, UserPlus, Menu, X } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false); // закриваємо меню після виходу
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Назва */}
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6" />
          <Link to="/" className="text-xl font-bold hover:underline">
            Канал оголошень
          </Link>
        </div>

        {/* Кнопка меню для телефонів */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Меню для десктопу */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/about" className="hover:underline">Про додаток</Link>
              <Link to="/login" className="hover:underline flex items-center space-x-1">
                <LogIn className="w-4 h-4" />
                <span>Вхід</span>
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded flex items-center space-x-1">
                <UserPlus className="w-4 h-4" />
                <span>Реєстрація</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/announcements" className="hover:underline">Оголошення</Link>
              <Link to="/profile" className="hover:underline flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Профіль</span>
              </Link>
              <Link to="/about" className="hover:underline">Про додаток</Link>
              <span className="text-sm">Привіт, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Вихід
              </button>
            </>
          )}
        </div>
      </div>

      {/* Мобільне меню */}
      {isOpen && (
        <div data-testid="mobile-menu" className="md:hidden mt-3 space-y-2 px-4">
          {!user ? (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                to="/about"
                className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white shadow"
              >
                Про додаток
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/login"
                className="block bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded flex items-center space-x-2 text-white shadow"
              >
                <LogIn className="w-4 h-4" />
                <span>Вхід</span>
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/register"
                className="block bg-green-500 hover:bg-green-600 px-4 py-2 rounded flex items-center space-x-2 text-white shadow"
              >
                <UserPlus className="w-4 h-4" />
                <span>Реєстрація</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                to="/announcements"
                className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white shadow"
              >
                Оголошення
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/profile"
                className="block bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded flex items-center space-x-2 text-white shadow"
              >
                <User className="w-4 h-4" />
                <span>Профіль</span>
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/about"
                className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white shadow"
              >
                Про додаток
              </Link>
              <div className="text-white font-medium px-1">Привіт, {user.name}!</div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-left shadow"
              >
                Вихід
              </button>
            </>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navigation;
