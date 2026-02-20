import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import UrlEncode from '@/app/tools/url-encode/page';

describe('URL Encode/Decode', () => {
  it('renders the tool', () => {
    renderWithLocale(<UrlEncode />);
    expect(screen.getByPlaceholderText('Enter text or URL encoded string...')).toBeInTheDocument();
  });

  it('encodes URL components', () => {
    renderWithLocale(<UrlEncode />);
    const input = screen.getByPlaceholderText('Enter text or URL encoded string...');
    fireEvent.change(input, { target: { value: 'hello world&foo=bar' } });
    fireEvent.click(screen.getByText('Encode'));
    expect(screen.getByDisplayValue('hello%20world%26foo%3Dbar')).toBeInTheDocument();
  });

  it('decodes URL components', () => {
    renderWithLocale(<UrlEncode />);
    const input = screen.getByPlaceholderText('Enter text or URL encoded string...');
    fireEvent.change(input, { target: { value: 'hello%20world%26foo%3Dbar' } });
    fireEvent.click(screen.getByText('Decode'));
    expect(screen.getByDisplayValue('hello world&foo=bar')).toBeInTheDocument();
  });

  it('handles special characters', () => {
    renderWithLocale(<UrlEncode />);
    const input = screen.getByPlaceholderText('Enter text or URL encoded string...');
    fireEvent.change(input, { target: { value: 'https://example.com/path?q=hello world#section' } });
    fireEvent.click(screen.getByText('Encode'));
    expect(screen.getByDisplayValue('https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world%23section')).toBeInTheDocument();
  });

  it('shows error for invalid encoded string', () => {
    renderWithLocale(<UrlEncode />);
    const input = screen.getByPlaceholderText('Enter text or URL encoded string...');
    fireEvent.change(input, { target: { value: '%E0%A4%A' } });
    fireEvent.click(screen.getByText('Decode'));
    expect(screen.getByDisplayValue('Invalid URL encoded string')).toBeInTheDocument();
  });
});
