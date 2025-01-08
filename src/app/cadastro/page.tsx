"use client";

import { Input } from "@/components/common/input";
import { Layout } from "@/components/Layout/layout";
import { useState } from "react";

export default function Cadastro() {
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");

  const submit = () => {
    const produto = {
      sku,
      price,
      name,
      description,
    };

    
    console.log(produto);
  };

  return (
    <Layout titulo="Products">
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
            onClick={submit}
          >
            Submit
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
