import { BadRequest, NotFound } from '../commons/error.js';

const userUseCase = (userRepository) => {
  const getAllUsersOrders = async (params) => {
    const { count, data } = await userRepository.getAllUsersOrders(params);
    return { count, data };
  };

  const getUserOrdersById = async (id) => {
    if (!id || isNaN(Number(id))) {
      throw new BadRequest('É preciso informar um ID válido!');
    }

    const { found, data } = await userRepository.getUserOrdersById(id);
    if (!found) {
      throw new NotFound('Usuário não encontrado!');
    }

    return data;
  };

  return {
    getAllUsersOrders,
    getUserOrdersById,
  };
};

export default userUseCase;
