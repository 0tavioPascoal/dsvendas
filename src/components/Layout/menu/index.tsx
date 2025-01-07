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
        <MenuItens href="/cadastro" label="Cadastro"/>
        <MenuItens href="/consultas/produtos" label="Produtos"  />
        <MenuItens href="/consultas/clientes" label="Clientes" />
        <MenuItens href="/vendas/nova-venda" label="Venda"  />
        <MenuItens href="/vendas/relatorio-vendas" label="Relatório"  />
        <MenuItens href="/" label="Sair"  />
    </ul>
</aside>
  )
}

