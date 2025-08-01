import { Router } from "express";
import orderRoutes from "./order.routes.js";
import userRoutes from "./user.routes.js";

const routesV1 = Router();

routesV1.use("/orders", orderRoutes);
routesV1.use("/users", userRoutes);

export default routesV1;