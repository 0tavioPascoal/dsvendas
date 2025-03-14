import { SellPerMonth } from "./sellPerMonth"

export interface DashboardData{
  clientCount?: number,
  productCount?: number,
  sellCount?: number
  sellPerMonth?: Array<SellPerMonth>
}