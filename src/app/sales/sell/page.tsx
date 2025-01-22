"use client"

import { FormSell } from "@/components/common/form-sell/form-sell";
import { Layout } from "@/components/Layout/layout";
import { Sell } from "@/models/sell/sell";

export default function Sells () {
const handleSubmit = (sell : Sell) => {
  console.log(sell)
}

  return(
    <Layout titulo="Sales">
     <FormSell onSubmit={handleSubmit}/>
    </Layout>
  )
}