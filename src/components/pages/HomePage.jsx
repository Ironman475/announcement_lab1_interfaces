import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, UserPlus, LogIn } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Bell className="w-24 h-24 mx-auto mb-8 text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Канал оголошень
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Ваша платформа для створення та перегляду оголошень. 
            Адміністратори створюють оголошення, користувачі залишають реакції та коментарі.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <UserPlus className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-semibold mb-4">Приєднайтесь</h3>
              <p className="text-gray-600 mb-6">
                Зареєструйтесь, щоб переглядати оголошення та взаємодіяти з ними
              </p>
              <button 
                onClick={() => navigate('/register')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Реєстрація
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <LogIn className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-semibold mb-4">Увійти</h3>
              <p className="text-gray-600 mb-6">
                Вже маєте акаунт? Увійдіть, щоб продовжити
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Вхід
              </button>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/about')}
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              Дізнатись більше про додаток →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
