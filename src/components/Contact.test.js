import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Contact from './Contact';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  send: vi.fn()
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

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders contact form correctly', () => {
    renderWithProviders(<Contact />);
    
    expect(screen.getByText('Pojďme spolupracovat')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Vaše jméno')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('váš@email.cz')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Vaše zpráva...')).toBeInTheDocument();
    expect(screen.getByText('Odeslat zprávu')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderWithProviders(<Contact />);
    
    const submitButton = screen.getByText('Odeslat zprávu');
    fireEvent.click(submitButton);

    // Form should not submit with empty fields
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Vaše jméno')).toBeInvalid();
    });
  });

  test('validates email format', async () => {
    renderWithProviders(<Contact />);
    
    const nameInput = screen.getByPlaceholderText('Vaše jméno');
    const emailInput = screen.getByPlaceholderText('váš@email.cz');
    const messageInput = screen.getByPlaceholderText('Vaše zpráva...');
    const submitButton = screen.getByText('Odeslat zprávu');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toBeInvalid();
    });
  });

  test('shows success message on successful submission', async () => {
    const emailjs = await import('@emailjs/browser');
    emailjs.send.mockResolvedValue({ status: 200 });

    renderWithProviders(<Contact />);
    
    const nameInput = screen.getByPlaceholderText('Vaše jméno');
    const emailInput = screen.getByPlaceholderText('váš@email.cz');
    const messageInput = screen.getByPlaceholderText('Vaše zpráva...');
    const submitButton = screen.getByText('Odeslat zprávu');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Děkuji za vaši zprávu! Ozvu se vám co nejdříve.')).toBeInTheDocument();
    });
  });

  test('shows error message on failed submission', async () => {
    const emailjs = await import('@emailjs/browser');
    emailjs.send.mockRejectedValue(new Error('Network error'));

    renderWithProviders(<Contact />);
    
    const nameInput = screen.getByPlaceholderText('Vaše jméno');
    const emailInput = screen.getByPlaceholderText('váš@email.cz');
    const messageInput = screen.getByPlaceholderText('Vaše zpráva...');
    const submitButton = screen.getByText('Odeslat zprávu');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Něco se pokazilo/)).toBeInTheDocument();
    });
  });

  test('implements rate limiting', async () => {
    const emailjs = await import('@emailjs/browser');
    emailjs.send.mockResolvedValue({ status: 200 });

    renderWithProviders(<Contact />);
    
    const nameInput = screen.getByPlaceholderText('Vaše jméno');
    const emailInput = screen.getByPlaceholderText('váš@email.cz');
    const messageInput = screen.getByPlaceholderText('Vaše zpráva...');
    const submitButton = screen.getByText('Odeslat zprávu');

    // Fill form
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // First submission
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Děkuji za vaši zprávu! Ozvu se vám co nejdříve.')).toBeInTheDocument();
    });

    // Clear form and try immediate second submission
    fireEvent.change(nameInput, { target: { value: 'Test User 2' } });
    fireEvent.change(emailInput, { target: { value: 'test2@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message 2' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Příliš mnoho požadavků/)).toBeInTheDocument();
    });
  });

  test('displays contact information', () => {
    renderWithProviders(<Contact />);
    
    expect(screen.getByText('developer@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('+420 123 456 789')).toBeInTheDocument();
    expect(screen.getByText('Kamenka, Moravskoslezský kraj')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    renderWithProviders(<Contact />);
    
    const nameInput = screen.getByPlaceholderText('Vaše jméno');
    const emailInput = screen.getByPlaceholderText('váš@email.cz');
    const messageInput = screen.getByPlaceholderText('Vaše zpráva...');

    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(messageInput).toHaveAttribute('required');
  });
});