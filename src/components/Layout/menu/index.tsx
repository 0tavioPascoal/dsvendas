import React from "react"
import { MenuItens } from "./menuItens"
import { signOut } from "../../../../auth"
import {redirect} from "next/navigation";

export const Menu: React.FC= () => {
    const redireturl = redirect("/")
  return(
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
    <p className="menu-label is-hidden-touch has-text-weight-bold is-size-5 has-text-centered has-text-success">   
       My Sells
    </p>
    <ul className="menu-list is-capitalized has-text-weight-semibold has-text-left">
        <MenuItens href="/" label="Home"  />
        <MenuItens href="/products/listing" label="Products"  />
        <MenuItens href="/clients/listing" label="Clients" />
        <MenuItens href="/sales/sell" label="Sell"  />
        <MenuItens href="/reports" label="Reports"  />
        <MenuItens onClick={async () => await signOut(redireturl) } href="/" label="Sign Out"  />
    </ul>
</aside>
  )
}

