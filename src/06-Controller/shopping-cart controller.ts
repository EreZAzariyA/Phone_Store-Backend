import express, { NextFunction, Request, Response } from "express";
import ItemInCartModel from "../03-Models/item-in-cart model";
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

// Get items from shopping cart by shopping-cart-id:
router.get("/items-in-cart/:shoppingCartId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const shoppingCartId = req.params.shoppingCartId;
            const itemsInCart = await shoppingCartLogic.getItemsFromCartByShoppingCartId(shoppingCartId);
            res.json(itemsInCart);
      } catch (err: any) {
            next(err);
      }
});

// Add item into shopping-cart:
router.post("/add-item-to-cart", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const itemToAdd = new ItemInCartModel(req.body);
            const addedItem = await shoppingCartLogic.addItemToShoppingCart(itemToAdd);
            res.status(200).json(addedItem);
      } catch (err: any) {
            next(err);
      }
});

router.patch("/update-item-in-cart", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const itemToUpdate = new ItemInCartModel(req.body);
            const updatedItem = await shoppingCartLogic.updateStockInCart(itemToUpdate);
            res.status(200).json(updatedItem);
      } catch (err: any) {
            next(err);
      }
});


router.delete("/delete-from-cart/:phoneIdToRemove/:cartId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const phoneIdToRemove = req.params.phoneIdToRemove;
            const cartId = req.params.cartId;
            await shoppingCartLogic.removeItemFromCart(phoneIdToRemove, cartId);
            res.status(200).send(console.log("Deleted"));
      } catch (err: any) {
            next(err);
      }
});




export default router;