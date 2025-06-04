import React, { useEffect, useState } from 'react';
import {
  getAnnouncements,
  createAnnouncement,
  reactToAnnouncement
} from '../../services/announcementService';

import useAuth from '../../hooks/useAuth';
import AnnouncementCard from '../Announcement/AnnouncementCard';
import AnnouncementForm from '../Announcement/AnnouncementForm';

import { Plus, Search, Filter } from 'lucide-react';

const AnnouncementsPage = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const categories = ['all', 'Загальне', 'Робота', 'Розваги', 'Навчання', 'Послуги', 'Продаж'];

  const fetchAnnouncements = async () => {
    const { data } = await getAnnouncements();
    setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const filteredList = announcements.filter(ann => {
      const matchesCategory = category === 'all' || ann.category === category;
      const matchesSearch =
        ann.title.toLowerCase().includes(search.toLowerCase()) ||
        ann.content.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFiltered(filteredList);
  }, [search, category, announcements]);

  const handleCreate = async (formData) => {
    await createAnnouncement(formData);
    setShowForm(false);
    await fetchAnnouncements();
  };

  const handleReaction = async (id, type) => {
    await reactToAnnouncement(id, type);
    await fetchAnnouncements();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Оголошення</h1>
          {user?.isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md flex items-center space-x-1 text-sm sm:px-4 sm:py-2 sm:rounded-lg sm:space-x-2 sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Додати</span> {/* Або залишити повний текст для sm: */}
              <span className="hidden sm:inline">оголошення</span>
            </button>

          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full md:w-2/3">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук оголошень..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative w-full md:w-1/3">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'Всі категорії' : cat}</option>
              ))}
            </select>
          </div>
        </div>

        {showForm && (
          <AnnouncementForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        <div className="space-y-6">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-12">
              Немає оголошень за заданими параметрами
            </p>
          ) : (
            filtered.map(announcement => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onReact={handleReaction}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
