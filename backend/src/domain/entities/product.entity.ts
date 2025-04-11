export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  inventoryQuantity: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Category {
  id: string;
  name: string;
  description?: string;
}
