export interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export type UpdateProduct = Omit<Product, 'id'>;
