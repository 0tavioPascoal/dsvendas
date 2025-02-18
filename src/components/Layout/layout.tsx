import React from "react";
import { Menu } from "./menu";
import { LayoutProps } from "@/@types/layoutTypes/layoutprops";
import { Message } from "../common/message/messageComponent";
import { useSession } from "next-auth/react";

export const Layout: React.FC<LayoutProps> = (props:LayoutProps) => {
    const {data: session} = useSession()
    if(!session){
        return null
    }
  return(
    <div className="app ">
    <section className="main-content columns is-fullheight">
        <Menu />

        <div className="container column is-10 ">
            <div className="section">
                <div className="card">
                    <div className="card-header ">
                        <p className="card-header-title is-uppercase has-text-weight-bold">
                            {props.titulo}, {session.user?.name}
                        </p>
                    </div>
                    <div className="card-content  has-background-white-bis">
                        <div className="content">
                            {props.messages && 
                            props.messages.map(msg => <Message key={msg.text} {...msg}/> )}
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}