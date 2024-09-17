// order.dto.ts
export class CreateOrderDto {
    cartItems: {
      product: string;
      quantity: number;
      price: number;
    }[];
    totalPrice: number;
    address: {
      houseNumber: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  }
  