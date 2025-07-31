import { Router } from "express";
import orderRoutes from "./order.routes.js";

const routesV1 = Router();

routesV1.use("/orders", orderRoutes);

export default routesV1;