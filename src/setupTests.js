
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for jsdom
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Мок localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Зберігаємо оригінальний window.location
const originalLocation = window.location;

// Створюємо мок location один раз при ініціалізації
const mockLocation = {
  href: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

// Видаляємо location і встановлюємо мок один раз
delete window.location;
window.location = mockLocation;
const originalConsoleError = console.error;
const shownMessages = new Set();

console.error = (...args) => {
  if (
    args.length > 0 &&
    typeof args[0] === 'string' &&
    args[0].includes('Not implemented: navigation')
  ) {
    if (shownMessages.has(args[0])) {
      return;
    }
    shownMessages.add(args[0]);
  }
  originalConsoleError(...args);
};


// Функція для очищення моків між тестами
beforeEach(() => {
  // Очищаємо всі моки перед кожним тестом
  jest.clearAllMocks();
  
  // Скидаємо значення location до початкових
  window.location.href = '';
  window.location.pathname = '/';
  window.location.search = '';
  window.location.hash = '';
});
