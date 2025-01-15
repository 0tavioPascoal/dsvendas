import { Product } from "@/types/product";
import { ListingProps } from "@/types/tableListingProps";
import { TableProductsRows } from "@/types/tableProductsRows";
import {formatReal} from "@/utils/mascInputPrice"
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

export const TableListing: React.FC<TableProductsRows>  =({  
  ProductsRows,
  onDelete,
  onEdit
}) => {
  return(
    <table className=" table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr >
      <th> ID </th>
      <th> SKU </th>
      <th> NAME</th>
      <th> PRICE </th>
      <th>CREATED</th>
      <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
      {ProductsRows.map(prodcut => <ProductRow 
                          onDelete={onDelete} 
                          onEdit={onEdit} 
                          key={prodcut.id} 
                          Product={prodcut}
                          />)}
      </tbody>
    </table>
  )
}

const ProductRow: React.FC<ListingProps> =({
  Product,
  onDelete,
  onEdit
})=>{
  const [deleting, setDeleting] = useState<boolean>(false) 

  const onDeletingClick = (product : Product) => {
    if(deleting){
      onDelete(product)
      setDeleting(false)
    } else{
      setDeleting(true)
    }
  }

  const cancelDelete = () => setDeleting(false)
return(
  <tr>
    <td >{Product.id}</td>
    <td>{Product.sku}</td>
    <td>{Product.name}</td>
    <td >{formatReal(`${Product.price}`)}</td>
    <td className="table is-narrow">{Product.created}</td>
    <td className="table is-narrow">  
      {!deleting && 
      <button onClick={() => onEdit(Product)} className="button is-warning is-rounded mr-2 ">
      <MdEdit size={15} width={15}/>
        Editing
      </button>
      }
       <button onClick={() => onDeletingClick(Product)} className="button is-danger is-rounded mr-2">
          <MdDelete size={15} width={15}/>
          {deleting ? "Confirm" : "Delete"}
          </button>
        {deleting && 
         <button onClick={cancelDelete} className="button is-rounded mr-2">
         < MdOutlineCancel size={15} width={15}/>
          Cancel
         </button>
        }
    </td>    
  </tr>
)
}