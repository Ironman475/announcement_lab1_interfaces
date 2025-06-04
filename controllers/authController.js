const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { readUsers, writeUsers } = require('../utils/dataHandler');

// Реєстрація
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, gender, birthDate } = req.body;

        // Валідація
        if (!name || !email || !password || !gender || !birthDate) {
            return res.status(400).json({ error: 'Всі поля є обов\'язковими' });
        }

        const users = await readUsers();

        // Перевірка на існуючий email
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Користувач з таким email вже існує' });
        }

        // Хешування пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Створення нового користувача
        const newUser = {
            id: Date.now(),
            name,
            email,
            password: hashedPassword,
            gender,
            birthDate,
            isAdmin: email === 'admin@example.com', // Автоматично надати права адміністратора
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await writeUsers(users);

        // Створення JWT токена
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Відправка відповіді без пароля
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            message: 'Користувача успішно зареєстровано',
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error('Помилка реєстрації:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

// Авторизація
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email та пароль є обов\'язковими' });
        }

        const users = await readUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Невірний email або пароль' });
        }

        // Перевірка пароля
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Невірний email або пароль' });
        }

        // Створення JWT токена
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Відправка відповіді без пароля
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Успішна авторизація',
            user: userWithoutPassword,
            token
        });

    } catch (error) {
        console.error('Помилка авторизації:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

module.exports = router;