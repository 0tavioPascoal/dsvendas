import { InputProps } from "@/types/components/inputs/InputProps";
import { formatReal} from "@/utils/mascInputPrice"
import React from "react";

export const Input: React.FC<InputProps> = ({
  onChange,
  label,
  columnClass,
  id,
  currency,
  ...inputProps
}: InputProps) => {

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value

    if(value && currency) {
      value = formatReal(value)
    }
    onChange?.(value)
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
      </div>
    </div>
  );
};
