import React from "react"
import { MenuItens } from "./menuItens"

export const Menu: React.FC= () => {
  return(
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
    <p className="menu-label is-hidden-touch has-text-weight-bold is-size-5 has-text-centered has-text-success">
        Minhas Vendas
    </p>
    <ul className="menu-list is-capitalized has-text-weight-semibold has-text-left">
        <MenuItens href="/" label="Home"  />
        <MenuItens href="/products/listing" label="Products"  />
        <MenuItens href="/clients/listing" label="Clients" />
        <MenuItens href="/sales/sell" label="Sell"  />
        <MenuItens href="/vendas/relatorio-vendas" label="Relatório"  />
        <MenuItens href="/" label="Sair"  />
    </ul>
</aside>
  )
}

