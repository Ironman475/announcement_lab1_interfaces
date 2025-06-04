import React from 'react';
import { Bell, Info, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AboutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Bell className="w-24 h-24 mx-auto text-blue-600 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Канал оголошень</h1>
            <p className="text-xl text-gray-600">Платформа для ефективного обміну інформацією</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Info className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Про додаток</h3>
              <p className="text-gray-600 leading-relaxed">
                Цей сайт дозволяє адміністраторам створювати оголошення, а користувачам — переглядати,
                фільтрувати, залишати реакції і коментарі. Він створений як навчальний проєкт
                з використанням React, Express, Tailwind CSS та файлової бази даних.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <UserCheck className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Можливості</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Реєстрація та авторизація</li>
                <li>• Перегляд і пошук оголошень</li>
                <li>• Фільтрація за категоріями</li>
                <li>• Лайки, дизлайки та коментарі</li>
                <li>• Роль адміністратора</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Технології</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">React</h4>
                <p className="text-sm text-blue-600">Frontend</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">Tailwind CSS</h4>
                <p className="text-sm text-green-600">Стилізація</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">Express</h4>
                <p className="text-sm text-purple-600">Backend</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800">Lucide Icons</h4>
                <p className="text-sm text-orange-600">UI Icons</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate(user ? '/announcements' : '/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {user ? 'Перейти до оголошень' : 'Почати користуватись'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
