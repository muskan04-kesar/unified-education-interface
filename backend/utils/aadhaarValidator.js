// utils/aadhaarValidator.js

/**
 * Validates Aadhaar number format
 * - Must be exactly 12 digits
 * - Uses Verhoeff algorithm for checksum validation
 */

// Verhoeff multiplication table
const d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

// Verhoeff permutation table
const p = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

// Verhoeff inverse table
const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

function verhoeffCheck(aadhaar) {
  let c = 0;
  const myArray = aadhaar.split('').map(Number).reverse();

  for (let i = 0; i < myArray.length; i++) {
    c = d[c][p[i % 8][myArray[i]]];
  }

  return c === 0;
}

export function validateAadhaarFormat(aadhaar) {
  // Remove spaces and hyphens
  const cleanAadhaar = aadhaar.replace(/[\s-]/g, '');

  // Check if it's exactly 12 digits
  if (!/^\d{12}$/.test(cleanAadhaar)) {
    return {
      valid: false,
      error: 'Aadhaar must be exactly 12 digits',
    };
  }

  // Check if it starts with 0 or 1 (invalid)
  if (cleanAadhaar[0] === '0' || cleanAadhaar[0] === '1') {
    return {
      valid: false,
      error: 'Aadhaar cannot start with 0 or 1',
    };
  }

  // Verify checksum using Verhoeff algorithm
  if (!verhoeffCheck(cleanAadhaar)) {
    return {
      valid: false,
      error: 'Invalid Aadhaar number (checksum failed)',
    };
  }

  return {
    valid: true,
    aadhaar: cleanAadhaar,
  };
}

export function maskAadhaar(aadhaar) {
  const clean = aadhaar.replace(/[\s-]/g, '');
  return `XXXX-XXXX-${clean.slice(-4)}`;
}