// API pública do módulo `pedidos`.
import { makeOrderRepository } from './infra/orderRepository.js';
import { makeCreateOrderFromCart } from './app/createOrderFromCart.js';
import { makeGetOrder } from './app/getOrder.js';
import { makeMarkOrderPaid } from './app/markOrderPaid.js';
import { buildPedidosRouter } from './api/routes.js';

export { ORDER_STATUS } from './domain/order.js';

export function createPedidosModule({ db }) {
  const orderRepository = makeOrderRepository(db);

  return {
    router: buildPedidosRouter(),
    publicApi: {
      createOrderFromCart: makeCreateOrderFromCart({ orderRepository }),
      getOrder: makeGetOrder({ orderRepository }),
      markOrderPaid: makeMarkOrderPaid({ orderRepository }),
    },
  };
}
