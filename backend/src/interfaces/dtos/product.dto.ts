export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  inventoryQuantity: number;
  images: string[];
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  inventoryQuantity?: number;
  images?: string[];
}
