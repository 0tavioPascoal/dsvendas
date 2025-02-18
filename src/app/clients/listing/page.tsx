"use client";

import { Layout } from "@/components/Layout/layout";
import { useFormik } from "formik";
import { ClientConsultingFormProps } from "@/types/clients/clientConsultingFormProps";
import React, { useState } from "react";
import { Input, InputCPF } from "@/components/common/inputComponent";
import { CLient } from "@/models/clients/clients";
import { redirect, useRouter } from "next/navigation";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Page } from "@/types/page";
import { useClientService } from "@/context/clientContext";
import { Paginator } from "primereact/paginator";
import { MdDelete, MdEdit, MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function ListingClients() {
  const router = useRouter();
  const service = useClientService();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const [clients, setClients] = useState<Page<CLient>>({
    data: () => Promise.resolve(),
    content: [],
    totalElements: 0,
    first: 0,
    number: 0,
    size: 10,
  });



  const handleSubmit = (filter: ClientConsultingFormProps) => {
    handlePage({ first: 0, rows: clients.size, page: 0, pageCount: 1 });
  };

  const {
    handleSubmit: formikSubmit,
    values: filter,
    handleChange,
  } = useFormik<ClientConsultingFormProps>({
    onSubmit: handleSubmit,
    initialValues: {
      name: "",
      cpf: "",
    },
  });

  const handlePage = (event: DataTablePageEvent) => {
    setLoading(true);
    service
      .find(event?.page, event?.rows, filter.name, filter.cpf)
      .then((response) => {
        setClients({ ...response, first: event?.first });
      })
      .finally(() => setLoading(false));
  };

  const deleteClient = (client: CLient) => {
    if (client.id) {
      service.deleteClient(client.id).then(() => {
        handlePage({ first: 0, rows: clients.size, page: 0, pageCount: 1 });
      });
    }
    return null;
  };

  const {data: sessionUser} = useSession()
  if(!sessionUser) return redirect("/")


  const actionTemplate = (register: CLient) => {
    const onDeletingClick = (client: CLient) => {
      if (deleting) {
        deleteClient(client);
        setDeleting(false);
      } else {
        setDeleting(true);
      }
    };
   
    const cancelDelete = () => setDeleting(false);

    const url = `register?id=${register.id}`;
    return (
      <div>
        {!deleting && (
          <button
            onClick={() => router.push(url)}
            className="button is-warning is-rounded mr-2 "
          >
            <MdEdit size={15} width={15} />
            Editing
          </button>
        )}
        <button
          onClick={() => onDeletingClick(register)}
          className="button is-danger is-rounded mr-2"
        >
          <MdDelete size={15} width={15} />
          {deleting ? "Confirm" : "Delete"}
        </button>
        {deleting && (
          <button onClick={cancelDelete} className="button is-rounded mr-2">
            <MdOutlineCancel size={15} width={15} />
            Cancel
          </button>
        )}
      </div>
    );
  };

  return (
    <Layout titulo="Lisitng For Clients">
      <form onSubmit={formikSubmit}>
        <div className="columns">
          <Input
            columnClass="is-one-third"
            label="Name"
            id="name"
            name="name"
            value={filter.name}
            onChange={handleChange}
            autoComplete="off"
          />
          <InputCPF
            columnClass="is-one-third"
            label="CPF"
            id="cpf"
            name="cpf"
            value={filter.cpf}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className="is-flex is-justify-content-flex-end is-align-items-center mt-4 px-1">
            <button type="submit" className="button is-info is-rounded">
              <FaSearch size={15} width={15} color="#FFFF"/>
              Search
            </button>
            <Link href="register" className="ml-6">
              <button className="button is-success is-rounded has-text-weight-bold is-uppercase is-focused  ">
                <AiOutlinePlus size={15} width={15} color="#FFFF" />
                New
              </button>
            </Link>
          </div>
        </div>
      </form>

      <div className="columns">
        <div className="table is-fullwidth is-hoverable">
          <DataTable
            value={clients.content}
            totalRecords={clients.totalElements}
            lazy
            first={clients.number}
            rows={clients.size}
            onPage={handlePage}
            loading={loading}
          >
            <Column field="id" header="Id" />
            <Column field="name" header="Name" />
            <Column  field="cpf" header="CPF" />
            <Column field="email" header="Email" />
            <Column className="table is-narrow" body={actionTemplate} />
          </DataTable>
          <div className="card">
            <Paginator
              first={clients.first}
              rows={clients.size}
              totalRecords={clients.totalElements}
              onPageChange={handlePage}
              template={{
                layout: "PrevPageLink CurrentPageReport NextPageLink",
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
