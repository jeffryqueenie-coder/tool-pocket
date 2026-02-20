import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import ImageToBase64 from '@/app/tools/image-to-base64/page';

describe('Image to Base64', () => {
  it('renders the tool', () => {
    renderWithLocale(<ImageToBase64 />);
    expect(screen.getByText('Click or drag an image')).toBeInTheDocument();
  });

  it('has a hidden file input', () => {
    renderWithLocale(<ImageToBase64 />);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeDefined();
    expect(fileInput.accept).toBe('image/*');
    expect(fileInput.className).toContain('hidden');
  });

  it('supports drag and drop area', () => {
    renderWithLocale(<ImageToBase64 />);
    const dropZone = screen.getByText('Click or drag an image').closest('div');
    expect(dropZone).toBeDefined();
    expect(dropZone?.className).toContain('border-dashed');
  });
});
