import { ListingProps } from "@/types/tableListingProps";
import { TableProductsRows } from "@/types/tableProductsRows";
import {formatReal} from "@/utils/mascInputPrice"
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

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
return(
  <tr>
    <td >{Product.id}</td>
    <td>{Product.sku}</td>
    <td>{Product.name}</td>
    <td >{formatReal(`${Product.price}`)}</td>
    <td className="table is-narrow">{Product.created}</td>
    <td className="table is-narrow"> 
      <button onClick={e => onEdit(Product)} className="button is-warning is-rounded mr-2 ">
      <MdEdit size={15} width={15}/>
        Editar
      </button>
      <button onClick={e => onDelete(Product)} className="button is-danger is-rounded mr-2">
        <MdDelete size={15} width={15}/>
        Excluir
        </button>
    </td>    
  </tr>
)
}