"use client"

import { FormCreated } from "@/components/common/form";
import { Layout } from "@/components/Layout/layout";
import { CLient } from "@/models/clients/clients";
import React from "react";
import { useState } from "react";
import { useClientService } from "@/context/clientContext";
import { AlertProps } from "@/types/AlertProps";

export default function RegisterClients () {

const service = useClientService()
const [client, setClient] = useState<CLient>({} as CLient);
  const [messages, setMessages] = useState<Array<AlertProps>>([])

const handleSubmit = (client: CLient) => {
 console.log(client)
 if(client.id){
  service.updatedClient(client).then(() => {
    setMessages([{
      color: 'is-success', text:'Updated Client!'
    }])
  })
  }else{
    service.save(client).then(clientSaved => {
      setClient(clientSaved)
      setMessages([{
        color: 'is-success', text: 'Saved Client!'
      }])})
  }
  
}
  return(
    <Layout titulo="Register For Clients" messages={messages}>
      <FormCreated client={client} onSubmit={handleSubmit} />
    </Layout>
  )
}