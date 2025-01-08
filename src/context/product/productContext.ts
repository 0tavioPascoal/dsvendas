import { httpClient } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Product } from "@/types/models/product/product"; 

const resourceUrl:string = "/products"

export const useProductService = () => {
  const save = async (product : Product) : Promise<Product> => {
      const response: AxiosResponse<Product> = await httpClient.post<Product>(resourceUrl, product)
    return response.data
  }

  return{
    save
  }
}