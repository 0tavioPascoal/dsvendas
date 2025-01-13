import { ListingProps } from "@/types/tableListingProps";
import { TableProductsRows } from "@/types/tableProductsRows";
import React from "react";

export const TableListing: React.FC<TableProductsRows>  =({
  ProductsRows
}) => {
  return(
    <table className="table">
      <thead>
        <tr>
      <th> ID </th>
      <th> SKU </th>
      <th> NAME</th>
      <th> PRICE </th>
        </tr>
      </thead>
      <tbody>
      {ProductsRows.map(prodcut => <ProductRow  key={prodcut.id} Product={prodcut}/>)}
      </tbody>
    </table>
  )
}

const ProductRow: React.FC<ListingProps> =({
  Product
})=>{
return(
  <tr>
    <td>{Product.id}</td>
    <td>{Product.sku}</td>
    <td>{Product.name}</td>
    <td>{Product.price}</td>
    <td >
    <button className="button is-warning is-rounded mr-4">Editar</button>
    <button className="button is-danger is-rounded ">Excluir</button>
    </td>
  </tr>
)
}