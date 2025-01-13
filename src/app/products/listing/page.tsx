'use client'

import { Layout } from "@/components/Layout/layout"
import Link from "next/link"
import React from "react"
import { TableListing} from "@/components/common/tableListing"
import useSWR from 'swr'
import { Product } from "@/types/product"
import { httpClient } from "@/lib/axios"
import { AxiosResponse } from "axios"

export default function Listing () {

const {data: result} = useSWR<AxiosResponse<Product[]>>('/products' , (url: string) => httpClient.get(url))
if(!result){
  return(
      <h1>loading...</h1>
  )
}

  return(
      <Layout titulo="Listing for Products" >
       <br/>
        <TableListing ProductsRows={result?.data || []}/>
        <br/>
        <Link href="register" >
          <button className="button is-success is-rounded">Novo</button>
        </Link>
      </Layout>
    )
}