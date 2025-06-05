import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/announcements');
    } catch (err) {
      setError('Невірний email або пароль');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Вхід до сайту
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Введіть пароль"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Увійти
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
            <p className="font-semibold mb-2">Для тестування:</p>
            <p>Адмін: admin@example.com / admin123</p>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Немає акаунту?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Зареєструватись
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
