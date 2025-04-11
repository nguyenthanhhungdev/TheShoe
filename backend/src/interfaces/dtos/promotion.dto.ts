export class CreatePromotionDto {
  name: string;
  description: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export class UpdatePromotionDto {
  name?: string;
  description?: string;
  discountPercentage?: number;
  startDate?: Date;
  endDate?: Date;
  active?: boolean;
}
