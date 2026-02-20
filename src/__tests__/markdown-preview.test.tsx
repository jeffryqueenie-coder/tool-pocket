import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import MarkdownPreview from '@/app/tools/markdown-preview/page';

describe('Markdown Preview', () => {
  it('renders the tool', () => {
    renderWithLocale(<MarkdownPreview />);
    expect(screen.getByText('editor')).toBeInTheDocument();
  });

  it('has a preview area', () => {
    renderWithLocale(<MarkdownPreview />);
    expect(screen.getByText('preview')).toBeInTheDocument();
  });
});
