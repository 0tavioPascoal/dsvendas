"use client"

import { FormCreated } from "@/components/common/formClient/form";
import { Layout } from "@/components/Layout/layout";
import { CLient } from "@/models/clients/clients";
import React from "react";
import { useState, useEffect } from "react";
import { useClientService } from "@/context/clientContext";
import { AlertProps } from "@/@types/common/AlertProps";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RegisterClients () {
const service = useClientService()
const [client, setClient] = useState<CLient>({} as CLient);
const [messages, setMessages] = useState<Array<AlertProps>>([])
const paramns = useSearchParams()
const id = paramns.get('id')

useEffect(() => {
  if(id){
    service.getClientForId(id).then(client => setClient(client))
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id])

const handleSubmit = (client: CLient) => {
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

const {data: userSession} = useSession()
if(!userSession) return redirect("/")

  return(
    <Layout titulo="Register For Clients" messages={messages}>
      <FormCreated client={client} onSubmit={handleSubmit} />
    </Layout>
  )
}