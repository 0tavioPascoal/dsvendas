'use client'

import { Layout } from "@/components/Layout/layout"
import Link from "next/link"
import React from "react"
import { TableListing} from "@/components/common/tableListing"
import useSWR from 'swr'
import { Product } from "@/types/product"
import { httpClient } from "@/lib/axios"
import { AxiosResponse } from "axios"
import { Loader } from "@/components/common/loader"

export default function Listing () {

const {data: result} = useSWR<AxiosResponse<Product[]>>('/products' , (url: string) => httpClient.get(url))


  return(
      <Layout titulo="Listing for Products" >
       <br/>   
       <Loader show={!result}/>
        <TableListing ProductsRows={result?.data || []}/>
        <br/>
        <Link href="register" >
          <button className="button is-success is-rounded">Novo</button>
        </Link>
      </Layout>
    )
}