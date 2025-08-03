import { Router } from 'express';
import orderRoutes from '../../modules/order/v1/order.routes.js';
import userRoutes from '../../modules/user/v1/user.routes.js';

const routesV1 = Router();

routesV1.use('/orders', orderRoutes);
routesV1.use('/users', userRoutes);

export default routesV1;
