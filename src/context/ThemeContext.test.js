import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';

// Test component to use the context
const TestComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-status">{isDark ? 'dark' : 'light'}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    // Reset document.documentElement.classList
    document.documentElement.classList.remove('dark');
    
    // Mock Date
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('sets dark theme during night hours (21:00)', () => {
    // Set time to 21:00 (9 PM)
    const mockDate = new Date();
    mockDate.setHours(21, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('sets light theme during day hours (14:00)', () => {
    // Set time to 14:00 (2 PM)
    const mockDate = new Date();
    mockDate.setHours(14, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('sets dark theme during early morning hours (03:00)', () => {
    // Set time to 03:00 (3 AM)
    const mockDate = new Date();
    mockDate.setHours(3, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('boundary times - 6:00 AM should be light', () => {
    // Set time to 06:00 (6 AM)
    const mockDate = new Date();
    mockDate.setHours(6, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  test('boundary times - 20:00 should be light', () => {
    // Set time to 20:00 (8 PM)
    const mockDate = new Date();
    mockDate.setHours(20, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  test('toggles theme manually', () => {
    // Set time to day hours first
    const mockDate = new Date();
    mockDate.setHours(14, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    
    fireEvent.click(screen.getByText('Toggle Theme'));
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('saves theme to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    // Set time to day hours
    const mockDate = new Date();
    mockDate.setHours(14, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    
    fireEvent.click(screen.getByText('Toggle Theme'));
    
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
  });

  test('automatically checks time every minute', () => {
    // Start with day time
    const mockDate = new Date();
    mockDate.setHours(14, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    
    // Advance time to night
    act(() => {
      mockDate.setHours(22, 0, 0, 0);
      vi.setSystemTime(mockDate);
      vi.advanceTimersByTime(60000); // Advance by 1 minute
    });
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  test('throws error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    consoleError.mockRestore();
  });

  test('updates document class when theme changes', () => {
    // Set time to day hours
    const mockDate = new Date();
    mockDate.setHours(14, 0, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    fireEvent.click(screen.getByText('Toggle Theme'));
    
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    fireEvent.click(screen.getByText('Toggle Theme'));
    
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('handles time transitions correctly', () => {
    // Start at 19:59 (should be light)
    const mockDate = new Date();
    mockDate.setHours(19, 59, 0, 0);
    vi.setSystemTime(mockDate);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    
    // Advance to 20:01 (should still be light)
    act(() => {
      mockDate.setHours(20, 1, 0, 0);
      vi.setSystemTime(mockDate);
      vi.advanceTimersByTime(60000);
    });
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    
    // Advance to 20:01 (should switch to dark)
    act(() => {
      mockDate.setHours(20, 1, 0, 0);
      vi.setSystemTime(mockDate);
      vi.advanceTimersByTime(60000);
    });
    
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });
});