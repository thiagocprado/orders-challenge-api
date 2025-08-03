import { Router } from 'express';
import fileHandlerMiddleware from '../../../middlewares/file.handler.js';
import orderController from '../order.controller.js';
import orderUseCase from '../order.usecase.js';
import orderRepository from '../order.repository.js';
import orderProductRepository from '../../orderProduct/order.product.repository.js';
import userRepository from '../../user/user.repository.js';

const orderRoutes = Router();

const usecase = orderUseCase(orderRepository(), orderProductRepository(), userRepository());
const controller = orderController(usecase);

orderRoutes.get('/', controller.getAllOrders);
orderRoutes.get('/:id', controller.getOrderById);
orderRoutes.post('/', fileHandlerMiddleware, controller.uploadOrders);

export default orderRoutes;
