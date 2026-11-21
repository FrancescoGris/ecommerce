/** @typedef {{ id: string, name: string, sku: string, price: string, stock: number }} Product */

export function hasStock(product, qty) {
  return product.stock >= qty;
}
