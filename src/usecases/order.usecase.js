import { BadRequest, NotFound } from '../commons/error.js';
import { createInterface } from 'readline';
import { handleRowContent, validateFile, validateFileRow } from '../entities/order.entity.js';
import { createReadStream, unlinkSync } from 'fs';
import logger from '../utils/logger.js';

const orderUseCase = (orderRepository, orderProductRepository, userRepository) => {
  const validateUploadFile = (file) => {
    const { isFileValid, fileError } = validateFile(file);
    if (!isFileValid) {
      throw new BadRequest(fileError);
    }
  };

  const readFileLines = async (filePath) => {
    const fileStream = createReadStream(filePath);
    const readline = createInterface({ input: fileStream });

    const lines = [];
    for await (const line of readline) {
      if (line.trim()) {
        lines.push(line);
      }
    }
    return lines;
  };

  const processOrderLines = async (lines) => {
    const results = await Promise.all(
      lines.map(async (row, index) => {
        return await processSingleOrderLine(row, index);
      })
    );

    return results.filter((result) => result === true).length;
  };

  const processSingleOrderLine = async (row, index) => {
    const isRowValid = validateFileRow(row);
    if (!isRowValid) {
      logger.warn(`Linha ${index + 1} inválida: ${row}`);
      return null;
    }

    const orderData = handleRowContent(row);
    await saveOrderData(orderData);
    return true;
  };

  const saveOrderData = async (orderData) => {
    await userRepository.findOrCreateUser({
      id: orderData.userId,
      name: orderData.userName,
    });

    await orderRepository.findOrCreateOrder({
      id: orderData.orderId,
      userId: orderData.userId,
      date: orderData.orderDate,
    });

    await orderProductRepository.findOrCreateOrderProduct({
      orderId: orderData.orderId,
      productId: orderData.productId,
      value: orderData.productValue,
    });
  };

  const getAllOrders = async (params) => {
    const { count, data } = await orderRepository.getAllOrders(params);
    return { count, data };
  };

  const getOrderById = async (id) => {
    if (!id || isNaN(Number(id))) {
      throw new BadRequest('É preciso informar um ID válido!');
    }

    const { found, data } = await orderRepository.getOrderById(id);
    if (!found) {
      throw new NotFound('Pedido não encontrado!');
    }

    return data;
  };

  const uploadOrders = async (file) => {
    try {
      validateUploadFile(file);
      const lines = await readFileLines(file.path);
      const totalProcessed = await processOrderLines(lines);
      return totalProcessed;
    } finally {
      unlinkSync(file.path);
    }
  };

  return {
    getAllOrders,
    getOrderById,
    uploadOrders,
  };
};

export default orderUseCase;
