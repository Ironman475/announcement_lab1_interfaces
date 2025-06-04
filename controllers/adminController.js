const router = require('express').Router();
const { authenticateToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/admin');
const { readUsers, readAnnouncements } = require('../utils/dataHandler');

router.use(authenticateToken);
router.use(requireAdmin);

// Статистика
router.get('/stats', async (req, res) => {
try {
    const users = await readUsers();
    const announcements = await readAnnouncements();
    
    const stats = {
      totalUsers: users.length,
      totalAnnouncements: announcements.length,
      totalLikes: announcements.reduce((sum, ann) => sum + ann.likes.length, 0),
      totalComments: announcements.reduce((sum, ann) => sum + ann.comments.length, 0),
      adminUsers: users.filter(u => u.isAdmin).length,
      categoriesStats: {}
    };
    
    // Статистика по категоріям
    announcements.forEach(ann => {
      if (!stats.categoriesStats[ann.category]) {
        stats.categoriesStats[ann.category] = 0;
      }
      stats.categoriesStats[ann.category]++;
    });
    
    res.json(stats);
    
  } catch (error) {
    console.error('Помилка отримання статистики:', error);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});

module.exports = router;