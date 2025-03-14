import * as yup from 'yup'

const defaultMessage = "Mandatory Field"

export const reportValidatorForm = yup.object().shape({
  client : yup.object().nullable().required(defaultMessage),
  startDate: yup.string().trim().required(defaultMessage),
  finalDate: yup.string().trim().required(defaultMessage),
}) 