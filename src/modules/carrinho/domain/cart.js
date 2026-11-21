/** @typedef {{ id: string, userId: string }} Cart */
/** @typedef {{ id: string, cartId: string, productId: string, qty: number, unitPrice: string }} CartItem */

export function isValidQty(qty) {
  return Number.isInteger(qty) && qty > 0;
}

export function isEmpty(items) {
  return items.length === 0;
}
