import React, { useState } from 'react';

const AnnouncementForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Загальне',
  });

  const categories = ['Загальне', 'Робота', 'Розваги', 'Навчання', 'Послуги', 'Продаж'];

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.content) {
      onSubmit(form);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Нове оголошення</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Заголовок</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Категорія</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Зміст</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
