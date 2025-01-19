"use client"

import { Layout } from "@/components/Layout/layout"
import { useFormik } from "formik"
import { ClientConsultingFormProps } from "@/types/clientConsultingFormProps"
import React, { useState } from "react"
import { Input, InputCPF } from "@/components/common/inputComponent"
import { CLient } from "@/models/clients/clients"
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Page } from "@/types/page"
import {useClientService} from '@/context/clientContext'
import { Paginator } from 'primereact/paginator';

export default function ListingClients () {
  const service = useClientService()
  const [loading, setLoading] = useState<boolean>(false)
const [clients, setClients] = useState<Page<CLient>>({
  data: () => Promise.resolve(),
  content: [],
  totalElements: 0,
  first: 0,
  number: 0,
  size: 10
})

const handleSubmit = (filter: ClientConsultingFormProps) => {
  handlePage({ first: 0, rows: clients.size, page: 0, pageCount: 1 })
}

const {handleSubmit: formikSubmit, values: filter, handleChange
} = useFormik<ClientConsultingFormProps>({
  onSubmit: handleSubmit,
  initialValues: {
    name: "",
    cpf: ""
  }
})

const handlePage = (event: DataTablePageEvent) => {
  setLoading(true)
  service.find(event?.page, event?.rows, filter.name, filter.cpf)
  .then(response => {
    setClients({...response, first: event?.first})
  }).finally(() => setLoading(false))}

  return(
    <Layout titulo="Lisitng For Clients">
      <form onSubmit={formikSubmit} >
      <div className="columns">
        <Input columnClass="is-one-third" label="Name" id="name" name="name"
         value={filter.name} onChange={handleChange} autoComplete="off"/> 
        <InputCPF columnClass="is-one-third" label="CPF" id="cpf" name="cpf"
         value={filter.cpf} onChange={handleChange} autoComplete="off"/>
          <button type="submit" className="button is-info is-rounded mt-6" >
            Search 
          </button>
      </div>
      </form>

      <div className="columns">
        <div className="table is-fullwidth is-hoverable">
          <DataTable  value={clients.content} 
          totalRecords={clients.totalElements}
          lazy
          first={clients.number}
          rows={clients.size}
          onPage={handlePage}
          loading={loading}>
          <Column field="id" header="Id" />
          <Column field="name" header="Name" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="Email" />
          </DataTable>
            <div className="card">
          <Paginator first={clients.first} rows={clients.size} totalRecords={clients.totalElements} onPageChange={handlePage} 
            template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
            </div>
        </div>
      </div>
    </Layout>
  )
}