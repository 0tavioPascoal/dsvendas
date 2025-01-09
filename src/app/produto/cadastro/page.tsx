"use client";

import { Input } from "@/components/common/input";
import { Layout } from "@/components/Layout/layout";
import { useState } from "react";
import { useProductService } from "@/context/product/productContext";
import { Product } from "@/types/models/product/product";
import {convertToBigDecimal} from "@/utils/mascInputPrice"

export default function Cadastro() {
  const service = useProductService();
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [id, setId] = useState("");
  const [created, setCreated] = useState("");
  const [modified, setModified] = useState("");
  

  const submit = () => {
    const produto: Product = {
      id,
      created,
      modified,
      sku,
      price: convertToBigDecimal(price),
      name,
      description,
    };
    if(id){
      service
      .updatedProduct(produto)
      .then(productResponse => console.log("Updtaded"))
    }else{
      service
      .save(produto)
      .then((productResponse) => { 
        if ( productResponse.id!== undefined &&  productResponse.created!== undefined && productResponse.modified !== undefined ) {
          setId(productResponse.id);
          setCreated(productResponse.created)
          setModified(productResponse.modified)
        }
      });
    }
    
  };

  return (
    <Layout titulo="Products">
      {id && 
      <section className="columns">
        <Input
          id="id"
          value={id}
          columnClass="is-one-third"
          label="Id for Product:"
          disabled
        />

        <Input
          columnClass="is-one-third"
          label="Created:"
          id="created"
          value={created}    
          disabled
        />

        <Input
          columnClass="is-one-third"
          label="Last Modified:"
          id="modified"
          value={modified}
          disabled
        />
      </section>
      }

      <section className="columns">
        <Input
          id="sku"
          value={sku}
          onChange={setSku}
          columnClass="is-half"
          label="SKU: "
          placeholder="SKU Product"
        />

        <Input
          columnClass="is-half"
          label="Price: "
          id="price"
          onChange={setPrice}
          value={price}
          placeholder="Price for Product"
          currency
          maxLength={16}
        />
      </section>

      <div className="columns">
        <Input
          columnClass="is-full"
          label="Name"
          id="name"
          value={name}
          onChange={setName}
          placeholder="Name for Product"
        />
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="desc">
            Description
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id="desc"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description for Product"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button
            className="button is-primary is-rounded is-hovered is-focused is-active"
            onClick={submit}>
            {id ? "Updated" : "Save"}
          </button>
        </p>
        <p className="control">
          <button className="button is-light is-rounded is-hovered is-focused is-active">
            Cancel
          </button>
        </p>
      </div>
    </Layout>
  );
}
