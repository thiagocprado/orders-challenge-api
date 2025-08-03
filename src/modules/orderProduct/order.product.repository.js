import OrderProduct from './order.product.model.js';
import { InternalServerError } from '../../commons/error.js';

const orderProductRepository = () => {
  const getOrderProductByOrderIdAndProductId = async (orderId, productId) => {
    try {
      const row = await OrderProduct.findOne({
        where: { orderId, productId },
      });

      if (!row) return { found: false, data: null };

      return { found: true, data: row };
    } catch (error) {
      throw new InternalServerError(
        'Houve um erro inesperado ao buscar o produto do pedido',
        error
      );
    }
  };

  const createOrderProduct = async (body) => {
    try {
      const row = await OrderProduct.create(body);

      return { data: row };
    } catch (error) {
      throw new InternalServerError('Houve um erro inesperado ao criar o produto do pedido', error);
    }
  };

  const findOrCreateOrderProduct = async (orderProductData) => {
    try {
      const [orderProduct, created] = await OrderProduct.findOrCreate({
        where: {
          orderId: orderProductData.orderId,
          productId: orderProductData.productId,
        },
        defaults: orderProductData,
      });

      return { data: orderProduct, created };
    } catch (error) {
      throw new InternalServerError(
        'Houve um erro inesperado ao buscar/criar o produto do pedido',
        error
      );
    }
  };

  return {
    getOrderProductByOrderIdAndProductId,
    createOrderProduct,
    findOrCreateOrderProduct,
  };
};

export default orderProductRepository;
