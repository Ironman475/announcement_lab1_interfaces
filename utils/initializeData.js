const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const {
  DATA_DIR,
  USERS_FILE,
  ANNOUNCEMENTS_FILE
} = require('../config/config');
const { writeUsers, writeAnnouncements } = require('./dataHandler');

module.exports = async function initializeDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize users file
    try {
      await fs.access(USERS_FILE);
    } catch {
      const defaultUsers = [
        {
          id: 1,
          name: 'Адміністратор',
          email: 'admin@example.com',
          password: await bcrypt.hash('admin123', 10),
          gender: 'other',
          birthDate: '1990-01-01',
          isAdmin: true,
          createdAt: new Date().toISOString()
        }
      ];
      await writeUsers(defaultUsers);
    }
    
    // Initialize announcements file
    try {
      await fs.access(ANNOUNCEMENTS_FILE);
    } catch {
      const defaultAnnouncements = [
        {
          id: 1,
          title: 'Відкриття нового кафе',
          content: 'Запрошуємо всіх на відкриття нашого затишного кафе! Знижки 20% на всі напої протягом першого тижня!',
          category: 'Розваги',
          authorId: 1,
          authorName: 'Адміністратор',
          date: '2025-06-01',
          likes: [],
          dislikes: [],
          comments: [],
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Вакансія веб-розробника',
          content: 'Шукаємо талановитого React розробника для роботи в нашій команді. Досвід роботи від 2 років. Офіс у центрі міста, конкурентна зарплата.',
          category: 'Робота',
          authorId: 1,
          authorName: 'Адміністратор',
          date: '2025-05-30',
          likes: [],
          dislikes: [],
          comments: [],
          createdAt: new Date().toISOString()
        }
      ];
      await writeAnnouncements(defaultAnnouncements);
    }
    
    console.log('Файли даних ініціалізовано');
  } catch (error) {
    console.error('Помилка ініціалізації файлів:', error);
    throw error;
  }
};