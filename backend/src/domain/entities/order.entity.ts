import { User } from './user.entity';
import { Product } from './product.entity';

export class Order {
  id: string;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}
