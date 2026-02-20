import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import RegexTester from '@/app/tools/regex-tester/page';

describe('Regex Tester', () => {
  it('renders the tool', () => {
    renderWithLocale(<RegexTester />);
    expect(screen.getByPlaceholderText('[a-z]+')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text to test against...')).toBeInTheDocument();
  });

  it('matches patterns in real-time', () => {
    renderWithLocale(<RegexTester />);
    const patternInput = screen.getByPlaceholderText('[a-z]+');
    const textInput = screen.getByPlaceholderText('Enter text to test against...');

    fireEvent.change(patternInput, { target: { value: '\\d+' } });
    fireEvent.change(textInput, { target: { value: 'abc 123 def 456' } });

    // Should show matches automatically (real-time)
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();
    expect(screen.getByText(/matches \(2\)/)).toBeInTheDocument();
  });

  it('shows match positions', () => {
    renderWithLocale(<RegexTester />);
    const patternInput = screen.getByPlaceholderText('[a-z]+');
    const textInput = screen.getByPlaceholderText('Enter text to test against...');

    fireEvent.change(patternInput, { target: { value: 'hello' } });
    fireEvent.change(textInput, { target: { value: 'say hello world' } });

    expect(screen.getByText('@4')).toBeInTheDocument(); // match at index 4
  });

  it('shows error for invalid regex', () => {
    renderWithLocale(<RegexTester />);
    const patternInput = screen.getByPlaceholderText('[a-z]+');
    const textInput = screen.getByPlaceholderText('Enter text to test against...');

    fireEvent.change(patternInput, { target: { value: '[invalid' } });
    fireEvent.change(textInput, { target: { value: 'test' } });

    expect(screen.getByText(/Invalid/i)).toBeInTheDocument();
  });

  it('shows "No matches" when pattern does not match', () => {
    renderWithLocale(<RegexTester />);
    const patternInput = screen.getByPlaceholderText('[a-z]+');
    const textInput = screen.getByPlaceholderText('Enter text to test against...');

    fireEvent.change(patternInput, { target: { value: 'xyz' } });
    fireEvent.change(textInput, { target: { value: 'abc def' } });

    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('handles capture groups', () => {
    renderWithLocale(<RegexTester />);
    const patternInput = screen.getByPlaceholderText('[a-z]+');
    const textInput = screen.getByPlaceholderText('Enter text to test against...');

    fireEvent.change(patternInput, { target: { value: '(\\w+)@(\\w+)' } });
    fireEvent.change(textInput, { target: { value: 'user@host' } });

    // Check that groups label is displayed
    expect(screen.getByText(/groups:/)).toBeInTheDocument();
    // Match count
    expect(screen.getByText(/matches \(1\)/)).toBeInTheDocument();
    // The match highlight span should exist with the accent class
    const matchSpans = screen.getAllByText('user@host');
    const highlight = matchSpans.find(el => el.classList.contains('text-accent'));
    expect(highlight).toBeDefined();
  });

  it('clears all fields', () => {
    renderWithLocale(<RegexTester />);
    const patternInput = screen.getByPlaceholderText('[a-z]+') as HTMLInputElement;
    const textInput = screen.getByPlaceholderText('Enter text to test against...') as HTMLTextAreaElement;

    fireEvent.change(patternInput, { target: { value: 'test' } });
    fireEvent.change(textInput, { target: { value: 'test string' } });
    fireEvent.click(screen.getByText('Clear'));

    expect(patternInput.value).toBe('');
    expect(textInput.value).toBe('');
  });
});
