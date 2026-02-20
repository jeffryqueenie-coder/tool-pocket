import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import JsonDiffTool from '@/app/tools/text-diff/page';

describe('JSON Diff', () => {
  it('renders two textareas', () => {
    renderWithLocale(<JsonDiffTool />);
    const textareas = screen.getAllByRole('textbox');
    expect(textareas).toHaveLength(2);
  });

  it('has a compare button', () => {
    renderWithLocale(<JsonDiffTool />);
    expect(screen.getByText('Compare')).toBeInTheDocument();
  });

  it('shows diff output after comparing valid JSON', () => {
    renderWithLocale(<JsonDiffTool />);
    const textareas = screen.getAllByRole('textbox');
    fireEvent.change(textareas[0], { target: { value: '{"a":1}' } });
    fireEvent.change(textareas[1], { target: { value: '{"a":2}' } });
    fireEvent.click(screen.getByText('Compare'));
    expect(screen.getByText('diff')).toBeInTheDocument();
  });

  it('clears inputs and output', () => {
    renderWithLocale(<JsonDiffTool />);
    const textareas = screen.getAllByRole('textbox') as HTMLTextAreaElement[];
    fireEvent.change(textareas[0], { target: { value: '{"a":1}' } });
    fireEvent.click(screen.getByText('Clear'));
    expect(textareas[0].value).toBe('');
  });
});
