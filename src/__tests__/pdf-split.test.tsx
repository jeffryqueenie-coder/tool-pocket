import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import PdfSplit from '@/app/tools/pdf-split/page';

describe('PDF Split', () => {
  it('renders the tool', () => {
    renderWithLocale(<PdfSplit />);
    expect(screen.getByText('upload PDF')).toBeInTheDocument();
  });

  it('has a split button', () => {
    renderWithLocale(<PdfSplit />);
    expect(screen.getByText('Split')).toBeInTheDocument();
  });

  it('split button is disabled with no file', () => {
    renderWithLocale(<PdfSplit />);
    const btn = screen.getByText('Split');
    expect(btn).toBeDisabled();
  });

  it('has a clear button', () => {
    renderWithLocale(<PdfSplit />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('does not show select all or download before upload', () => {
    renderWithLocale(<PdfSplit />);
    expect(screen.queryByText('Select All')).not.toBeInTheDocument();
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
    expect(screen.queryByText('Rendering pages...')).not.toBeInTheDocument();
  });
});
