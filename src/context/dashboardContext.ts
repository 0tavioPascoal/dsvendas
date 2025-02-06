import { httpClient } from "@/lib/axios"
import { DashboardData } from "@/types/dashboard/dashboardData"
import { AxiosResponse } from "axios"

export const useDashboardService = () => {
  const urlDashboard: string = "/dashboard"

  const getDashboard = async (): Promise<DashboardData> => {
    const response:AxiosResponse = await httpClient.get(urlDashboard)
    return response.data
  }
  return{
    getDashboard
  }
} 