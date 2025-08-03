import User from '../modules/user/user.model.js';
import Order from '../modules/order/order.model.js';
import OrderProduct from '../modules/orderProduct/order.product.model.js';

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasMany(OrderProduct, { foreignKey: 'orderId', as: 'products' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

export { User, Order, OrderProduct };
