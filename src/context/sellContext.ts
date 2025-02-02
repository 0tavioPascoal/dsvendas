import { httpClient } from "@/lib/axios"
import { Sell } from "@/models/sell/sell"

const resourceUrl: string = "/sell"

export const sellService = () => {
    const sell = async (sell : Sell): Promise<void> => {
      await httpClient.post<Sell>(resourceUrl, sell)
    }
  return{
    sell
  }
}