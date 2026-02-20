import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import ImageToPdf from '@/app/tools/image-to-pdf/page';

describe('Image to PDF', () => {
  it('renders the tool', () => {
    renderWithLocale(<ImageToPdf />);
    expect(screen.getByText('Drop images here or click to browse')).toBeInTheDocument();
  });

  it('has a create PDF button', () => {
    renderWithLocale(<ImageToPdf />);
    expect(screen.getByText('Create PDF')).toBeInTheDocument();
  });

  it('create PDF button is disabled with no images', () => {
    renderWithLocale(<ImageToPdf />);
    const btn = screen.getByText('Create PDF');
    expect(btn).toBeDisabled();
  });
});
