import { ListingProps } from "@/types/tableListingProps";
import { TableProductsRows } from "@/types/tableProductsRows";
import {formatReal} from "@/utils/mascInputPrice"
import React from "react";

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
      <th></th>
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
    <td>{Product.id}</td>
    <td>{Product.sku}</td>
    <td>{Product.name}</td>
    <td>{formatReal(`${Product.price}`)}</td>
    <td>{Product.created}</td>
    <td className="table is-narrow"> 
      <button onClick={e => onEdit(Product)} className="button is-warning is-rounded mr-2 ">Editar</button>
      <button onClick={e => onDelete(Product)} className="button is-danger is-rounded mr-2">Excluir</button>
    </td>    
  </tr>
)
}