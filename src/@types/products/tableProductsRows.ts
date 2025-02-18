import { Product } from "@/models/products/product";

export interface TableProductsRows{
  ProductsRows : Array<Product>
  onEdit: (product:Product ) => void,
  onDelete: (product:Product) => void
}