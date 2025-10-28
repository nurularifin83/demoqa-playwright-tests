/**
 * Generate a random email address — useful for form submissions
 * Example: testuser4831@example.com
 */
export function generateRandomEmail() {
  const random = Math.floor(Math.random() * 10000);
  return `testuser${random}@example.com`;
}

/**
 * Generate a random 10-digit mobile phone number
 * Example: 0832145678
 */
export function generateRandomPhoneNumber() {
  // Start with a random valid Indonesian-style prefix (you can change if needed)
  const prefixes = ["0812", "0813", "0821", "0822", "0831", "0838"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // Fill remaining digits to make total length = 10
  const remainingLength = 10 - prefix.length;
  let remaining = "";
  for (let i = 0; i < remainingLength; i++) {
    remaining += Math.floor(Math.random() * 10);
  }

  return prefix + remaining;
}
