import { CLient } from "@/models/clients/clients";

export interface CLientFormProps{
  client: CLient,
  onSubmit: (client: CLient) => void
}