import { CLient } from "@/models/clients/clients";
import { itenSell, Sell } from "@/models/sell/sell";
import { Page } from "@/types/page";
import { sellFormProps } from "@/types/sell/sellFormProps";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useState } from "react";
import { useClientService } from '@/context/clientContext';
import { Input } from "../inputComponent";
import { useProductService } from "@/context/productContext";
import { Product } from "@/models/products/product";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const FormSell: React.FC<sellFormProps> = ({ onSubmit }) => {
  const serviceClient = useClientService();
  const serviceProduct = useProductService()
  const [loading, setLoading] = useState<boolean>(false); 
  const [idProduct, setIdProduct] = useState<string>('')
  const [product, setProduct] = useState<Product>({})
  const [qntd, setQntd] = useState<number>(0)
  const [messageDialog, setMessageDialog] = useState<string>('')
  const [listClient, setListClient] = useState<Page<CLient>>({
    data: () => Promise.resolve(),
    content: [],
    totalElements: 0,
    first: 0,
    number: 0,
    size: 0,
  });

  const formik = useFormik<Sell>({
    onSubmit,
    initialValues: {
      client: {} as CLient,
      payment: '',
      itens: [],
      total: 0
    }
  });

  const handleAutoCompleteClient = (e: AutoCompleteCompleteEvent) => {
    const nameClient = e.query;
    setLoading(true);
    serviceClient.find(0, 10, nameClient, '').then(result => {
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

  const handleIdSelect = () => {
   serviceProduct.getProductForId(idProduct).then(idResult => {
    setProduct(idResult)
   }).catch(() => {
    setMessageDialog('Product not found!')
   }
   )
  }

  const handleAddProduct = () => {
    const itensAdd = formik.values.itens
    const itenExisting = itensAdd?.some( (is: itenSell) => {
      return is.product.id === product.id
    })

    if(itenExisting){
      itensAdd?.forEach((is: itenSell) => {
        if(is.product.id === product.id){
          is.amount = is.amount + qntd
        }
      })
    }else{
      itensAdd?.push({
        product: product,
        amount: qntd
      })
    }

    
    setProduct({})
    setIdProduct('')
    setQntd(0)
  }

  const disableButton = () => {
    return !product || !qntd
  }

  const messageDialogFooter =( ) => {
    return(
      <div>
        <button className="button is-danger is-focused is-rounded" onClick={() => setMessageDialog('')}>
          Close
          </button>
      </div>
    )
  }

  return (
    <form onSubmit={formik.handleSubmit}>
  <div className="columns">
  <div className="column is-full">
    <div className="field">
      <label className="label" htmlFor="client">Client</label>
      <div className="control">
        <AutoComplete
          suggestions={listClient.content}
          completeMethod={handleAutoCompleteClient}
          value={formik.values.client}
          onChange={handleClientSelect}
          id="client1"
          field="name"
          inputClassName="input is-rounded"
          panelClassName="custom-autocomplete-panel"
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
  </div>
</div>

<div className="columns">
        <Input 
          label="ID Product:"
          columnClass="is-one-fifth"
          value={idProduct}
          onChange={e => setIdProduct(e.target.value)}
          id="sku"
          name="sku"
          onBlur={handleIdSelect}
        />

        <div className="column is-half">
          <div className="field">
            <label className="label" htmlFor="product">Product: </label>
            <div className="control">
              <AutoComplete
                value={product}
                id="product"
                field="name"
                inputClassName="input is-rounded"
                panelClassName="custom-autocomplete-panel"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        <Input 
          label="QNTD:"
          columnClass="is-one-fifth"
          value={qntd}
          onChange={e => setQntd(parseInt(e.target.value))}
          id="qntd"
          name="qntd"
        />

        <div className="column is-one-fifth">
          <div className="field">
            <div className="control">
              <button 
                type="button" 
                className="button is-success is-rounded is-hovered is-focused is-active has-text-weight-semibold"
                style={{ marginTop: '30px' }}
                disabled={disableButton()}
                onClick={handleAddProduct}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table is-fullwidth">
        <DataTable value={formik.values.itens}>
        <Column field="product.id" header="Id"/>
          <Column field="product.name" header="Product"/>
          <Column field="product.sku" header="Sku"/>
          <Column field="product.price" header="Price"/>
          <Column field="amount" header="QNTD"/>
          <Column header="total" body={(is: itenSell) => { return(
            <div>
               { (is.product?.price ?? 0) * is.amount }
            </div>
          )}}/>
        </DataTable>

        <div className="field">
            <div className="control">
              <button 
                type="submit" 
                className="button is-success is-fullwidth is-rounded is-hovered is-focused is-active has-text-weight-semibold mt-6"
              >
                finish
              </button>
            </div>
          </div>
      </div>

      <Dialog header="Attention!"style={{ width: '50vw' }} position="top"
       visible={!!messageDialog} 
       onHide={() => setMessageDialog('')}
       footer={messageDialogFooter}
       >
        {messageDialog}
      </Dialog>
    </form>
);
};
