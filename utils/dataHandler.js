const fs = require('fs').promises;
const path = require('path');
const {
  USERS_FILE,
  ANNOUNCEMENTS_FILE
} = require('../config/config');

module.exports = {
  readUsers: async () => {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Помилка читання користувачів:', error);
      return [];
    }
  },

  writeUsers: async (users) => {
    try {
      await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Помилка запису користувачів:', error);
    }
  },

  readAnnouncements: async () => {
    try {
      const data = await fs.readFile(ANNOUNCEMENTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Помилка читання оголошень:', error);
      return [];
    }
  },

  writeAnnouncements: async (announcements) => {
    try {
      await fs.writeFile(ANNOUNCEMENTS_FILE, JSON.stringify(announcements, null, 2));
    } catch (error) {
      console.error('Помилка запису оголошень:', error);
    }
  }
};