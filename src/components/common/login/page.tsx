'use client'

import { signIn } from "next-auth/react"; 
import { FaGithub } from "react-icons/fa";
import imgF from "../../../../public/imgF3.jpg"
import Image from "next/image";
import React from "react";


export const Login: React.FC = () => {
  return (
    <div className="columns" style={{ minHeight: "100vh", overflow: "hidden" }}>

     
      <section
        className="column is-half  mt-2 is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        
        <h1 className="title is-2 has-text-centered has-text-weight-bold mt-4 has-text-primary">
          DsVendas
        </h1>

        <p className="subtitle is-5 has-text-centered mt-6 mx-4">
          Bem-vindo ao DsVendas, a plataforma que transforma a maneira como você trabalha. Entre com sua conta para acessar funcionalidades exclusivas e otimizar sua experiência.
        </p>

        <div className="has-text-centered mt-5">
           <Image src={imgF} 
           alt="Imagem de fundo tela principal"
           style={{ width: '200px', height: 'auto' }}
           priority
           />
        </div>


        <footer className="footer" style={{ marginTop: "auto", width: '100%' }}>
          <div className="content has-text-centered has-text-weight-bold mt-6">
            <p>© 2025 Meu App. Todos os direitos reservados.</p>
          </div>
        </footer>
      </section>

      
      <section
        className="column is-half mt-4 is-flex is-justify-content-center is-align-items-center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div className="container is-flex is-align-items-center is-justify-content-center">
          <div
            className="box"
            style={{
              maxWidth: '500px',
              width: '100%',
              padding: '40px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2 className="title is-3 has-text-centered mb-5 has-text-weight-bold">Login</h2>

            
            <button
              className="button is-fullwidth is-large is-primary is-dark is-rounded is-focused"
              onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
              <span className="icon">
                <FaGithub size={24} />
              </span>
              <span className="has-text-weight-semibold">Entrar com o GitHub</span>
            </button>

          </div>
        </div>
      </section>

    </div>
  );
}