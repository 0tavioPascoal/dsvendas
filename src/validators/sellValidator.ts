import * as yup from 'yup'

const defaultMessage = "Mandatory Field"

export const sellValidatorSchema = yup.object().shape({
  client : yup.object().nullable().required(defaultMessage),
  itens: yup.array().min(1, "must contain at least 1 item"),
  payment: yup.string().trim().required(defaultMessage),
}) 