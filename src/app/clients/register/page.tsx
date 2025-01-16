"use client"

import { FormCreated } from "@/components/common/form";
import { Layout } from "@/components/Layout/layout";
import { CLient } from "@/models/clients/clients";
import React from "react";
import { useState } from "react";

export default function RegisterClients () {
const [client, setClient] = useState<CLient>({} as CLient);

const handleSubmit = (client: CLient) => {
  console.log(client)
}
  return(
    <Layout titulo="Register For Clients">
      <FormCreated client={client } onSubmit={handleSubmit} />
    </Layout>
  )
}