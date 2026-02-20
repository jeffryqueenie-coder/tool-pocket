import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import JsonFormatter from '@/app/tools/json-formatter/page';

describe('JSON Formatter', () => {
  it('renders the tool', () => {
    renderWithLocale(<JsonFormatter />);
    expect(screen.getByPlaceholderText('{"key": "value"}')).toBeInTheDocument();
  });

  it('formats valid JSON', () => {
    renderWithLocale(<JsonFormatter />);
    const input = screen.getByPlaceholderText('{"key": "value"}');
    fireEvent.change(input, { target: { value: '{"a":1,"b":2}' } });
    fireEvent.click(screen.getByText('Format'));
    const textareas = screen.getAllByRole('textbox') as HTMLTextAreaElement[];
    const output = textareas.find(t => t.readOnly);
    expect(output?.value).toContain('"a": 1');
    expect(output?.value).toContain('"b": 2');
  });

  it('minifies valid JSON', () => {
    renderWithLocale(<JsonFormatter />);
    const input = screen.getByPlaceholderText('{"key": "value"}');
    fireEvent.change(input, { target: { value: '{\n  "a": 1,\n  "b": 2\n}' } });
    fireEvent.click(screen.getByText('Minify'));
    const output = screen.getByDisplayValue('{"a":1,"b":2}');
    expect(output).toBeInTheDocument();
  });

  it('shows error for invalid JSON', () => {
    renderWithLocale(<JsonFormatter />);
    const input = screen.getByPlaceholderText('{"key": "value"}');
    fireEvent.change(input, { target: { value: '{invalid}' } });
    fireEvent.click(screen.getByText('Format'));
    expect(screen.getByText(/Expected property name/i)).toBeInTheDocument();
  });

  it('clears input and output', () => {
    renderWithLocale(<JsonFormatter />);
    const input = screen.getByPlaceholderText('{"key": "value"}') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: '{"a":1}' } });
    fireEvent.click(screen.getByText('Format'));
    fireEvent.click(screen.getByText('Clear'));
    expect(input.value).toBe('');
  });
});
