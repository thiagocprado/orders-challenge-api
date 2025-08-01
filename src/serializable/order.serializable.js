const serializableOrders = (orders) => {
  return orders.map((order) => ({
    userId: order.user.id,
    userName: order.user.name,
    orders: order
  }));
};
