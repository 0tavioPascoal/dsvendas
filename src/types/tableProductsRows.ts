import { Product } from "../models/products/product";

export interface TableProductsRows{
  ProductsRows : Array<Product>
  onDelete: (product:Product) => void,
  onEdit: (product:Product ) => void
}