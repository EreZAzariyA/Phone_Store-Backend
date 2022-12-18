import moment from "moment";
import { v4 as uuid } from "uuid";
import ClientError from "../03-Models/client-error";
import OrderModel from "../03-Models/order-model";
import UserModel from "../03-Models/user-model";
import dal from "../04-DAL/dal";


async function setNewOrder(order: OrderModel): Promise<OrderModel> {
      order.orderId = uuid();
      const today = new Date();
      order.orderDate = moment(today).format("YYYY-MM-DD") as any;
      order.receivingDeliveryDate = moment().add(5, 'days').format("YYYY-MM-DD") as any;

      const sql = `INSERT INTO orders VALUES(
                                          '${order.orderId}',
                                          '${order.email}',
                                          '${order.fullName}',
                                          '${order.zipCode}',
                                          '${order.city}',
                                          '${order.address}',
                                          '${order.paymentMethod.creditCard.cardNumber}',
                                          '${order.paymentMethod.creditCard.expiredDate}',
                                          '${order.paymentMethod.creditCard.securityNumber}',
                                          '${order.orderDate}',
                                          '${order.receivingDeliveryDate}')`
      await dal.execute(sql);
      return order;
}

async function getUserOrders(userEmail: string): Promise<OrderModel[]> {
      const sql = `SELECT * FROM orders WHERE email = '${userEmail}'`;
      const orders = await dal.execute(sql);
      if (!orders) {
            throw new ClientError(404, 'No orders found for this user email');
      }
      return orders;
}

async function getOnlyGuestsOrders(): Promise<OrderModel[]> {
      // Get all users:
      const usersSql = 'SELECT * FROM users';
      const users: UserModel[] = await dal.execute(usersSql);
      // Get all orders:
      const ordersSql = 'SELECT * FROM orders';
      const orders: OrderModel[] = await dal.execute(ordersSql);
      // Set new list to undefine emails:
      const guestsOrders: OrderModel[] = [];
      // Search for undefine orders and push them to the undefine email`s list:
      orders.forEach(order => {
            if (users.find(user => user?.email === order?.email)) {
                  return;
            } else {
                  guestsOrders.push(order);
            }
      }
      );
      return guestsOrders;
}

export default {
      setNewOrder,
      getUserOrders,
      getOnlyGuestsOrders
}