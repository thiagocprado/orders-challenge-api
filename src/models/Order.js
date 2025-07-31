import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "tb_orders",
    timestamps: true,
  }
);

export default Order;
