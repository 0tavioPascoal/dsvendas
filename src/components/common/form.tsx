import React from "react";
import { CLient } from "@/models/clients/clients";
import { useFormik } from "formik";
import { CLientFormProps } from "@/types/ClientFormProps";
import { Input } from "./inputComponent";
import Link from "next/link";

export const FormCreated: React.FC<CLientFormProps> = ({
  client,
  onSubmit,
}) => {
  const formSchema: CLient = {
    name: "",
    email: "",
    phone: "",
    birthday: "",
    address: "",
    created: "",
    modified: "",
  };

  const formik = useFormik<CLient>({
    initialValues: {  ...formSchema, ...client },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
{formik.values.id && 
<div className="columns">
<Input
          columnClass="is-half"
          name="idClient"
          id="idClient"
          label=""
          disabled
          autoComplete="off"
          value={formik.values.id}
          onChange={formik.handleChange}
        />
        <Input
          columnClass="is-half"
          name="created"
          id="created"
          label=""
          disabled
          autoComplete="off"
          value={formik.values.created}
          onChange={formik.handleChange}
        />
        <Input
          columnClass="is-half"
          name="modified"
          id="modified"
          label=""
          autoComplete="off"
          disabled
          value={formik.values.modified}
          onChange={formik.handleChange}
        />
</div>
}
      <div className="columns">
        <Input
          columnClass="is-full"
          name="name"
          id="Name"
          label="Name:"
          autoComplete="off"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="columns">
        <Input
          columnClass="is-half"
          name="cpf"
          id="cpf"
          label="CPF:"
          autoComplete="off"
          value={formik.values.cpf}
          onChange={formik.handleChange}
        />
        <Input
          columnClass="is-half"
          name="birthday"
          id="birthday"
          label="Birthday:"
          autoComplete="off"
          value={formik.values.birthday}
          onChange={formik.handleChange}
        />
      </div>
      <div className="columns">
        <Input
          columnClass="is-full"
          name="address"
          id="address"
          label="Address:"
          autoComplete="off"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
      </div>

      <div className="columns">
      <Input
          columnClass="is-half"
          name="email"
          id="email"
          label="Email:"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Input
          columnClass="is-half"
          name="phone"
          id="phone"
          label="Phone:"
          autoComplete="off"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </div>

      <div className="field is-grouped is-grouped-right">
        <p className="control">
          <button type="submit"
            className="button is-success is-rounded is-hovered is-focused is-active ">
            {formik.values.id ? "Updated" : "Save"}
          </button>
        </p>
        <p className="control">
          <Link href="listing">
          <button type="submit" className="button is-light is-rounded is-hovered is-focused is-active ">
            Cancel
            </button>
          </Link>
        </p>
      </div>
    </form>
  );
};
