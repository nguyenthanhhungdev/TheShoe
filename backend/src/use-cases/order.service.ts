import { Order } from '../domain/entities/order.entity';

export interface OrderService {
  createOrder(
    userId: string,
    items: { productId: string; quantity: number }[],
  ): Promise<Order>;
  updateOrderStatus(orderId: string, status: string): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  listOrdersByUser(userId: string): Promise<Order[]>;
  cancelOrder(orderId: string): Promise<void>;
}
