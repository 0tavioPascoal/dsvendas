import { CLient } from "@/models/clients/clients";
import { Sell } from "@/models/sell/sell";
import { Page } from "@/types/page";
import { sellFormProps } from "@/types/sell/sellFormProps";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useState } from "react";
import { useClientService } from '@/context/clientContext';

export const FormSell: React.FC<sellFormProps> = ({ onSubmit }) => {
  const service = useClientService();
  const [listClient, setListClient] = useState<Page<CLient>>({
    data: () => Promise.resolve(),
    content: [],
    totalElements: 0,
    first: 0,
    number: 0,
    size: 0,
  });

  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

  const formik = useFormik<Sell>({
    onSubmit,
    initialValues: {
      client: {} as CLient,
      payment: '',
      product: [],
      total: 0
    }
  });

  const handleAutoCompleteClient = (e: AutoCompleteCompleteEvent) => {
    const nameClient = e.query;
    setLoading(true);
    service.find(0, 10, nameClient, '').then(result => {
      setListClient(result);
      setLoading(false); 
    }).catch(error => {
      console.error("Erro ao buscar clientes:", error);
      setLoading(false);
    });
  };

  const handleClientSelect = (e: AutoCompleteChangeEvent) => {
    const selectedClient: CLient = e.value;
    formik.setFieldValue("client", selectedClient);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="field">
      <label className="label" htmlFor="client">Cliente</label>
      <div className="control">
        <AutoComplete
          suggestions={listClient.content}
          completeMethod={handleAutoCompleteClient}
          value={formik.values.client}
          onChange={handleClientSelect}
          id="client"
          field="name"
          inputClassName="input"  // Usando classe do Bulma para o campo de entrada
          panelClassName="custom-autocomplete-panel"  // Classe personalizada do painel
          itemTemplate={(item: CLient) => (
            <div className="custom-autocomplete-item">
              <strong>{item.name}</strong>
            </div>
          )}
          style={{ width: '100%' }}
        />
      </div>
      {listClient.content.length === 0 && !loading && (
        <small className="has-text-grey">Não há clientes encontrados.</small>
      )}
      {loading && <small className="has-text-grey">Carregando...</small>}
    </div>

    <div className="field is-grouped mt-6">
      <div className="control">
        <button type="submit" className="button is-success" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  </form>
);
};
