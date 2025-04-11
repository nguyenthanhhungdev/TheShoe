import { Promotion } from '../domain/entities/promotion.entity';

export interface PromotionService {
  createPromotion(data: Partial<Promotion>): Promise<Promotion>;
  updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion>;
  deletePromotion(id: string): Promise<void>;
  getActivePromotions(): Promise<Promotion[]>;
  getPromotionById(id: string): Promise<Promotion | null>;
}
