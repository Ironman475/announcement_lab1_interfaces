import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, AuthContext } from '../AuthContext';
import * as authService from '../../services/authService';
const mockUser = { name: 'Test User' };
// Mock сервісу авторизації
jest.mock('../../services/authService', () => ({
    login: jest.fn(() => Promise.resolve({ data: { token: 'mock-token' } })),
    getProfile: jest.fn(() => Promise.resolve({ data: { name: 'Test User' } })),
    register: jest.fn(() => Promise.resolve({ data: { token: 'mock-token' } })),
}));

const TestComponent = () => {
    const { user, login, logout, loading } = React.useContext(AuthContext);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {user ? (
                <div>
                    <span>Welcome, {user.name}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <button onClick={() => login('test@example.com', 'password')}>
                    Login
                </button>
            )}
        </div>
    );
};

describe('AuthContext', () => {
    beforeEach(() => {
        const localStorageMock = {
            getItem: jest.fn(() => 'mock-token'), // або null за потреби
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };

        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        });

        jest.clearAllMocks();
    });



    test('should show loading initially', () => {
        authService.getProfile.mockImplementation(() => new Promise(() => { }));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('should login user successfully', async () => {
        const user = userEvent.setup();
        const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };

        // Спочатку токена немає (юзер не залогінений)
        localStorage.getItem.mockReturnValue(null);

        authService.login.mockResolvedValue({ data: { token: 'mock-token' } });
        authService.getProfile.mockResolvedValue({ data: mockUser });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Спочатку кнопка Login має бути в документі
        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        // Клік по Login (починаємо логін)
        await user.click(screen.getByText('Login'));

        // Після логіну має показатися ім'я користувача
        await waitFor(() => {
            expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
        });

        // Перевірка, що токен збережено
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
    });

    test('should logout user', async () => {
        const user = userEvent.setup();
        const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };

        // Моки
        authService.getProfile.mockResolvedValue({ data: mockUser });
        authService.login.mockResolvedValue({ data: { token: 'mock-token' } });

        // Створюємо користувача через клік по Login
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Клік на Login
        await user.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
        });

        // Клік на Logout
        await user.click(screen.getByText('Logout'));

        // Перевірка
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
        expect(screen.queryByText('Welcome, Test User')).not.toBeInTheDocument();
    });
});