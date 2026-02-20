import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import TextCounter from '@/app/tools/text-counter/page';

describe('Text Counter', () => {
  it('renders the tool', () => {
    renderWithLocale(<TextCounter />);
    expect(screen.getByPlaceholderText('Paste or type your text here...')).toBeInTheDocument();
  });

  it('counts characters correctly', () => {
    renderWithLocale(<TextCounter />);
    const input = screen.getByPlaceholderText('Paste or type your text here...');
    fireEvent.change(input, { target: { value: 'Hello World' } });
    // Find the stat card for "chars"
    const charsLabel = screen.getByText('chars');
    const charsValue = charsLabel.parentElement?.querySelector('div:first-child');
    expect(charsValue?.textContent).toBe('11');
  });

  it('counts characters without spaces', () => {
    renderWithLocale(<TextCounter />);
    const input = screen.getByPlaceholderText('Paste or type your text here...');
    fireEvent.change(input, { target: { value: 'Hello World' } });
    const label = screen.getByText('no spaces');
    const value = label.parentElement?.querySelector('div:first-child');
    expect(value?.textContent).toBe('10');
  });

  it('counts words correctly', () => {
    renderWithLocale(<TextCounter />);
    const input = screen.getByPlaceholderText('Paste or type your text here...');
    fireEvent.change(input, { target: { value: 'one two three four five' } });
    const label = screen.getByText('words');
    const value = label.parentElement?.querySelector('div:first-child');
    expect(value?.textContent).toBe('5');
  });

  it('counts lines correctly', () => {
    renderWithLocale(<TextCounter />);
    const input = screen.getByPlaceholderText('Paste or type your text here...');
    fireEvent.change(input, { target: { value: 'line1\nline2\nline3' } });
    const label = screen.getByText('lines');
    const value = label.parentElement?.querySelector('div:first-child');
    expect(value?.textContent).toBe('3');
  });

  it('counts paragraphs correctly', () => {
    renderWithLocale(<TextCounter />);
    const input = screen.getByPlaceholderText('Paste or type your text here...');
    fireEvent.change(input, { target: { value: 'para1\n\npara2\n\npara3' } });
    const label = screen.getByText('paragraphs');
    const value = label.parentElement?.querySelector('div:first-child');
    expect(value?.textContent).toBe('3');
  });

  it('shows zero for empty input', () => {
    renderWithLocale(<TextCounter />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(6);
  });

  it('counts UTF-8 bytes correctly', () => {
    renderWithLocale(<TextCounter />);
    const input = screen.getByPlaceholderText('Paste or type your text here...');
    // Chinese characters are 3 bytes each in UTF-8
    fireEvent.change(input, { target: { value: '你好' } });
    expect(screen.getByText('6')).toBeInTheDocument(); // 2 chars * 3 bytes
  });

  it('clears text', () => {
    renderWithLocale(<TextCounter />);
    const input = screen.getByPlaceholderText('Paste or type your text here...') as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'some text' } });
    fireEvent.click(screen.getByText('Clear'));
    expect(input.value).toBe('');
  });
});
