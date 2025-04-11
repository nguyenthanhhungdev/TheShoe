import { User } from './user.entity';
import { Product } from './product.entity';

export class Cart {
  id: string;
  user: User;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export class CartItem {
  id: string;
  product: Product;
  quantity: number;
}
