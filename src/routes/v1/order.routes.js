import { Router } from 'express';
import fileHandlerMiddleware from '../../middlewares/file.handler.js';
import orderController from '../../controllers/order.controller.js';
import orderUseCase from '../../usecases/order.usecase.js';
import orderRepository from '../../repositories/order.repository.js';
import orderProductRepository from '../../repositories/order.product.repository.js';
import userRepository from '../../repositories/user.repository.js';

const orderRoutes = Router();

const usecase = orderUseCase(orderRepository, orderProductRepository, userRepository);
const controller = orderController(usecase);

orderRoutes.get('/', controller.getAllOrders);
orderRoutes.get('/:id', controller.getOrderById);
orderRoutes.post('/', fileHandlerMiddleware, controller.uploadOrders);

export default orderRoutes;
