import { SellPerMonth } from "./sellPerMonth"

export interface DashboardProps{
  clientCount?: number,
  sellCount?: number,
  productCount?: number
  sellPerMonth: Array<SellPerMonth>
}