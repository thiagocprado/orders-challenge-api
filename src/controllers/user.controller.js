import { status } from 'http-status';
import { buildResponse, buildResponseWithPagination } from '../commons/response.js';
import { serializableUser, serializableUsers } from '../serializable/user.serializable.js';

const userController = (userUseCase) => {
  const getAllUsersOrders = async (req, res, next) => {
    try {
      const { page = 1, pageSize = 10, orderBy = 'createdAt', sort = 'ASC' } = req.query;
      const params = {
        page,
        pageSize,
        orderBy,
        sort,
      };

      const { count, data } = await userUseCase.getAllUsersOrders(params);

      const resp = buildResponseWithPagination(serializableUsers(data), {
        ...params,
        total: count,
      });

      res.status(status.OK).json(resp);
    } catch (error) {
      next(error);
    }
  };

  const getUserOrdersById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userUseCase.getUserOrdersById(id);
      const resp = buildResponse(serializableUser(data));

      res.status(status.OK).json(resp);
    } catch (error) {
      next(error);
    }
  };

  return {
    getAllUsersOrders,
    getUserOrdersById,
  };
};

export default userController;
