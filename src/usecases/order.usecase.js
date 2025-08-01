import { BadRequest, NotFound } from '../commons/error.js';
import { createInterface } from 'readline';
import { handleRowContent, validateFile, validateFileRow } from '../entities/order.entity.js';
import { createReadStream, unlinkSync } from 'fs';

const orderUseCase = (orderRepository, orderProductRepository, userRepository) => ({
  getAllOrders: async (params) => {
    const { count, data } = await orderRepository.getAllOrders(params);
    return { count, data };
  },

  getOrderById: async (id) => {
    if (!id || isNaN(Number(id))) {
      throw new BadRequest('É preciso informar um ID válido!');
    }

    const { found, data } = await orderRepository.getOrderById(id);
    if (!found) {
      throw new NotFound('Pedido não encontrado!');
    }

    return data;
  },

  uploadOrders: async (file) => {
    const { isFileValid, fileError } = validateFile(file);
    if (!isFileValid) {
      throw new BadRequest(fileError);
    }

    let totalProcessed = 0;

    const fileStream = createReadStream(file.path);
    const rl = createInterface({ input: fileStream });

    for await (const row of rl) {
      const isRowValid = validateFileRow(row);
      if (!isRowValid) {
        continue;
      }

      const orderData = handleRowContent(row);

      const user = await userRepository.getUserById(orderData.userId);
      if (!user.found) {
        await userRepository.createUser({
          id: orderData.userId,
          name: orderData.userName,
        });
      }

      const order = await orderRepository.getOrderById(orderData.orderId);
      if (!order.found) {
        await orderRepository.createOrder({
          id: orderData.orderId,
          userId: orderData.userId,
          date: orderData.orderDate,
        });
      }

      const product = await orderProductRepository.getOrderProductByOrderIdAndProductId(
        orderData.orderId,
        orderData.productId
      );
      if (!product.found) {
        await orderProductRepository.createOrderProduct({
          orderId: orderData.orderId,
          productId: orderData.productId,
          value: orderData.productValue,
        });
      }

      totalProcessed++;
    }

    unlinkSync(file.path, { force: true, recursive: true });
    return totalProcessed;
  },
});

export default orderUseCase;
