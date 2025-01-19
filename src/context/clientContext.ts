import { httpClient } from "@/lib/axios";
import { CLient } from "@/models/clients/clients";
import { AxiosResponse } from "axios";
import { Page } from "@/types/page";

const clientUrl:string = "clients"

export const useClientService = () => {
  const save = async (client : CLient) : Promise<CLient> => {
       const response: AxiosResponse<CLient> = await httpClient.post<CLient>(clientUrl, client)
     return response.data
   }

  const updatedClient = async (client: CLient) : Promise<void> => {
    const urlId: string = `${clientUrl}?id=${client.id}`
      await httpClient.put<CLient>(urlId, client)
  }

  const getClientForId = async (id: string) : Promise<CLient> => {
    const urlGetId: string = `${clientUrl}/${id}`
    const response: AxiosResponse<CLient> = await httpClient.get<CLient>(urlGetId)
    return response.data
  }  

  const deleteClient = async (id:string) : Promise<void> => {
    const url: string = `${clientUrl}?id=${id}`;
    console.log(url)
    await httpClient.delete(url);
  }

  const find = async (page: number = 0, size: number = 10, name: string = '', cpf: string = '') : Promise<Page<CLient>>=> {
    const url = `${clientUrl}?page=${page}&sizePage=${size}&name=${name}&cpf=${cpf}`
    const response: AxiosResponse<Page<CLient>> = await httpClient.get(url)
    console.log(response.data)
    return response.data
  }
  return{
    deleteClient,
    getClientForId,
    save,
    find,
    updatedClient
  }
}