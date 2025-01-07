import { Layout } from "@/components/Layout/layout";

export default function Cadastro() {
  return (
    <Layout titulo="Produtos">
      <section className="columns">
        <div className="column is-half">
          <div className="field">
            <label className="label">SKU</label>
            <div className="control">
              <input className="input" type="text" placeholder="SKU Product" />
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Name Product" />
            </div>
          </div>
        </div>
      </section>

      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Price for Product"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Description for Product"
          ></textarea>
        </div>
      </div>

      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button className="button is-primary is-rounded is-hovered is-focused is-active">Submit</button>
        </p>
        <p className="control">
          <button className="button is-light is-rounded is-hovered is-focused is-active">Cancel</button>
        </p>
      </div>
    </Layout>
  );
}
