import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import ShaHash from '@/app/tools/md5-hash/page';

describe('SHA Hash Generator', () => {
  it('renders the tool', () => {
    renderWithLocale(<ShaHash />);
    expect(screen.getByPlaceholderText('Enter text to hash...')).toBeInTheDocument();
  });

  it('generates SHA hashes for input text', async () => {
    renderWithLocale(<ShaHash />);
    const input = screen.getByPlaceholderText('Enter text to hash...');
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(screen.getByText('Generate Hashes'));

    await waitFor(() => {
      // SHA-256 of "hello" is well-known
      expect(screen.getByDisplayValue('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')).toBeInTheDocument();
    });
  });

  it('generates all three hash types', async () => {
    renderWithLocale(<ShaHash />);
    const input = screen.getByPlaceholderText('Enter text to hash...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Generate Hashes'));

    await waitFor(() => {
      const inputs = screen.getAllByRole('textbox');
      // Should have input + 3 hash outputs
      const readOnlyInputs = inputs.filter((el) => (el as HTMLInputElement).readOnly);
      expect(readOnlyInputs).toHaveLength(3);
    });
  });

  it('does not generate hashes for empty input', async () => {
    renderWithLocale(<ShaHash />);
    fireEvent.click(screen.getByText('Generate Hashes'));
    // No hash outputs should appear
    const readOnlyInputs = screen.getAllByRole('textbox').filter((el) => (el as HTMLInputElement).readOnly);
    expect(readOnlyInputs).toHaveLength(0);
  });

  it('clears input and results', async () => {
    renderWithLocale(<ShaHash />);
    const input = screen.getByPlaceholderText('Enter text to hash...') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(screen.getByText('Generate Hashes'));

    await waitFor(() => {
      expect(screen.getAllByRole('textbox').length).toBeGreaterThan(1);
    });

    fireEvent.click(screen.getByText('Clear'));
    expect(input.value).toBe('');
  });
});
