const router = require('express').Router();
const { authenticateToken } = require('../middleware/auth');
const { readUsers, writeUsers } = require('../utils/dataHandler');

router.use(authenticateToken);

// Отримання профілю
router.get('/profile', async (req, res) => {
    try {
        const users = await readUsers();
        const user = users.find(u => u.id === req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);

    } catch (error) {
        console.error('Помилка отримання профілю:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

// Оновлення профілю
router.put('/profile', async (req, res) => {
    try {
        const { name, email, gender, birthDate } = req.body;
        const users = await readUsers();
        const userIndex = users.findIndex(u => u.id === req.user.id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }

        // Перевірка на унікальність email (якщо змінюється)
        if (email !== users[userIndex].email) {
            if (users.find(u => u.email === email && u.id !== req.user.id)) {
                return res.status(400).json({ error: 'Користувач з таким email вже існує' });
            }
        }

        // Оновлення даних користувача
        users[userIndex] = {
            ...users[userIndex],
            name: name || users[userIndex].name,
            email: email || users[userIndex].email,
            gender: gender || users[userIndex].gender,
            birthDate: birthDate || users[userIndex].birthDate,
            updatedAt: new Date().toISOString()
        };

        await writeUsers(users);

        const { password: _, ...userWithoutPassword } = users[userIndex];
        res.json({
            message: 'Профіль успішно оновлено',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Помилка оновлення профілю:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

module.exports = router;