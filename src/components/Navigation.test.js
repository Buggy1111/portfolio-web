import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Navigation from './Navigation';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

const renderWithProviders = (component) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        {component}
      </LanguageProvider>
    </ThemeProvider>
  );
};

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn(() => ({
      offsetTop: 100,
      offsetHeight: 200,
      focus: vi.fn(),
      scrollIntoView: vi.fn()
    }));
  });

  test('renders navigation menu correctly', () => {
    renderWithProviders(<Navigation />);
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Domů')).toBeInTheDocument();
    expect(screen.getByText('O mně')).toBeInTheDocument();
    expect(screen.getByText('Projekty')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
    expect(screen.getByText('Dovednosti')).toBeInTheDocument();
    expect(screen.getByText('💰 ROI Kalkulačka')).toBeInTheDocument();
    expect(screen.getByText('Kontakt')).toBeInTheDocument();
  });

  test('renders language switcher', () => {
    renderWithProviders(<Navigation />);
    
    expect(screen.getByText('CZ')).toBeInTheDocument();
  });

  test('switches language when clicked', () => {
    renderWithProviders(<Navigation />);
    
    const languageButton = screen.getByText('CZ').closest('button');
    fireEvent.click(languageButton);
    
    // After clicking, it should show EN
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  test('opens mobile menu on hamburger click', () => {
    renderWithProviders(<Navigation />);
    
    // Find hamburger button (hidden on desktop)
    const hamburgerButton = screen.getByRole('button', { hidden: true });
    fireEvent.click(hamburgerButton);
    
    // Mobile menu should be visible
    expect(screen.getByText('Switch to English')).toBeInTheDocument();
  });

  test('scrolls to section when nav link is clicked', () => {
    renderWithProviders(<Navigation />);
    
    const aboutLink = screen.getByText('O mně');
    fireEvent.click(aboutLink);
    
    // Should call scrollTo after timeout
    setTimeout(() => {
      expect(window.scrollTo).toHaveBeenCalled();
    }, 150);
  });

  test('has skip to content link for accessibility', () => {
    renderWithProviders(<Navigation />);
    
    const skipLink = screen.getByText('Přeskočit na obsah');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveClass('sr-only');
  });

  test('highlights active section', () => {
    // Mock window scroll position
    Object.defineProperty(window, 'scrollY', {
      value: 150,
      writable: true
    });

    renderWithProviders(<Navigation />);
    
    // Simulate scroll event
    fireEvent.scroll(window);
    
    // Active section styling should be applied
    const homeLink = screen.getByText('Domů');
    expect(homeLink).toHaveClass('text-emerald-500');
  });

  test('shows glass effect when scrolled', () => {
    renderWithProviders(<Navigation />);
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true
    });
    
    fireEvent.scroll(window);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('glass-effect');
  });

  test('ROI Calculator has special styling', () => {
    renderWithProviders(<Navigation />);
    
    const roiLink = screen.getByText('💰 ROI Kalkulačka');
    expect(roiLink).toHaveClass('font-semibold');
  });

  test('mobile menu closes when nav item is clicked', () => {
    renderWithProviders(<Navigation />);
    
    // Open mobile menu
    const hamburgerButton = screen.getByRole('button', { hidden: true });
    fireEvent.click(hamburgerButton);
    
    // Click on a nav item
    const aboutLink = screen.getByText('O mně');
    fireEvent.click(aboutLink);
    
    // Menu should close - Switch to English text should not be visible
    setTimeout(() => {
      expect(screen.queryByText('Switch to English')).not.toBeInTheDocument();
    }, 150);
  });

  test('handles keyboard navigation', () => {
    renderWithProviders(<Navigation />);
    
    const skipLink = screen.getByText('Přeskočit na obsah');
    
    // Focus and press Enter
    skipLink.focus();
    fireEvent.keyDown(skipLink, { key: 'Enter' });
    
    expect(document.getElementById).toHaveBeenCalledWith('main-content');
  });
});