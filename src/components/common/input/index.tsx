import { InputProps } from "@/types/components/inputs/InputProps";
import React from "react";

export const Input: React.FC<InputProps> = ({
  onChange,
  label,
  columnClass,
  id,
  ...inputProps
}: InputProps) => {
  return (
    <div className={`field column ${columnClass}`}>
      <label className="label" htmlFor="sku">{label}</label>
      <div className="control">
        <input className="input"
          id={id} 
          {...inputProps}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
};
