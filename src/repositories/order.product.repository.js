import OrderProduct from "../models/order.product.model.js";

const orderProductRepository = {
  getOrderProductByOrderIdAndProductId: async (orderId, productId) => {
    const row = await OrderProduct.findOne({
      where: { orderId, productId },
    });

    if (!row) return { found: false, data: null };

    return { found: true, data: row };
  },
  createOrderProduct: async (body) => {
    const row = await OrderProduct.create(body);

    return { data: row };
  },
};

export default orderProductRepository;
