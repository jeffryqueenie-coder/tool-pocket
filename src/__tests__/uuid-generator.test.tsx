import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import UuidGenerator from '@/app/tools/uuid-generator/page';

describe('UUID Generator', () => {
  it('renders the tool', () => {
    renderWithLocale(<UuidGenerator />);
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });

  it('generates a valid UUID', () => {
    renderWithLocale(<UuidGenerator />);
    fireEvent.click(screen.getByText('Generate'));
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const codes = screen.getAllByRole('code');
    expect(codes.length).toBeGreaterThan(0);
    expect(uuidRegex.test(codes[0].textContent || '')).toBe(true);
  });

  it('generates multiple UUIDs', () => {
    renderWithLocale(<UuidGenerator />);
    const countInput = screen.getByRole('spinbutton');
    fireEvent.change(countInput, { target: { value: '5' } });
    fireEvent.click(screen.getByText('Generate'));
    const codes = screen.getAllByRole('code');
    expect(codes).toHaveLength(5);
  });

  it('clears generated UUIDs', () => {
    renderWithLocale(<UuidGenerator />);
    fireEvent.click(screen.getByText('Generate'));
    expect(screen.getAllByRole('code').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByText('Clear'));
    expect(screen.queryAllByRole('code')).toHaveLength(0);
  });
});
