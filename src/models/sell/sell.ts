import { CLient } from "../clients/clients";
import { Product } from "../products/product";

export interface Sell{
  client?: CLient,
  itens?: Array<itenSell>
  total?: number,
  payment?: string
}

export interface itenSell {
  product: Product,
  amount: number
}