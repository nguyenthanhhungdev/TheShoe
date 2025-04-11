import { Cart } from '../domain/entities/cart.entity';

export interface CartService {
  getCartByUserId(userId: string): Promise<Cart | null>;
  addItem(userId: string, productId: string, quantity: number): Promise<Cart>;
  updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart>;
  removeItem(userId: string, productId: string): Promise<Cart>;
  clearCart(userId: string): Promise<void>;
}
