import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import LoremIpsumGenerator from '@/app/tools/lorem-ipsum/page';

describe('Lorem Ipsum Generator', () => {
  it('renders the tool', () => {
    renderWithLocale(<LoremIpsumGenerator />);
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });

  it('generates paragraphs', () => {
    renderWithLocale(<LoremIpsumGenerator />);
    fireEvent.click(screen.getByText('Generate'));
    const output = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(output.value.length).toBeGreaterThan(0);
  });

  it('starts with Lorem ipsum when checkbox is checked', () => {
    renderWithLocale(<LoremIpsumGenerator />);
    fireEvent.click(screen.getByText('Generate'));
    const output = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(output.value.startsWith('Lorem ipsum')).toBe(true);
  });

  it('respects paragraph count', () => {
    renderWithLocale(<LoremIpsumGenerator />);
    const countInput = screen.getByRole('spinbutton');
    fireEvent.change(countInput, { target: { value: '5' } });
    fireEvent.click(screen.getByText('Generate'));
    const output = screen.getByRole('textbox') as HTMLTextAreaElement;
    const paragraphs = output.value.split('\n\n');
    expect(paragraphs).toHaveLength(5);
  });

  it('clears output', () => {
    renderWithLocale(<LoremIpsumGenerator />);
    fireEvent.click(screen.getByText('Generate'));
    fireEvent.click(screen.getByText('Clear'));
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
