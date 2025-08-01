import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import OrderProduct from '../models/order.product.model.js';
import { InternalServerError } from '../commons/error.js';

const userRepository = {
  getAllUsers: async (params) => {
    const offset = (Number(params.page) - 1) * Number(params.pageSize);
    const limit = Number(params.pageSize);
    const orderBy = params.orderBy;
    const sort = params.sort.toUpperCase();

    try {
      const { count, rows } = await User.findAndCountAll({
        limit,
        offset,
        order: [[orderBy, sort]],
        include: [
          {
            model: Order,
            as: 'orders',
            include: [
              {
                model: OrderProduct,
                as: 'products',
              },
            ],
          },
        ],
      });

      return { count, data: rows };
    } catch (error) {
      throw new InternalServerError('Erro ao buscar usuários na base de dados', error);
    }
  },

  getUserById: async (id) => {
    try {
      const row = await User.findByPk(id, {
        include: [
          {
            model: Order,
            as: 'orders',
            include: [
              {
                model: OrderProduct,
                as: 'products',
              },
            ],
          },
        ],
      });

      if (!row) return { found: false, data: null };

      return { found: true, data: row };
    } catch (error) {
      throw new InternalServerError('Erro ao buscar usuário na base de dados', error);
    }
  },

  createUser: async (body) => {
    try {
      const row = await User.create(body);

      return { data: row };
    } catch (error) {
      throw new InternalServerError('Erro ao criar usuário na base de dados', error);
    }
  },
};

export default userRepository;
