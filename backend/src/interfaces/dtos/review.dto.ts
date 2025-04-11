export class AddReviewDto {
  productId: string;
  rating: number;
  comment: string;
}

export class UpdateReviewDto {
  rating: number;
  comment: string;
}
