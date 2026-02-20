import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import PdfMerge from '@/app/tools/pdf-merge/page';

describe('PDF Merge', () => {
  it('renders the tool', () => {
    renderWithLocale(<PdfMerge />);
    expect(screen.getByText('Drop PDF files here or click to browse')).toBeInTheDocument();
  });

  it('has a merge button', () => {
    renderWithLocale(<PdfMerge />);
    expect(screen.getByText('Merge')).toBeInTheDocument();
  });

  it('merge button is disabled with no files', () => {
    renderWithLocale(<PdfMerge />);
    const btn = screen.getByText('Merge');
    expect(btn).toBeDisabled();
  });
});
