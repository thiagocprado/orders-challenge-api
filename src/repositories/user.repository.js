import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import OrderProduct from "../models/order.product.model.js";

const userRepository = {
  getAllUsers: async (params) => {
    const offset = (Number(params.page) - 1) * Number(params.pageSize);
    const limit = Number(params.pageSize);
    const orderBy = params.orderBy;
    const sort = params.sort.toUpperCase();

    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      order: [[orderBy, sort]],
      include: [
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: OrderProduct,
              as: "products",
            },
          ],
        },
      ],
    });

    return { count, data: rows };
  },
  getUserById: async (id) => {
    const row = await User.findByPk(id, {
      include: [
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: OrderProduct,
              as: "products",
            },
          ],
        },
      ],
    });

    if (!row) return { found: false, data: null };

    return { found: true, data: row };
  },
  createUser: async (body) => {
    const row = await User.create(body);

    return { data: row };
  },
};

export default userRepository;
