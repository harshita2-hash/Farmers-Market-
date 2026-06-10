export type Currency = 'USD' | 'INR';

export const EXCHANGE_RATE = 83;

/**
 * Converts a USD price to INR if needed, or returns it as is.
 */
export function convertPrice(priceInUSD: number, targetCurrency: Currency): number {
  if (targetCurrency === 'INR') {
    return priceInUSD * EXCHANGE_RATE;
  }
  return priceInUSD;
}

/**
 * Formats a given price (in USD base) elegantly as currency code.
 */
export function formatPrice(priceInUSD: number, currency: Currency): string {
  if (currency === 'INR') {
    const rupeeAmount = priceInUSD * EXCHANGE_RATE;
    return `₹${rupeeAmount.toFixed(2)}`;
  }
  return `$${priceInUSD.toFixed(2)}`;
}

/**
 * Parses a price entered in the current currency back into a USD base number for compatibility.
 */
export function parseLocalPrice(localPrice: number, currency: Currency): number {
  if (currency === 'INR') {
    return localPrice / EXCHANGE_RATE;
  }
  return localPrice;
}
