require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  PORT: process.env.PORT || 5000,
  DATA_DIR: process.env.DATA_DIR || './data',
  USERS_FILE: process.env.USERS_FILE || './data/users.json',
  ANNOUNCEMENTS_FILE: process.env.ANNOUNCEMENTS_FILE || './data/announcements.json'
};