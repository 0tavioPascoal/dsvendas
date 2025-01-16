"use client"

import { FormCreated } from "@/components/common/form";
import { Layout } from "@/components/Layout/layout";
import { CLient } from "@/models/clients/clients";
import React from "react";
import { useState } from "react";
import { useClientService } from "@/context/clientContext";

export default function RegisterClients () {
const service = useClientService()

const [client, setClient] = useState<CLient>({} as CLient);

const handleSubmit = (client: CLient) => {
 console.log(client)
 if(client.id){
  service.updatedClient(client).then(() => {console.log('updated')})
  }else{
    service.save(client).then(clientSaved => {
      setClient(clientSaved)
      console.log(client)})
  }
  
}
  return(
    <Layout titulo="Register For Clients">
      <FormCreated client={client} onSubmit={handleSubmit} />
    </Layout>
  )
}