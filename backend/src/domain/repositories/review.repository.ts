import { Review } from '../entities/review.entity';

export interface ReviewRepository {
  findByProductId(productId: string): Promise<Review[]>;
  findByUserId(userId: string): Promise<Review[]>;
  save(review: Review): Promise<Review>;
  delete(id: string): Promise<void>;
}
