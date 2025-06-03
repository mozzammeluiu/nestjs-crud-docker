export interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
  productDetails: ProductDetails;
}
export interface ProductDetails {
  part_number: string;
  dimension: string;
  weight: number;
  manufacturer: string;
  origin: string;
}
export type UpdateProduct = Omit<Product, 'id' | 'productDetails'>;
