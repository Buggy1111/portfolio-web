import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Test component to use the context
const TestComponent = () => {
  const { currentLanguage, changeLanguage, t, isEnglish } = useLanguage();
  
  return (
    <div>
      <div data-testid="current-language">{currentLanguage}</div>
      <div data-testid="is-english">{isEnglish.toString()}</div>
      <div data-testid="translated-text">{t('hero.name')}</div>
      <button onClick={() => changeLanguage('en')}>Switch to English</button>
      <button onClick={() => changeLanguage('cs')}>Switch to Czech</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('provides default Czech language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('cs');
    expect(screen.getByTestId('is-english')).toHaveTextContent('false');
  });

  test('translates text correctly in Czech', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('translated-text')).toHaveTextContent('Michal Bürgermeister');
  });

  test('changes language to English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByText('Switch to English'));
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('is-english')).toHaveTextContent('true');
    expect(screen.getByTestId('translated-text')).toHaveTextContent('Michal Bürgermeister');
  });

  test('changes language back to Czech', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    // Switch to English first
    fireEvent.click(screen.getByText('Switch to English'));
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    
    // Switch back to Czech
    fireEvent.click(screen.getByText('Switch to Czech'));
    expect(screen.getByTestId('current-language')).toHaveTextContent('cs');
    expect(screen.getByTestId('is-english')).toHaveTextContent('false');
  });

  test('saves language preference to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByText('Switch to English'));
    
    expect(setItemSpy).toHaveBeenCalledWith('language', 'en');
  });

  test('updates HTML lang attribute', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByText('Switch to English'));
    
    expect(document.documentElement.lang).toBe('en');
  });

  test('handles nested translation keys', () => {
    const NestedTestComponent = () => {
      const { t } = useLanguage();
      return <div data-testid="nested-text">{t('contact.form.name')}</div>;
    };

    render(
      <LanguageProvider>
        <NestedTestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('nested-text')).toHaveTextContent('Jméno');
  });

  test('returns key when translation not found', () => {
    const MissingTestComponent = () => {
      const { t } = useLanguage();
      return <div data-testid="missing-text">{t('non.existent.key')}</div>;
    };

    render(
      <LanguageProvider>
        <MissingTestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('missing-text')).toHaveTextContent('non.existent.key');
  });

  test('throws error when used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');
    
    consoleError.mockRestore();
  });

  test('translates complex objects like case studies', () => {
    const CaseStudyTestComponent = () => {
      const { t } = useLanguage();
      return <div data-testid="case-study">{t('projects.banka.title')}</div>;
    };

    render(
      <LanguageProvider>
        <CaseStudyTestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('case-study')).toHaveTextContent('Banka aplikace');
  });

  test('handles error translations', () => {
    const ErrorTestComponent = () => {
      const { t } = useLanguage();
      return <div data-testid="error-text">{t('error.title')}</div>;
    };

    render(
      <LanguageProvider>
        <ErrorTestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('error-text')).toHaveTextContent('Něco se pokazilo');
  });
});