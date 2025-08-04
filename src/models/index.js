import User from './user.model.js';
import Order from './order.model.js';
import OrderProduct from './order.product.model.js';

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasMany(OrderProduct, { foreignKey: 'orderId', as: 'products' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

export { User, Order, OrderProduct };
