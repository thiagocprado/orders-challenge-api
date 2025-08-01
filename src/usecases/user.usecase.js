import { BadRequest, NotFound } from '../commons/error.js';

const userUseCase = (userRepository) => ({
  getAllUsers: async (params) => {
    const { count, data } = await userRepository.getAllUsers(params);
    return { count, data };
  },

  getUserById: async (id) => {
    if (!id || isNaN(Number(id))) {
      throw new BadRequest('É preciso informar um ID válido!');
    }

    const { found, data } = await userRepository.getUserById(id);
    if (!found) {
      throw new NotFound('Usuário não encontrado!');
    }

    return data;
  },
});

export default userUseCase;
