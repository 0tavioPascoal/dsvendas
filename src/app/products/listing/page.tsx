"use client";

import { Layout } from "@/components/Layout/layout";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { TableListing } from "@/components/common/tableListing";
import useSWR from "swr";
import { Product } from "@/types/product";
import { httpClient } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Loader } from "@/components/common/loader";

export default function Listing() {
  const router = useRouter();
  const { data: result } = useSWR<AxiosResponse<Product[]>>(
    "/products",
    (url: string) => httpClient.get(url)
  );

  const editingProd = (product: Product) => {
    const url = `/products/register?id=${product.id}`;
    router.push(url);
  };

  const deleteProd = (product: Product) => {
    console.log(product);
  };

  return (
    <Layout titulo="Listing for Products" >
      <Link href="register" className="is-flex is-justify-content-flex-end mr-5 is-align-items-center">
        <button className="button is-success is-rounded has-text-weight-bold is-uppercase is-focused  ">
        <AiOutlinePlus size={15} width={15} color="#FFFF"/>
          Novo
        </button>
      </Link>
      <br/>
      <br />
      <Loader show={!result} />
      <TableListing
        onDelete={deleteProd}
        onEdit={editingProd}
        ProductsRows={result?.data || []}
      />
      <br />
    </Layout>
  );
}
