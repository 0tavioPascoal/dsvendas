import React from "react";
import { MenuItensProps } from "@/@types/common/MenuItens";
import Link from "next/link";

export const MenuItens: React.FC<MenuItensProps> = (props: MenuItensProps) => {
  return (
    <li>
      <Link href={props.href}>
        <p>
         <span className="icon"></span> {props.label}
        </p>  
      </Link>
    </li>
  );
};
