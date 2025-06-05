import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from '../LoginPage';
import useAuth from '../../../hooks/useAuth';
jest.mock('../../../hooks/useAuth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('LoginPage', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      login: mockLogin,
    });
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByText('Вхід до сайту')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Увійти' })).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({});

    renderWithRouter(<LoginPage />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Увійти' }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('displays error message on login failure', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValue(new Error('Login failed'));

    renderWithRouter(<LoginPage />);

    await user.type(screen.getByLabelText('Email'), 'wrong@example.com');
    await user.type(screen.getByLabelText('Пароль'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: 'Увійти' }));

    await waitFor(() => {
      expect(screen.getByText('Невірний email або пароль')).toBeInTheDocument();
    });
  });

  test('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    await user.click(screen.getByRole('button', { name: 'Увійти' }));

    expect(mockLogin).not.toHaveBeenCalled();
  });
});