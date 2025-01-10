import { ReactNode } from "react";
import { AlertProps } from "../alert/AlertProps";

export interface LayoutProps {
  titulo?: string; 
  children?: ReactNode;
  messages?: Array<AlertProps>
}