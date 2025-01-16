import { InputProps } from "@/types/InputProps";
import React from "react";
import { FormatUtils } from "@4us-dev/utils";
import {formaterDate} from "@/utils/mascInputPrice"

const formatUtils = new FormatUtils();

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
    const value = e.target.value;
    const name = e.target.name;

    const formattedValue = (formatter && formatter(value as string)) || value;
    onChange({
      ...e,
      target: {
        name,
        value: formattedValue,
      },
    });
  };

  return (
    <div className={`field column  ${columnClass} `}>
      <label className="label" htmlFor="sku">
        {label}
      </label>
      <div className="control">
        <input
          className={`input  is-rounded `}
          id={id}
          {...inputProps}
          onChange={onInputChange}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export const InputMoney: React.FC<InputProps> = (props) => {
  return <Input {...props} />;
};

export const InputCPF: React.FC<InputProps> = (props) => {
  return <Input {...props} formatter={formatUtils.formatCPF} />;
};

export const InputPhone: React.FC<InputProps> = (props) => {
  return <Input {...props} formatter={formatUtils.formatPhone} />;
};

export const InputDate: React.FC<InputProps> = (props) => {
  return <Input {...props} maxLength={10} formatter={formaterDate} />;
};
