import { Product } from "../models/products/product";

export interface ListingProps{
  Product: Product
  onDelete : (product:Product) => void,
  onEdit: (product:Product) => void
}