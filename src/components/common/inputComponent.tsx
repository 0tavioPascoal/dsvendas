import { InputProps } from "@/types/InputProps";
import { formatReal} from "@/utils/mascInputPrice"
import React from "react";

export const Input: React.FC<InputProps> = ({
  label,
  columnClass,
  id,
  formatter,
  error,
  onChange,
  ...inputProps
}: InputProps) => {

  const onInputChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    const formattedValue = (formatter && formatter(value as string)) || value
     onChange && onChange({
      ...e,
      target: {
        name,
        value: formattedValue
      }
    })
  }

  return (
    <div className={`field column  ${columnClass} `}>
      <label className="label" htmlFor="sku">{label}</label>
      <div className="control">
        <input className={`input  is-rounded `}
          id={id} 
          {...inputProps}
          onChange={onInputChange}
          />
      {error &&  <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};


export const InputMoney:React.FC<InputProps> = (props) => {
  return <Input {...props} />
}