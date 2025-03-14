import * as yup from 'yup';

const defaultMessage = "Mandatory Field"

export const ProductValidationSchema = yup.object().shape({
  name: yup.string().trim().required(defaultMessage),
  description: yup.string().trim().required(defaultMessage),
  sku: yup.string().trim().required(defaultMessage),
  price: yup.number().required(defaultMessage).moreThan(0 , "Value must be greater than 0")
})