import { Product } from "@/models/products/product";
import { TableProductsRows } from "@/types/products/tableProductsRows";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const TableListing: React.FC<TableProductsRows>  =({  
  ProductsRows,
  onDelete,
  onEdit
}) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const actionTemplate = (register: Product) => {
    const onDeletingClick = (product: Product) => {
      if (deleting) {
        onDelete(product);
        setDeleting(false);
      } else {
        setDeleting(true);
      }
    };

    const cancelDelete = () => setDeleting(false);
    return (
      <div>
        {!deleting && (
          <button
            onClick={() => onEdit(register)}
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


  return(
    <DataTable value={ProductsRows} paginator rows={5} className=" table is-fullwidth is-striped is-hoverable">
      <Column header="ID" field="id"/>
      <Column header="SKU" field="sku"/>
      <Column header="NAME" field="name"/>
      <Column header="PRICE" field="price"/>
      <Column header="CREATED" field="created"/>
      <Column header="" body={actionTemplate}/>
    </DataTable>

  )
}