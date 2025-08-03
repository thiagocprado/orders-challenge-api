import { Op } from 'sequelize';
import Order from '../models/order.model.js';
import OrderProduct from '../models/order.product.model.js';
import { InternalServerError } from '../commons/error.js';

const orderRepository = () => {
  const getAllOrders = async (params) => {
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
      throw new InternalServerError('Houve um erro inesperado ao buscar os pedidos', error);
    }
  };

  const getOrderById = async (id) => {
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
      throw new InternalServerError('Houve um erro inesperado ao buscar o pedido', error);
    }
  };

  const createOrder = async (body) => {
    try {
      const row = await Order.create(body);

      return { data: row };
    } catch (error) {
      throw new InternalServerError('Houve um erro inesperado ao criar o pedido', error);
    }
  };

  const findOrCreateOrder = async (orderData) => {
    try {
      const [order, created] = await Order.findOrCreate({
        where: { id: orderData.id },
        defaults: orderData,
      });

      return { data: order, created };
    } catch (error) {
      throw new InternalServerError('Houve um erro inesperado ao buscar/criar o pedido', error);
    }
  };

  return {
    getAllOrders,
    getOrderById,
    createOrder,
    findOrCreateOrder,
  };
};

export default orderRepository;
