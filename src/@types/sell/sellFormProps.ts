import { Sell } from "@/models/sell/sell";

export interface sellFormProps{
  onSubmit: (sell: Sell) => void,
  saleMade: boolean,
  onSaleMade: () => void
}