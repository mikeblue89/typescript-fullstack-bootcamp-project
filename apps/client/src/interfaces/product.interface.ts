export interface Product {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price: number;
  variants?: Variant [];
}

export interface Variant {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price: number;
  stockQuantity: number;
}

