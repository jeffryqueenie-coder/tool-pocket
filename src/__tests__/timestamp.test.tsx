import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithLocale } from './test-utils';
import TimestampConverter from '@/app/tools/timestamp/page';

describe('Timestamp Converter', () => {
  it('renders the tool', () => {
    renderWithLocale(<TimestampConverter />);
    expect(screen.getByPlaceholderText('1700000000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('2024-01-01T00:00:00Z')).toBeInTheDocument();
  });

  it('converts timestamp (seconds) to date', () => {
    renderWithLocale(<TimestampConverter />);
    const tsInput = screen.getByPlaceholderText('1700000000');
    fireEvent.change(tsInput, { target: { value: '1700000000' } });
    fireEvent.click(screen.getByText('To Date →', { selector: 'button' }));
    const result = screen.getByText(/2023-11-14/);
    expect(result).toBeInTheDocument();
  });

  it('converts timestamp (milliseconds) to date', () => {
    renderWithLocale(<TimestampConverter />);
    const tsInput = screen.getByPlaceholderText('1700000000');
    fireEvent.change(tsInput, { target: { value: '1700000000000' } });
    fireEvent.click(screen.getByText('To Date →', { selector: 'button' }));
    const result = screen.getByText(/2023-11-14/);
    expect(result).toBeInTheDocument();
  });

  it('converts date to timestamp', () => {
    renderWithLocale(<TimestampConverter />);
    const dateInput = screen.getByPlaceholderText('2024-01-01T00:00:00Z');
    fireEvent.change(dateInput, { target: { value: '2024-01-01T00:00:00Z' } });
    const buttons = screen.getAllByText('To Timestamp →');
    fireEvent.click(buttons[0]);
    expect(screen.getByText(/1704067200/)).toBeInTheDocument();
  });

  it('shows error for invalid timestamp', () => {
    renderWithLocale(<TimestampConverter />);
    const tsInput = screen.getByPlaceholderText('1700000000');
    fireEvent.change(tsInput, { target: { value: 'not-a-number' } });
    fireEvent.click(screen.getByText('To Date →', { selector: 'button' }));
    expect(screen.getByText('Invalid timestamp')).toBeInTheDocument();
  });

  it('shows error for invalid date', () => {
    renderWithLocale(<TimestampConverter />);
    const dateInput = screen.getByPlaceholderText('2024-01-01T00:00:00Z');
    fireEvent.change(dateInput, { target: { value: 'not-a-date' } });
    const buttons = screen.getAllByText('To Timestamp →');
    fireEvent.click(buttons[0]);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });

  it('gets current timestamp', () => {
    renderWithLocale(<TimestampConverter />);
    fireEvent.click(screen.getByText('Current Timestamp'));
    const tsInput = screen.getByPlaceholderText('1700000000') as HTMLInputElement;
    expect(Number(tsInput.value)).toBeGreaterThan(1700000000);
  });

  it('clears all fields', () => {
    renderWithLocale(<TimestampConverter />);
    const tsInput = screen.getByPlaceholderText('1700000000') as HTMLInputElement;
    fireEvent.change(tsInput, { target: { value: '1700000000' } });
    fireEvent.click(screen.getByText('Clear'));
    expect(tsInput.value).toBe('');
  });
});
