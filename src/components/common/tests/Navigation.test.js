import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation';
import useAuth from '../../../hooks/useAuth';

jest.mock('../../../hooks/useAuth');
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders navigation for unauthenticated user', () => {
    useAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    renderWithRouter(<Navigation />);

    expect(screen.getByText('Канал оголошень')).toBeInTheDocument();
    expect(screen.getByText('Вхід')).toBeInTheDocument();
    expect(screen.getByText('Реєстрація')).toBeInTheDocument();
    expect(screen.getByText('Про додаток')).toBeInTheDocument();
  });

  test('renders navigation for authenticated user', () => {
    const mockUser = { id: 1, name: 'John Doe', isAdmin: false };
    useAuth.mockReturnValue({
      user: mockUser,
      logout: jest.fn(),
    });

    renderWithRouter(<Navigation />);

    expect(screen.getByText('Канал оголошень')).toBeInTheDocument();
    expect(screen.getByText('Оголошення')).toBeInTheDocument();
    expect(screen.getByText('Профіль')).toBeInTheDocument();
    expect(screen.getByText('Привіт, John Doe!')).toBeInTheDocument();
    expect(screen.getByText('Вихід')).toBeInTheDocument();
  });

  test('renders admin-specific elements for admin user', () => {
    const mockAdmin = { id: 1, name: 'Admin User', isAdmin: true };
    useAuth.mockReturnValue({
      user: mockAdmin,
      logout: jest.fn(),
    });

    renderWithRouter(<Navigation />);

    expect(screen.getByText('Привіт, Admin User!')).toBeInTheDocument();
  });

  test('handles mobile menu toggle', async () => {
    const user = userEvent.setup();
    useAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    renderWithRouter(<Navigation />);

    // Перевіряємо, що мобільне меню спочатку не відображається
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

    // Клікаємо на кнопку меню
    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    // Перевіряємо, що мобільне меню тепер відображається
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });
});