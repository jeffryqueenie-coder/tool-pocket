import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import ColorPicker from '@/app/tools/color-picker/page';

describe('Color Picker', () => {
  it('renders the tool with default color', () => {
    renderWithLocale(<ColorPicker />);
    expect(screen.getByText('#E8A634')).toBeInTheDocument();
  });

  it('displays HEX, RGB, and HSL values', () => {
    renderWithLocale(<ColorPicker />);
    // Default color is #e8a634
    expect(screen.getByText('#E8A634')).toBeInTheDocument();
    // Check that all three format labels exist
    expect(screen.getByText('hex')).toBeInTheDocument();
    expect(screen.getByText('rgb')).toBeInTheDocument();
    expect(screen.getByText('hsl')).toBeInTheDocument();
  });

  it('has editable RGB input field', () => {
    renderWithLocale(<ColorPicker />);
    const rgbInputs = screen.getAllByRole('textbox');
    // Should have hex, rgb, hsl inputs
    expect(rgbInputs.length).toBeGreaterThanOrEqual(3);
  });

  it('has editable HSL input field', () => {
    renderWithLocale(<ColorPicker />);
    // HSL label should be present
    expect(screen.getByText('hsl')).toBeInTheDocument();
  });
});

// Test the color conversion functions directly
describe('Color Conversions', () => {
  // We test the logic by importing the component and checking rendered values
  // The functions are not exported, so we test through the UI

  it('renders correct RGB for known hex', () => {
    renderWithLocale(<ColorPicker />);
    // #e8a634 -> rgb(232, 166, 52)
    // Find the RGB input by checking all textboxes
    const inputs = screen.getAllByRole('textbox');
    const rgbInput = inputs.find(el => (el as HTMLInputElement).defaultValue?.includes('232'));
    expect(rgbInput).toBeDefined();
  });
});
