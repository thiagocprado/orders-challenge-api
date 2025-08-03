import { handleSumProductsTotalValue } from '../../utils/math.js';

const serializableOrders = (orders) => {
  return orders.map((order) => ({
    order_id: order.id,
    total: handleSumProductsTotalValue(order.products),
    date: order.date,
    products: order.products.map((product) => {
      return {
        product_id: product.id,
        value: product.value,
      };
    }),
  }));
};

const serializableOrder = (order) => {
  return {
    order_id: order.id,
    total: handleSumProductsTotalValue(order.products),
    date: order.date,
    products: order.products.map((product) => {
      return {
        product_id: product.id,
        value: product.value,
      };
    }),
  };
};

export { serializableOrder, serializableOrders };
