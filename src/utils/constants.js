// src/utils/constants.js
export const CATEGORIES = [
  'Всі',
  'Загальне',
  'Робота',
  'Розваги',
  'Навчання',
  'Послуги',
  'Продаж'
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Чоловіча' },
  { value: 'female', label: 'Жіноча' },
  { value: 'other', label: 'Інша' }
];

export const GENDER_TEXT = {
  male: 'Чоловіча',
  female: 'Жіноча',
  other: 'Інша'
};

export const ROUTES = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',
  ABOUT: 'about',
  ANNOUNCEMENTS: 'announcements'
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

export const REACTION_TYPES = {
  LIKE: 'like',
  DISLIKE: 'dislike'
};