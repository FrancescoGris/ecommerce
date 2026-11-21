export const PAYMENT_STATUS = Object.freeze({
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
});

export const PAYMENT_METHODS = Object.freeze(['pix', 'credit_card']);

/**
 * Porta (interface) que qualquer provedor de pagamento deve implementar.
 * @typedef {{ name: string, authorize(input: { orderId: string, amount: string, method: string, simulate?: string }): Promise<{ status: 'APPROVED'|'DECLINED', raw: object }> }} PaymentProvider
 */
