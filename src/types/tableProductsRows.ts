import { Product } from "./product";

export interface TableProductsRows{
  ProductsRows : Array<Product>
  onDelete: (product:Product) => void,
  onEdit: (product:Product ) => void
}