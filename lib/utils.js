import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Masks a mobile number for display, showing only the first 2 and last 2 digits.
 * Example: "9822310009" → "98******09"
 * @param {string} number - The raw phone number (may include +91 prefix)
 * @returns {string} Masked phone number string
 */
export function maskMobile(number) {
  if (!number) return 'N/A';
  const cleaned = String(number).replace('+91', '').trim();
  if (cleaned.length < 4) return '**********';
  return cleaned.slice(0, 2) + '******' + cleaned.slice(-2);
}
