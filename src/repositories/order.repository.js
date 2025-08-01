import { Op } from "sequelize";
import Order from "../models/order.model.js";
import OrderProduct from "../models/order.product.model.js";

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
          as: "products",
        },
      ],
    });

    return { count, data: rows };
  },

  getOrderById: async (id) => {
    const row = await Order.findByPk(id, {
      include: [
        {
          model: OrderProduct,
          as: "products",
        },
      ],
    });

    if (!row) return { found: false, data: null };

    return { found: true, data: row };
  },

  createOrder: async (body) => {
    const row = await Order.create(body);

    return { data: row };
  },
};

export default orderRepository;
