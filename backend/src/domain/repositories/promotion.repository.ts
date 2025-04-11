import { Promotion } from '../entities/promotion.entity';

export interface PromotionRepository {
  findActive(): Promise<Promotion[]>;
  findById(id: string): Promise<Promotion | null>;
  save(promotion: Promotion): Promise<Promotion>;
  delete(id: string): Promise<void>;
}
