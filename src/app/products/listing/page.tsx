"use client";

import { Layout } from "@/components/Layout/layout";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { TableListing } from "@/components/common/tableProducts/tableListing";
import useSWR from "swr";
import { Product } from "@/models/products/product";
import { httpClient } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Loader } from "@/components/common/loader";
import { useProductService } from "@/context/productContext";
import { AlertProps } from "@/@types/common/AlertProps";
import { useSession } from "next-auth/react";

export default function Listing() {
  const router = useRouter();
  const service = useProductService();
  const [messages, setMessages] = useState<Array<AlertProps>>([])
  const [list, setList] = useState<Product[]>([])

  

  const { data: result } = useSWR<AxiosResponse<Product[]>>(
    "/products",
    (url: string) => httpClient.get(url)
  );

  useEffect(()=>{
    setList(result?.data || [])
  }, [result])

  const editingProd = (product: Product) => {
    const url = `/products/register?id=${product.id}`;
    router.push(url);
  };

  const {data: userSession} = useSession()
  if(!userSession) return redirect("/")
    
  const deleteProd = (product: Product) => {
    if(!product.id){
      console.log('id n chegou')
      return
    }
    service.deleteProduct(product.id).then(() => {
      setMessages([
        {color:"is-success", text:"Produto excluido com sucesso"}
      ])
    })
    
    const alteredList: Product[] = list?.filter(p => p.id !== product.id) || [];
    setList(alteredList);
  };

  return (
    <Layout titulo="Listing for Products" messages={messages} >
      <Link href="register" className="is-flex is-justify-content-flex-end mr-5 is-align-items-center">
        <button className="button is-success is-rounded has-text-weight-bold is-uppercase is-focused  ">
        <AiOutlinePlus size={15} width={15} color="#FFFF"/>
          New
        </button>
      </Link>
      <br/>
      <br />
      <Loader show={!result} />
      <TableListing
        onDelete={deleteProd}
        onEdit={editingProd}
        ProductsRows={list  || []}
      />
      <br />
    </Layout>
  );
}
