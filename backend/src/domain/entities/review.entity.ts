import { User } from './user.entity';
import { Product } from './product.entity';

export class Review {
  id: string;
  user: User;
  product: Product;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
