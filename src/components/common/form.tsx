import React from "react";
import { CLient } from "@/models/clients/clients";
import { useFormik } from "formik";
import { CLientFormProps } from "@/types/ClientFormProps";
import { Input, InputCPF, InputDate, InputPhone } from "./inputComponent";
import Link from "next/link";

export const FormCreated: React.FC<CLientFormProps> = ({
  client,
  onSubmit,
}) => {
  const formSchema: CLient = {
    id: '',
    name: "",
    email: "",
    cpf: '',
    phone: "",
    birthday: "",
    address: "",
    created: "",
    modified: "",
  };

  const formik = useFormik<CLient>({
    initialValues: {  ...formSchema, ...client },
    onSubmit,
    enableReinitialize: true
  });
  console.log('client:', client)
  console.log('formik', formik.values)


  return (
    <form onSubmit={formik.handleSubmit}>
{formik.values.id && 
<div className="columns">
<Input
          columnClass="is-half"
          name="id"
          id="id"
          label="ID:"
          disabled
          autoComplete="off"
          value={formik.values.id}
          onChange={formik.handleChange}
        />
        <Input
          columnClass="is-one-quarter"
          name="created"
          id="created"
          label="Created:"
          disabled
          autoComplete="off"
          value={formik.values.created}
          onChange={formik.handleChange}
        />
        <Input
          columnClass="is-one-quarter"
          name="modified"
          id="modified"
          label="Modified:"
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
          id="name"
          label="Name:"
          autoComplete="off"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="columns">
        <InputCPF
          columnClass="is-half"
          name="cpf"
          id="cpf"
          label="CPF:"
          autoComplete="off"
          value={formik.values.cpf}
          onChange={formik.handleChange}
        />
        <InputDate
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
        <InputPhone
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
