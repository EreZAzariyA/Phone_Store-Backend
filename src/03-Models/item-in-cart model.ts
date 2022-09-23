class ItemInCartModel {
      cartId: string;
      phoneId: string;
      stock: number;
      totalPrice: number;

      constructor(itemInCart:ItemInCartModel) {
            this.cartId = itemInCart.cartId;
            this.phoneId = itemInCart.phoneId;
            this.stock = itemInCart.stock;
            this.totalPrice = itemInCart.totalPrice;
      }
}

export default ItemInCartModel