import { ReactNode } from "react";
import { AlertProps } from "./AlertProps";

export interface LayoutProps {
  titulo?: string; 
  children?: ReactNode;
  messages?: Array<AlertProps>
}