import { CLient } from "../clients/clients";
import { Product } from "../products/product";

export interface Sell{
  client?: CLient,
  product?: Array<Product>,
  total?: number,
  payment?: string
}