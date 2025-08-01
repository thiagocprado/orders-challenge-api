import { status } from 'http-status';
import orderUseCase from '../usecases/order.usecase.js';
import { buildResponse, buildResponseWithPagination } from '../commons/response.js';
import { serializableOrder, serializableOrders } from '../serializable/order.serializable.js';

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      const {
        page = 1,
        pageSize = 10,
        orderBy = 'date',
        sort = 'ASC',
        initialDate = null,
        finalDate = null,
        id = null,
      } = req.query;
      const params = {
        page,
        pageSize,
        orderBy,
        sort,
        initialDate,
        finalDate,
        id,
      };

      const { count, data } = await orderUseCase.getAllOrders(params);

      const resp = buildResponseWithPagination(serializableOrders(data), {
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
      const resp = buildResponse(serializableOrder(data));

      res.status(status.OK).json(resp);
    } catch (error) {
      next(error);
    }
  },

  uploadOrders: async (req, res, next) => {
    try {
      const { file } = req;
      const data = await orderUseCase.uploadOrders(file);
      const resp = buildResponse(data, 'Pedidos processados com sucesso!');

      res.status(status.CREATED).json(resp);
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
