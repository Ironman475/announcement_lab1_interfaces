const { readUsers } = require('../utils/dataHandler');

module.exports = {
  requireAdmin: async (req, res, next) => {
    try {
      const users = await readUsers();
      const user = users.find(u => u.id === req.user.id);
      
      if (!user || !user.isAdmin) {
        return res.status(403).json({ error: 'Потрібні права адміністратора' });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ error: 'Помилка перевірки прав доступу' });
    }
  }
};