"use client"

import { FormSell } from "@/components/common/form-sell/form-sell";
import { Layout } from "@/components/Layout/layout";
import { Sell } from "@/models/sell/sell";
import { sellService } from "@/context/sellContext";
import { AlertProps } from "@/types/AlertProps";
import { useState } from "react";

export default function Sells () {
const service = sellService()
const [messages, setMessages] = useState<AlertProps[]>([])

const handleSubmit = (sell : Sell) => {
  service.sell(sell).then(response => 
    setMessages([{
      text: 'Successful sale', color: 'is-success'
    }])
   ).catch(e => setMessages([{
    text:'error when making the sale', color:'is-danger'
   }]))
}



  return(
    <Layout titulo="Sales" messages={messages}>
     <FormSell onSubmit={handleSubmit}/>
    </Layout>
  )
}