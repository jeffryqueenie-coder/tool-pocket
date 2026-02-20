import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import PdfToImage from '@/app/tools/pdf-to-image/page';

describe('PDF to Image', () => {
  it('renders the tool', () => {
    renderWithLocale(<PdfToImage />);
    expect(screen.getByText('upload PDF')).toBeInTheDocument();
  });

  it('has a scale selector', () => {
    renderWithLocale(<PdfToImage />);
    expect(screen.getByText('scale')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
