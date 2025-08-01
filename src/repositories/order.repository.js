import { Op } from 'sequelize';
import Order from '../models/order.model.js';
import OrderProduct from '../models/order.product.model.js';
import { InternalServerError } from '../commons/error.js';

const orderRepository = {
  getAllOrders: async (params) => {
    const offset = (Number(params.page) - 1) * Number(params.pageSize);
    const limit = Number(params.pageSize);
    const orderBy = params.orderBy;
    const sort = params.sort.toUpperCase();
    const filters = [];

    if (params.initialDate) {
      filters.push({
        date: {
          [Op.gte]: new Date(params.initialDate),
        },
      });
    }

    if (params.finalDate) {
      filters.push({
        date: {
          [Op.lte]: new Date(params.finalDate),
        },
      });
    }

    if (params.id) {
      filters.push({ id: params.id });
    }

    try {
      const { count, rows } = await Order.findAndCountAll({
        where: {
          [Op.and]: filters,
        },
        limit,
        offset,
        order: [[orderBy, sort]],
        include: [
          {
            model: OrderProduct,
            as: 'products',
          },
        ],
      });

      return { count, data: rows };
    } catch (error) {
      throw new InternalServerError('Erro ao buscar pedidos na base de dados', error);
    }
  },

  getOrderById: async (id) => {
    try {
      const row = await Order.findByPk(id, {
        include: [
          {
            model: OrderProduct,
            as: 'products',
          },
        ],
      });

      if (!row) return { found: false, data: null };

      return { found: true, data: row };
    } catch (error) {
      throw new InternalServerError('Erro ao buscar pedido na base de dados', error);
    }
  },

  createOrder: async (body) => {
    try {
      const row = await Order.create(body);

      return { data: row };
    } catch (error) {
      throw new InternalServerError('Erro ao criar pedido na base de dados', error);
    }
  },
};

export default orderRepository;
