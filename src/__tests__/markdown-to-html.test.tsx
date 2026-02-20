import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import MarkdownToHtml from '@/app/tools/markdown-to-html/page';

describe('Markdown to HTML', () => {
  it('renders the tool', () => {
    renderWithLocale(<MarkdownToHtml />);
    expect(screen.getByPlaceholderText('# Hello World')).toBeInTheDocument();
  });

  it('has a convert button', () => {
    renderWithLocale(<MarkdownToHtml />);
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });
});
