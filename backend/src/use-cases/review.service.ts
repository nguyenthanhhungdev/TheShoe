import { Review } from '../domain/entities/review.entity';

export interface ReviewService {
  addReview(
    userId: string,
    productId: string,
    rating: number,
    comment: string,
  ): Promise<Review>;
  updateReview(
    reviewId: string,
    rating: number,
    comment: string,
  ): Promise<Review>;
  deleteReview(reviewId: string): Promise<void>;
  getReviewsByProduct(productId: string): Promise<Review[]>;
  getReviewsByUser(userId: string): Promise<Review[]>;
}
