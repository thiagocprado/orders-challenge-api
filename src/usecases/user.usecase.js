import userRepository from "../repositories/user.repository.js";
import { BadRequest, InternalServerError, NotFound } from "../commons/error.js";

const userUseCase = {
  getAllUsers: async (params) => {
    try {
      const { count, data } = await userRepository.getAllUsers(params);

      return { count, data };
    } catch (error) {
      throw new InternalServerError(
        "Houve uma falha interna ao buscar usuários!",
        error
      );
    }
  },

  getUserById: async (id) => {
    try {
      if (!id || isNaN(Number(id))) {
        throw new BadRequest("É preciso informar um ID válido!");
      }

      const { found, data } = await userRepository.getUserById(id);

      if (!found) {
        throw new NotFound("Usuário não encontrado!");
      }

      return data;
    } catch (error) {
      throw new InternalServerError(
        "Houve uma falha interna ao buscar o usuário!",
        error
      );
    }
  },
};

export default userUseCase;
