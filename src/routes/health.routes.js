import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", (_req, res) => {
  res.json({ status: "UP" });
});

export default healthRoutes;
