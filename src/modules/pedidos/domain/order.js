export const ORDER_STATUS = Object.freeze({
  PENDING: 'PENDING',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED',
});

// Transições permitidas: PENDING → PAID | CANCELLED
export function canTransition(from, to) {
  return from === ORDER_STATUS.PENDING && (to === ORDER_STATUS.PAID || to === ORDER_STATUS.CANCELLED);
}

/** @typedef {{ id: string, userId: string, total: string, status: string, createdAt: Date }} Order */
/** @typedef {{ id: string, orderId: string, productId: string, qty: number, unitPrice: string }} OrderItem */
