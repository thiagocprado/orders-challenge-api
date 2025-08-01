import { Router } from "express";
import fileHandlerMiddleware from "../../middlewares/file.handler.js";
import orderController from "../../controllers/order.controller.js";

const orderRoutes = Router();

orderRoutes.get("/", orderController.getAllOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.post("/", fileHandlerMiddleware, orderController.uploadOrders);

export default orderRoutes;
