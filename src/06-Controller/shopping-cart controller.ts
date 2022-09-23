import express, { NextFunction, Request, Response } from "express";
import ShoppingCartModel from "../03-Models/shopping-cart model";
import shoppingCartLogic from "../05-BLL/shopping-cart logic";

const router = express.Router();

// Get user shopping-cart by user id:
router.get("/user-cart/:userId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const userId = req.params.userId;
            const shoppingCart = await shoppingCartLogic.getUserShoppingCartByUserId(userId);
            res.json(shoppingCart);
      } catch (err: any) {
            next(err);
      }
});



export default router;