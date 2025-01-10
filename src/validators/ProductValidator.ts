import * as yup from 'yup';

export const ProductValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  sku: yup.string().required(),
  price: yup.number().required()
})