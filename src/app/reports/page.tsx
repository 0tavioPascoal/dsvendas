'use client'
import { InputDate } from "@/components/common/inputComponent";
import { Layout } from "@/components/Layout/layout";
import { useClientService } from "@/context/clientContext";
import { useReportService } from "@/context/reportContext";
import { CLient } from "@/models/clients/clients";
import { Page } from "@/types/page";
import { reportsSellForm } from "@/types/reports/reportsSellForm";
import { reportValidatorForm } from "@/validators/reportValidator";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useState } from "react";

export default function Reports () {
  const [loading, setLoading] = useState<boolean>(false);
  const serviceClient = useClientService()
  const reportService = useReportService()
   const [listClient, setListClient] = useState<Page<CLient>>({
      data: () => Promise.resolve(),
      content: [],
      totalElements: 0,
      first: 0,
      number: 0,
      size: 0,
    });
  const handleSubmitReports = (data: reportsSellForm) => {
    console.log(data)
    reportService.findReport(data.client.id, data.startDate, data.finalDate)
    .then(res => {
      const fileURL = URL.createObjectURL(res)
      window.open(fileURL)
    })
  }
  
const handleAutoCompleteClient = (e: AutoCompleteCompleteEvent) => {
    const nameClient = e.query;
    setLoading(true);
    serviceClient
      .find(0, 10, nameClient, "")
      .then((result) => {
        setListClient(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
        setLoading(false);
      });
  };

  const formik = useFormik<reportsSellForm>({
    onSubmit: handleSubmitReports,
    initialValues: ({
      client: {} as CLient,
      finalDate: '',
      startDate: ''
    }),
    validationSchema: reportValidatorForm
  })

  return(
  <Layout titulo="Reports">
    <form onSubmit={formik.handleSubmit}>
      <div className="columns">
      <div className="column is-half">
          <div className="field">
            <label className="label" htmlFor="product">
              Client:{" "}
            </label>
            <div className="control">
            <AutoComplete
  suggestions={listClient.content}
  completeMethod={handleAutoCompleteClient}
  value={formik.values.client ? formik.values.client.name : ""} 
  id="client"
  name="client"
  field="name"
  onChange={(e: AutoCompleteChangeEvent) => {
    formik.setFieldValue('client', e.value); 
  }}
  inputClassName="input is-rounded"
  panelClassName="custom-autocomplete-panel"
  itemTemplate={(item: CLient) => (
    <div className="custom-autocomplete-item">
      <strong>{item.name}</strong>
    </div>
  )}
  style={{ width: "100%" }}
/>
            </div>
            {listClient.content.length === 0 && !loading && (
              <small className="has-text-grey">
                Não há clientes encontrados.
              </small>
            )}
            {loading && <small className="has-text-grey">Carregando...</small>}
            <small className="p-error p-d-block">{formik.errors.client?.id}</small>
            </div>
          </div>
    
          <InputDate 
          label="Start Date:"
          columnClass="is-one-fifth"
          id="startdate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          name="startDate"
          error={formik.errors.startDate}
        />
        

        <InputDate
          label="Final Date:"
          columnClass="is-one-fifth"
          id="finalDate"
          onChange={formik.handleChange}
          value={formik.values.finalDate}
          name="finalDate"
          error={formik.errors.finalDate}
        />
         
        
        </div>
        <div className="column is-fullwidht">
          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-success is-rounded is-hovered is-focused is-active has-text-weight-semibold"
                style={{ marginTop: "30px" }}
              > Generated Reports
              </button>
            </div>
          </div>
        </div>
    </form>
  </Layout>
  )
}