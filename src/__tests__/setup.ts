import '@testing-library/jest-dom/vitest';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },
});

// Mock crypto.subtle for hash tests
if (!globalThis.crypto?.subtle) {
  const { webcrypto } = await import('crypto');
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
  });
}

// Mock URL.createObjectURL / revokeObjectURL for PDF tools
if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = vi.fn(() => 'blob:mock-url');
}
if (typeof URL.revokeObjectURL === 'undefined') {
  URL.revokeObjectURL = vi.fn();
}
