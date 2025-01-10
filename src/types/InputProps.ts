import { InputHTMLAttributes } from "react"


export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  onChange?: (value: any) => void,
  label: string,
  columnClass : string,
  currency?: boolean,
  error?: string,
}