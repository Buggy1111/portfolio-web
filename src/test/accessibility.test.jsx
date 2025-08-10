import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Test wrapper with all providers
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  </BrowserRouter>
);

// Import components to test
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import About from '../components/About';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

describe('Accessibility Tests', () => {
  // Mock ResizeObserver for tests
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Mock matchMedia for reduced motion tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('Hero component should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Hero />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Navigation component should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('About component should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <About />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Contact component should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Projects component should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Projects />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Skills component should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Skills />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Test specific accessibility features
  describe('Keyboard Navigation', () => {
    test('All interactive elements should be focusable', () => {
      const { container } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>
      );

      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('ARIA Labels', () => {
    test('Interactive elements should have proper ARIA labels', () => {
      const { container } = render(
        <TestWrapper>
          <Hero />
        </TestWrapper>
      );

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        const hasAriaLabel = button.hasAttribute('aria-label');
        const hasAriaLabelledby = button.hasAttribute('aria-labelledby');
        const hasTextContent = button.textContent.trim().length > 0;
        
        expect(hasAriaLabel || hasAriaLabelledby || hasTextContent).toBe(true);
      });
    });
  });

  describe('Color Contrast', () => {
    test('Text should have sufficient color contrast', async () => {
      const { container } = render(
        <TestWrapper>
          <About />
        </TestWrapper>
      );

      // Run axe with color-contrast rule specifically
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });
  });

  describe('Form Accessibility', () => {
    test('Form inputs should have proper labels', () => {
      const { container } = render(
        <TestWrapper>
          <Contact />
        </TestWrapper>
      );

      const inputs = container.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        const hasLabel = container.querySelector(`label[for="${input.id}"]`);
        const hasAriaLabel = input.hasAttribute('aria-label');
        const hasAriaLabelledby = input.hasAttribute('aria-labelledby');
        
        expect(hasLabel || hasAriaLabel || hasAriaLabelledby).toBeTruthy();
      });
    });
  });

  describe('Image Accessibility', () => {
    test('Images should have alt text', () => {
      const { container } = render(
        <TestWrapper>
          <Projects />
        </TestWrapper>
      );

      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('Skip Links', () => {
    test('Should have skip link for keyboard users', () => {
      const { container } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>
      );

      const skipLink = container.querySelector('a[href="#main-content"]');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveClass('skip-link');
    });
  });
});