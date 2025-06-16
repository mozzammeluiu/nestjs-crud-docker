export interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
  productDetails: ProductDetails;
}
export interface ProductDetails {
  id?: number;
  part_number: string;
  dimension: string;
  weight: number;
  manufacturer: string;
  origin: string;
}

export type UpdateProduct = Partial<
  Pick<Product, 'name' | 'qty' | 'price'> & ProductDetails
>;
