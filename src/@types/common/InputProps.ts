import { InputHTMLAttributes } from "react"


export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string,
  columnClass : string,
  formatter?: (value: string) => string,
  error?: string,
}