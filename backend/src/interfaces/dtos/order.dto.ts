export class CreateOrderDto {
  items: {
    productId: string;
    quantity: number;
  }[];
}

export class UpdateOrderStatusDto {
  status: string;
}
