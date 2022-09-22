import ShoppingCartModel from "../03-Models/shopping-cart model";
import dal from "../04-DAL/dal";
import { v4 as uuid } from "uuid";
import ClientError from "../03-Models/client-error";

async function createNewShoppingCart(userId: string): Promise<ShoppingCartModel> {
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

export default {
      createNewShoppingCart
}