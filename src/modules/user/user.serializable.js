import { handleSumProductsTotalValue } from '../../utils/math.js';

const serializableUsers = (users) => {
  return users.map((user) => ({
    user_id: user.id,
    name: user.name,
    orders: user.orders.map((order) => ({
      order_id: order.id,
      total: handleSumProductsTotalValue(order.products),
      date: order.date,
      products: order.products.map((product) => ({
        product_id: product.id,
        value: product.value,
      })),
    })),
  }));
};

const serializableUser = (user) => {
  return {
    user_id: user.id,
    name: user.name,
    orders: user.orders.map((order) => ({
      order_id: order.id,
      total: handleSumProductsTotalValue(order.products),
      date: order.date,
      products: order.products.map((product) => ({
        product_id: product.id,
        value: product.value,
      })),
    })),
  };
};

export { serializableUsers, serializableUser };
