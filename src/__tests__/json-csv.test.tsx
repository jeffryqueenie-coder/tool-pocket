import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import JsonCsvConverter from '@/app/tools/json-csv/page';

describe('JSON/CSV Converter', () => {
  it('renders the tool', () => {
    renderWithLocale(<JsonCsvConverter />);
    expect(screen.getByText('JSON → CSV')).toBeInTheDocument();
    expect(screen.getByText('CSV → JSON')).toBeInTheDocument();
  });

  it('converts JSON to CSV', () => {
    renderWithLocale(<JsonCsvConverter />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '[{"name":"Alice","age":30}]' } });
    fireEvent.click(screen.getByText('Convert'));
    const textareas = screen.getAllByRole('textbox') as HTMLTextAreaElement[];
    const output = textareas.find(t => t.readOnly);
    expect(output?.value).toContain('name');
    expect(output?.value).toContain('Alice');
  });

  it('switches to CSV to JSON mode', () => {
    renderWithLocale(<JsonCsvConverter />);
    fireEvent.click(screen.getByText('CSV → JSON'));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'name,age\nAlice,30' } });
    fireEvent.click(screen.getByText('Convert'));
    const textareas = screen.getAllByRole('textbox') as HTMLTextAreaElement[];
    const output = textareas.find(t => t.readOnly);
    expect(output?.value).toContain('"name"');
    expect(output?.value).toContain('"Alice"');
  });

  it('shows error for invalid JSON', () => {
    renderWithLocale(<JsonCsvConverter />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '{not valid}' } });
    fireEvent.click(screen.getByText('Convert'));
    const errorEl = screen.getByText(/Expected property name/i);
    expect(errorEl).toBeInTheDocument();
  });
});
