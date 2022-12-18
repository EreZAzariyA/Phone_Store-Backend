import express, { Request, Response, NextFunction } from "express";
import OrderModel from "../03-Models/order-model";
import ordersLogic from "../05-BLL/orders-logic";

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
            const orderToSet = new OrderModel(req.body);
            const order = await ordersLogic.setNewOrder(orderToSet);
            res.status(200).json(order);
      } catch (err: any) {
            next(err);
      }
});

router.get('/users-orders/:userEmail', async (req: Request, res: Response, next: NextFunction) => {
      try {
            const userEmail = req.params.userEmail;            
            const userOrders = await ordersLogic.getUserOrders(userEmail);
            res.json(userOrders);
      } catch (err: any) {
            next(err);
      }
});

router.get("/guests-orders", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const orders = await ordersLogic.getOnlyGuestsOrders();
            res.json(orders);
      } catch (err: any) {
            next(err);
      }
});



export default router;