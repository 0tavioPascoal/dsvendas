import { httpClient } from "@/lib/axios"
import { AxiosResponse } from "axios"

export const useReportService = () => {
  const urlReport: string = "/reports"

  const findReport = async (idClient: string = '0', startDate: string = '', finaldate: string = ''): Promise<Blob> => {
    const url = `${urlReport}?idClient=${idClient}&startDate=${startDate}&finalDate=${finaldate}`
    const response:AxiosResponse = await httpClient.get(url, {responseType: "blob"})
    const bytes = response.data
    return new Blob([bytes], {type: 'application/pdf'} )
  }

  return{
    findReport
  }
} 