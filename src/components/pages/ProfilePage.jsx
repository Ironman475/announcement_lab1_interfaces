import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from '../../services/authService';
import { Settings } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(user || {});
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(user || {});
  }, [user]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(form);
      setMessage('Профіль оновлено');
      setIsEditing(false);
    } catch (err) {
      setMessage('Помилка оновлення профілю');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Профіль користувача</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>{isEditing ? 'Скасувати' : 'Редагувати'}</span>
            </button>
          </div>

          {message && <p className="text-center text-sm text-green-600 mb-4">{message}</p>}

          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-3 font-medium text-gray-700 bg-gray-50">Ім’я</td>
                <td className="py-3">
                  {isEditing ? (
                    <input
                      name="name"
                      value={form.name || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-medium text-gray-700 bg-gray-50">Email</td>
                <td className="py-3">
                  {isEditing ? (
                    <input
                      name="email"
                      type="email"
                      value={form.email || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-medium text-gray-700 bg-gray-50">Стать</td>
                <td className="py-3">
                  {isEditing ? (
                    <select
                      name="gender"
                      value={form.gender || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="male">Чоловіча</option>
                      <option value="female">Жіноча</option>
                      <option value="other">Інша</option>
                    </select>
                  ) : (
                    {
                      male: 'Чоловіча',
                      female: 'Жіноча',
                      other: 'Інша'
                    }[user.gender] || user.gender
                  )}
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-medium text-gray-700 bg-gray-50">Дата народження</td>
                <td className="py-3">
                  {isEditing ? (
                    <input
                      name="birthDate"
                      type="date"
                      value={form.birthDate || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  ) : (
                    user.birthDate
                  )}
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3 font-medium text-gray-700 bg-gray-50">Тип користувача</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.isAdmin ? 'Адміністратор' : 'Користувач'}
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 font-medium text-gray-700 bg-gray-50">ID</td>
                <td className="py-3 text-gray-500">#{user.id}</td>
              </tr>
            </tbody>
          </table>

          {isEditing && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Зберегти
              </button>
              <button
                onClick={() => {
                  setForm(user);
                  setIsEditing(false);
                  setMessage('');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Скасувати
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
