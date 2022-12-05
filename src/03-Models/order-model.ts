interface paymentMethodInterface {
      creditCard?: {
            cardNumber: number;
            expiredDate: Date;
            securityNumber: number;
      },
      paypal?: {
            unknown: string;
      }


}

class OrderModel {
      public orderId: string;
      public email: string;
      public fullName: string;
      public zipCode: number;
      public city: string;
      public address: string;
      public paymentMethod: paymentMethodInterface;
      public orderDate: Date;
      public receivingDeliveryDate: Date;

      constructor(order: OrderModel) {
            this.email = order.email;
            this.fullName = order.fullName;
            this.zipCode = order.zipCode;
            this.city = order.city;
            this.address = order.address;
            this.paymentMethod = order.paymentMethod;
            this.orderDate = order.orderDate;
            this.receivingDeliveryDate = order.receivingDeliveryDate;
      }
}
export default OrderModel;