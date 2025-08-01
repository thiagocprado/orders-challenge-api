import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/database.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tb_users',
    timestamps: true,
  }
);

export default User;
