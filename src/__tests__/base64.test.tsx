import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import Base64Tool from '@/app/tools/base64/page';

describe('Base64 Encode/Decode', () => {
  it('renders the tool', () => {
    renderWithLocale(<Base64Tool />);
    expect(screen.getByPlaceholderText('Enter text or Base64 string...')).toBeInTheDocument();
  });

  it('encodes text to Base64', () => {
    renderWithLocale(<Base64Tool />);
    const input = screen.getByPlaceholderText('Enter text or Base64 string...');
    fireEvent.change(input, { target: { value: 'Hello, World!' } });
    fireEvent.click(screen.getByText('Encode'));
    expect(screen.getByDisplayValue('SGVsbG8sIFdvcmxkIQ==')).toBeInTheDocument();
  });

  it('decodes Base64 to text', () => {
    renderWithLocale(<Base64Tool />);
    const input = screen.getByPlaceholderText('Enter text or Base64 string...');
    fireEvent.change(input, { target: { value: 'SGVsbG8sIFdvcmxkIQ==' } });
    fireEvent.click(screen.getByText('Decode'));
    expect(screen.getByDisplayValue('Hello, World!')).toBeInTheDocument();
  });

  it('handles Unicode text correctly', () => {
    renderWithLocale(<Base64Tool />);
    const input = screen.getByPlaceholderText('Enter text or Base64 string...');
    fireEvent.change(input, { target: { value: '你好世界' } });
    fireEvent.click(screen.getByText('Encode'));
    // Decode it back
    const output = screen.getAllByRole('textbox')[1] as HTMLTextAreaElement;
    const encoded = output.value;
    fireEvent.change(input, { target: { value: encoded } });
    fireEvent.click(screen.getByText('Decode'));
    const decoded = screen.getAllByRole('textbox')[1] as HTMLTextAreaElement;
    expect(decoded.value).toBe('你好世界');
  });

  it('shows error for invalid Base64', () => {
    renderWithLocale(<Base64Tool />);
    const input = screen.getByPlaceholderText('Enter text or Base64 string...');
    fireEvent.change(input, { target: { value: '!!!not-base64!!!' } });
    fireEvent.click(screen.getByText('Decode'));
    expect(screen.getByDisplayValue('Invalid Base64 string')).toBeInTheDocument();
  });

  it('clears input and output', () => {
    renderWithLocale(<Base64Tool />);
    const input = screen.getByPlaceholderText('Enter text or Base64 string...') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Encode'));
    fireEvent.click(screen.getByText('Clear'));
    expect(input.value).toBe('');
  });
});
