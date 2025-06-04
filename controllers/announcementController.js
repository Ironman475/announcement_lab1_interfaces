const router = require('express').Router();
const { authenticateToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/admin');
const { readAnnouncements, writeAnnouncements } = require('../utils/dataHandler');
const { readUsers } = require('../utils/dataHandler');
// Отримання оголошень
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let announcements = await readAnnouncements();

        // Фільтрація за пошуковим запитом
        if (search) {
            const searchLower = search.toLowerCase();
            announcements = announcements.filter(ann =>
                ann.title.toLowerCase().includes(searchLower) ||
                ann.content.toLowerCase().includes(searchLower)
            );
        }

        // Фільтрація за категорією
        if (category && category !== 'all') {
            announcements = announcements.filter(ann => ann.category === category);
        }

        // Сортування за датою створення (новіші спочатку)
        announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Додавання кількості лайків/дизлайків
        const announcementsWithCounts = announcements.map(ann => ({
            ...ann,
            likesCount: ann.likes.length,
            dislikesCount: ann.dislikes.length,
            commentsCount: ann.comments.length
        }));

        res.json(announcementsWithCounts);

    } catch (error) {
        console.error('Помилка отримання оголошень:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

// Створення оголошення (тільки адмін)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { title, content, category } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({ error: 'Всі поля є обов\'язковими' });
        }

        const users = await readUsers();
        const user = users.find(u => u.id === req.user.id);
        const announcements = await readAnnouncements();

        const newAnnouncement = {
            id: Date.now(),
            title,
            content,
            category,
            authorId: req.user.id,
            authorName: user.name,
            date: new Date().toISOString().split('T')[0],
            likes: [],
            dislikes: [],
            comments: [],
            createdAt: new Date().toISOString()
        };

        announcements.push(newAnnouncement);
        await writeAnnouncements(announcements);

        res.status(201).json({
            message: 'Оголошення успішно створено',
            announcement: {
                ...newAnnouncement,
                likesCount: 0,
                dislikesCount: 0,
                commentsCount: 0
            }
        });

    } catch (error) {
        console.error('Помилка створення оголошення:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

// Реакція на оголошення
router.post('/:id/reaction', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body; // 'like' або 'dislike'

        if (!['like', 'dislike'].includes(type)) {
            return res.status(400).json({ error: 'Недійсний тип реакції' });
        }

        const announcements = await readAnnouncements();
        const announcementIndex = announcements.findIndex(ann => ann.id === parseInt(id));

        if (announcementIndex === -1) {
            return res.status(404).json({ error: 'Оголошення не знайдено' });
        }

        const announcement = announcements[announcementIndex];
        const userId = req.user.id;

        // Видалення попередньої реакції користувача
        announcement.likes = announcement.likes.filter(id => id !== userId);
        announcement.dislikes = announcement.dislikes.filter(id => id !== userId);

        // Додавання нової реакції
        if (type === 'like') {
            announcement.likes.push(userId);
        } else {
            announcement.dislikes.push(userId);
        }

        await writeAnnouncements(announcements);

        res.json({
            message: 'Реакцію додано',
            likesCount: announcement.likes.length,
            dislikesCount: announcement.dislikes.length
        });

    } catch (error) {
        console.error('Помилка додавання реакції:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

// Коментарі
router.post('/:id/comments', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ error: 'Коментар не може бути порожнім' });
        }

        const users = await readUsers();
        const user = users.find(u => u.id === req.user.id);
        const announcements = await readAnnouncements();
        const announcementIndex = announcements.findIndex(ann => ann.id === parseInt(id));

        if (announcementIndex === -1) {
            return res.status(404).json({ error: 'Оголошення не знайдено' });
        }

        const newComment = {
            id: Date.now(),
            content: content.trim(),
            authorId: req.user.id,
            authorName: user.name,
            createdAt: new Date().toISOString()
        };

        announcements[announcementIndex].comments.push(newComment);
        await writeAnnouncements(announcements);

        res.status(201).json({
            message: 'Коментар додано',
            comment: newComment
        });

    } catch (error) {
        console.error('Помилка додавання коментаря:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

module.exports = router;