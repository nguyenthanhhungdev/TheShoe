import { Controller } from '@nestjs/common';

@Controller('orders')
export class OrderController {
  constructor(/* private readonly orderService: OrderService */) {}

  // Define endpoints: create order, update status, get by id, list by user, cancel
}
