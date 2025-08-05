import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/database.js';

const OrderProduct = sequelize.define(
  'OrderProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tb_orders_products',
    timestamps: true,
    indexes: [
      {
        name: 'idx_order_id',
        fields: ['orderId'],
      },
      {
        name: 'idx_product_id',
        fields: ['productId'],
      },
      {
        unique: true,
        name: 'uniq_order_product',
        fields: ['orderId', 'productId'],
      },
    ],
  }
);

export default OrderProduct;
