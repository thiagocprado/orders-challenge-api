import OrderProduct from '../models/order.product.model.js';
import { InternalServerError } from '../commons/error.js';

const orderProductRepository = {
  getOrderProductByOrderIdAndProductId: async (orderId, productId) => {
    try {
      const row = await OrderProduct.findOne({
        where: { orderId, productId },
      });

      if (!row) return { found: false, data: null };

      return { found: true, data: row };
    } catch (error) {
      throw new InternalServerError('Erro ao buscar produto do pedido na base de dados', error);
    }
  },

  createOrderProduct: async (body) => {
    try {
      const row = await OrderProduct.create(body);

      return { data: row };
    } catch (error) {
      throw new InternalServerError('Erro ao criar produto do pedido na base de dados', error);
    }
  },
};

export default orderProductRepository;
