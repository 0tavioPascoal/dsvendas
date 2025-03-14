"use client"

import { FormSell } from "@/components/common/form-sell/form-sell";
import { Layout } from "@/components/Layout/layout";
import { Sell } from "@/models/sell/sell";
import { sellService } from "@/context/sellContext";
import { AlertProps } from "@/@types/common/AlertProps";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Sells () {
const service = sellService()
const [messages, setMessages] = useState<AlertProps[]>([])
const [saleMade, setSaleMade] = useState<boolean>(false)

const handleSubmit = (sell: Sell) => {
  service.sell(sell)
    .then(() => {
      setSaleMade(true);
      setMessages([{ text: 'Successful sale', color: 'is-success' }]);
    })
    .catch(() => {
      setMessages([{ text: 'Error when making the sale', color: 'is-danger' }]);
    });
};

const handleOnSaleMade = () => {
  setSaleMade(false)
}

const {data: sessionUser} = useSession()
if(!sessionUser) redirect("/")

  return(
    <Layout titulo="Sales" messages={messages}>
     <FormSell onSubmit={handleSubmit} saleMade={saleMade} onSaleMade={handleOnSaleMade}/>
    </Layout>
  )
}