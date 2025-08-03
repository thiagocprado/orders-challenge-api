import { Router } from 'express';
import userController from '../user.controller.js';
import userRepository from '../user.repository.js';
import userUseCase from '../user.usecase.js';

const userRoutes = Router();

const usecase = userUseCase(userRepository());
const controller = userController(usecase);

userRoutes.get('/orders', controller.getAllUsers);
userRoutes.get('/:id/orders', controller.getUserById);

export default userRoutes;
