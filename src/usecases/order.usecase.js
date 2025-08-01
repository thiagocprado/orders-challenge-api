import { BadRequest, InternalServerError, NotFound } from "../commons/error.js";
import { createInterface } from "readline";
import {
  handleRowContent,
  validateFile,
  validateFileRow,
} from "../entities/order.entity.js";
import { createReadStream, unlinkSync } from "fs";
import orderRepository from "../repositories/order.repository.js";
import userRepository from "../repositories/user.repository.js";
import orderProductRepository from "../repositories/order.product.repository.js";

const orderUseCase = {
  getAllOrders: async (params) => {
    try {
      const { count, data } = await orderRepository.getAllOrders(params);

      return { count, data };
    } catch (error) {
      throw new InternalServerError(
        "Houve uma falha interna ao buscar pedidos!",
        error
      );
    }
  },

  getOrderById: async (id) => {
    try {
      if (!id || isNaN(Number(id))) {
        throw new BadRequest("É preciso informar um ID válido!");
      }

      const { found, data } = await orderRepository.getOrderById(id);

      if (!found) {
        throw new NotFound("Pedido não encontrado!");
      }

      return data;
    } catch (error) {
      throw new InternalServerError(
        "Houve uma falha interna ao buscar o pedido!",
        error
      );
    }
  },

  uploadOrders: async (file) => {
    try {
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

        const product =
          await orderProductRepository.getOrderProductByOrderIdAndProductId(
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
    } catch (error) {
      if (file && file.path) {
        unlinkSync(file.path, { force: true, recursive: true });
      }

      throw new InternalServerError(
        "Houve uma falha interna ao processar o arquivo de pedidos!",
        error
      );
    }
  },
};

export default orderUseCase;
