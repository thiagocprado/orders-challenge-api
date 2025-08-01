import { status } from "http-status";
import orderUseCase from "../usecases/order.usecase.js";
import {
  buildResponse,
  buildResponseWithPagination,
} from "../commons/response.js";

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      const {
        page = 1,
        pageSize = 10,
        orderBy = "createdAt",
        sort = "ASC",
      } = req.query;
      const params = {
        page,
        pageSize,
        orderBy,
        sort,
      };

      const { count, data } = await orderUseCase.getAllOrders(params);

      const resp = buildResponseWithPagination(data, {
        ...params,
        total: count,
      });

      res.status(status.OK).json(resp);
    } catch (error) {
      next(error);
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await orderUseCase.getOrderById(id);
      const resp = buildResponse(data);

      res.status(status.OK).json(resp);
    } catch (error) {
      next(error);
    }
  },

  uploadOrders: async (req, res, next) => {
    try {
      const { file } = req;
      const data = await orderUseCase.uploadOrders(file);
      const resp = buildResponse(data, "Pedidos processados com sucesso!");

      res.status(status.CREATED).json(resp);
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
