import { httpClient } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Product } from "@/models/products/product"; 

const resourceUrl:string = "/products"


export const useProductService = () => {
  const save = async (product : Product) : Promise<Product> => {
      const response: AxiosResponse<Product> = await httpClient.post<Product>(resourceUrl, product)
    return response.data
  }

  const updatedProduct = async (product: Product) : Promise<void> => {
    const urlId: string = `${resourceUrl}/${product.id}`
      await httpClient.put<Product>(urlId, product)
  }

  const getProductForId = async (id: string) : Promise<Product> => {
    const urlGetId: string = `${resourceUrl}/${id}`
    const response: AxiosResponse<Product> = await httpClient.get<Product>(urlGetId)
    return response.data
  }  

  const deleteProduct = async (id:string) : Promise<void> => {
    const url: string = `${resourceUrl}?id=${id}`;
    console.log(url)
    await httpClient.delete(url);
  }

  return{
    updatedProduct,
    save,
    getProductForId,
    deleteProduct
  }
}