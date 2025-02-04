import { CLient } from "@/models/clients/clients";
import { itenSell, Sell } from "@/models/sell/sell";
import { Page } from "@/types/page";
import { sellFormProps } from "@/types/sell/sellFormProps";
import { useFormik } from "formik";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useState } from "react";
import { useClientService } from "@/context/clientContext";
import { Input } from "../inputComponent";
import { useProductService } from "@/context/productContext";
import { Product } from "@/models/products/product";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { formartMoney } from "@/utils/mascInputPrice";
import { sellValidatorSchema } from "@/validators/sellValidator";

export const FormSell: React.FC<sellFormProps> = ({ onSubmit, saleMade, onSaleMade}) => {
  const serviceClient = useClientService();
  const serviceProduct = useProductService();
  const [payment, ] = useState<string[]>([
    "CREDIT",
    "DEBIT",
    "CASH",
    "PIX",
    "BOLETO"
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<string>("");
  const [product, setProduct] = useState<Product>({});
  const [qntd, setQntd] = useState<number>(0);
  const [messageDialog, setMessageDialog] = useState<string>("");
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
      payment: "",
      itens: [],
      total: 0,
    },
    validationSchema: sellValidatorSchema,
  });

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

  const handleClientSelect = (e: AutoCompleteChangeEvent) => {
    const selectedClient: CLient = e.value;
    formik.setFieldValue("client", selectedClient);
  };

  const handleIdSelect = () => {
    serviceProduct
      .getProductForId(idProduct)
      .then((idResult) => {
        setProduct(idResult);
      })
      .catch(() => {
        setMessageDialog("Product not found!");
      });
  };

  const totalSell = () => {
    const itens = formik.values.itens || [];
    if (itens.length === 0) return 0;

    const totals = itens.map((is: itenSell) => {
      const price = is.product?.price ?? 0;
      const amount = is.amount ?? 0;
      return price * amount;
    });

    return totals.reduce((a, b) => a + b, 0);
  };

  const makeNewSale = () => {
    onSaleMade();
    formik.resetForm();
    setProduct({});
    setIdProduct("");
    setQntd(0);
  }

  const handleAddProduct = () => {
    const itensAdd = formik.values.itens;
    const itenExisting = itensAdd?.some((is: itenSell) => {
      return is.product.id === product.id;
    });

    if (itenExisting) {
      itensAdd?.forEach((is: itenSell) => {
        if (is.product.id === product.id) {
          is.amount = is.amount + qntd;
        }
      });
    } else {
      itensAdd?.push({
        product: product,
        amount: qntd,
      });
    }
    setProduct({});
    setIdProduct("");
    setQntd(0);
    const totals = totalSell();
    formik.setFieldValue("total", totals);
  };

  const disableButton = () => {
    return !product || !qntd;
  };

  const messageDialogFooter = () => {
    return (
      <div>
        <button
          className="button is-danger is-focused is-rounded"
          onClick={() => setMessageDialog("")}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="columns">
        <div className="column is-full">
          <div className="field">
            <label className="label" htmlFor="client">
              Client
            </label>
            <div className="control">
              <AutoComplete
                suggestions={listClient.content}
                completeMethod={handleAutoCompleteClient}
                value={formik.values.client}
                onChange={handleClientSelect}
                id="client"
                name="client"
                field="name"
                inputClassName="input is-rounded"
                panelClassName="custom-autocomplete-panel"
                itemTemplate={(item: CLient) => (
                  <div className="custom-autocomplete-item">
                    <strong>{item.name}</strong>
                  </div>
                )}
                style={{ width: "100%" }}
              />
              <small className="p-error p-d-block">
                {formik.errors.client}
              </small>
            </div>
            {listClient.content.length === 0 && !loading && (
              <small className="has-text-grey">
                Não há clientes encontrados.
              </small>
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
          onChange={(e) => setIdProduct(e.target.value)}
          id="sku"
          name="sku"
          onBlur={handleIdSelect}
        />

        <div className="column is-half">
          <div className="field">
            <label className="label" htmlFor="product">
              Product:{" "}
            </label>
            <div className="control">
              <AutoComplete
                value={product}
                id="product"
                field="name"
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
          </div>
        </div>

        <Input
          label="QNTD:"
          columnClass="is-one-fifth"
          value={qntd}
          onChange={(e) => setQntd(parseInt(e.target.value))}
          id="qntd"
          name="qntd"
        />

        <div className="column is-one-fifth">
          <div className="field">
            <div className="control">
              <button
                type="button"
                className="button is-success is-rounded is-hovered is-focused is-active has-text-weight-semibold"
                style={{ marginTop: "30px" }}
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
          <Column field="product.id" header="Id" />
          <Column field="product.name" header="Product" />
          <Column field="product.sku" header="Sku" />
          <Column field="product.price" header="Price" />
          <Column field="amount" header="QNTD" />
          <Column
            header="total"
            body={(is: itenSell) => {
              const total = (is.product.price ?? 0) * is.amount;
              const totalFormatted = formartMoney.format(total);
              return <div>{totalFormatted}</div>;
            }}
          />
          <Column
            className="is-narrow"
            body={(is: itenSell) => {
              const handleRemoveItenFortable = () => {
                const newList = formik.values.itens?.filter(
                  (item) => item.product.id !== is.product.id
                );
                formik.setFieldValue("itens", newList);
              };

              return (
                <button
                  type="button"
                  onClick={handleRemoveItenFortable}
                  className="button is-rounded is-danger"
                >
                  Delete
                </button>
              );
            }}
          />
        </DataTable>
        <small className="p-error p-d-block">
          {formik.touched.itens && formik.errors.itens
            ? formik.errors.itens
            : ""}
        </small>
      </div>

      <div className="columns">
        <div className="column is-one-third">
          <label htmlFor="payment" className="label">
            Payment
          </label>
          <div className="control">
            <Dropdown
              id="payment"
              name="payment"
              value={formik.values.payment}
              options={payment.map((method) => ({
                label: method,
                value: method,
              }))}
              onChange={(e) => formik.setFieldValue("payment", e.value)}
              className="input dropdown-bulma is-rounded"
              placeholder="Select a payment method"
            />
            <small className="p-error p-d-block">{formik.errors.payment}</small>
          </div>
        </div>
        <Input
          columnClass="is-one-quarter"
          label="Itens: "
          value={formik.values.itens?.length}
          disabled
        />
        <Input
          columnClass="is-one-third"
          label="Total: "
          value={formartMoney.format(formik.values.total ?? 0)}
          disabled
        />
      </div>

      <div className="field">
        <div className="control">
        {!saleMade &&  <button
            type="submit"
            className="button is-success is-fullwidth is-rounded is-hovered is-focused is-active has-text-weight-semibold mt-6"
          >finish
          </button>}
          {saleMade &&  <button
            type="button"
            className="button is-success is-fullwidth is-rounded is-hovered is-focused is-active has-text-weight-semibold mt-6"
            onClick={makeNewSale}
          >new sell
          </button>}
        </div>
      </div>

      <Dialog
        header="Attention!"
        style={{ width: "50vw" }}
        position="top"
        visible={!!messageDialog}
        onHide={() => setMessageDialog("")}
        footer={messageDialogFooter}
      >
        {messageDialog}
      </Dialog>
    </form>
  );
};
