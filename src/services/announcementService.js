import api from './api';

export const getAnnouncements = () => api.get('/announcements');
export const createAnnouncement = (data) => api.post('/announcements', data);
export const reactToAnnouncement = (id, type) =>
  api.post(`/announcements/${id}/reaction`, { type });
export const commentOnAnnouncement = (id, content) =>
  api.post(`/announcements/${id}/comments`, { content });
