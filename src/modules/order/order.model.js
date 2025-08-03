import { DataTypes } from 'sequelize';
import { sequelize } from '../../configs/database.js';

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: 'tb_orders',
    timestamps: true,
  }
);

export default Order;
