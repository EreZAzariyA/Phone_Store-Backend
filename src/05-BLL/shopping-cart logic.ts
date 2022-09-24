import ShoppingCartModel from "../03-Models/shopping-cart model";
import dal from "../04-DAL/dal";
import { v4 as uuid } from "uuid";
import ClientError from "../03-Models/client-error";
import ItemInCartModel from "../03-Models/item-in-cart model";

// In register / If user don`t have shopping cart
async function createNewShoppingCartForNewUsers(userId: string): Promise<ShoppingCartModel> {
      // Check if user already have shopping cart;
      const cartsSql = "SELECT * FROM shopping_carts";
      const shopping_carts: ShoppingCartModel[] = await dal.execute(cartsSql);
      if (shopping_carts.find(cart => cart.userId === userId)) {
            throw new ClientError(400, "User already have shopping cart")
      } else {
            const shoppingCart = new ShoppingCartModel();
            shoppingCart.userId = userId;
            shoppingCart.cartId = uuid();
            shoppingCart.createDate = new Date();
            const sql = `INSERT INTO shopping_carts VALUES (
                                                      '${shoppingCart.cartId}',
                                                      '${shoppingCart.userId}',
                                                      '${shoppingCart.createDate}')`;
            await dal.execute(sql);

            return shoppingCart;
      }
}

// Get user shopping cart by userId:
async function getUserShoppingCartByUserId(userId: string): Promise<ShoppingCartModel> {
      const sql = `SELECT * FROM shopping_carts WHERE userId = '${userId}'`;
      const shoppingCarts = await dal.execute(sql);
      const shoppingCart = shoppingCarts[0];
      return shoppingCart;
}

// Get items from shopping cart by shopping-cart-id:
async function getItemsFromCartByShoppingCartId(shoppingCartId: string): Promise<ItemInCartModel[]>{
      // Check if user have cart:
      const cartCheckSql = `SELECT * FROM shopping_carts WHERE cartId = '${shoppingCartId}'`;
      const cart = await dal.execute(cartCheckSql);
      if (!cart) {
            throw new ClientError(400, "No shopping cart");
      }

      const sql = `SELECT * FROM items_in_cart WHERE cartId = '${shoppingCartId}'`;
      const itemsInCart = await dal.execute(sql);
      return itemsInCart;
}

// Add item into shopping-cart:
async function addItemToShoppingCart(itemToAdd:ItemInCartModel): Promise<void>{
      const sql = `INSERT INTO items_in_cart VALUES (
                                                '${itemToAdd.cartId}',
                                                '${itemToAdd.phoneId}',
                                                '${itemToAdd.stock}',
                                                '${itemToAdd.totalPrice}')`;
      await dal.execute(sql);
}

async function updateStockInCart(phoneInCartToUpdate:ItemInCartModel): Promise<ItemInCartModel>{
      const sql = `UPDATE items_in_cart SET phoneId = '${phoneInCartToUpdate.phoneId}', cartId = '${phoneInCartToUpdate.cartId}', stock = '${phoneInCartToUpdate.stock}', totalPrice = '${phoneInCartToUpdate.totalPrice}' WHERE phoneId = '${phoneInCartToUpdate.phoneId}' AND cartId = '${phoneInCartToUpdate.cartId}'`;
      await dal.execute(sql);
      const updatedItem = new ItemInCartModel(phoneInCartToUpdate);
      return updatedItem;
}


async function removeItemFromCart(phoneIdToRemove: string, cartId: string): Promise<void>{
      const sql = `REMOVE FROM items_in_cart WHERE phoneId = '${phoneIdToRemove}' AND cartId = '${cartId}'`;
      await dal.execute(sql);
}

export default {
      createNewShoppingCartForNewUsers,
      getUserShoppingCartByUserId,
      getItemsFromCartByShoppingCartId,
      addItemToShoppingCart,
      removeItemFromCart,
      updateStockInCart
}