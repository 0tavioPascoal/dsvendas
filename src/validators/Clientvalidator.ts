import * as Yup from 'yup'

const defaultMessage:string = 'Required field'
const invalidCPF:string = 'Invalid CPF!'
const invalidDate: string = 'Invalid Date'
const invalidPhone: string = 'Invalid Phone'
const invalidEmail: string = 'Invalid Email'

export const ValidationClientSchema = Yup.object().shape({
  name: Yup.string().required(defaultMessage),
  email: Yup.string().email(invalidEmail).required(defaultMessage),
  cpf: Yup.string().required(defaultMessage).length(14, invalidCPF),
  phone: Yup.string().required(defaultMessage).length(14, invalidPhone),
  birthday: Yup.string().required(defaultMessage).length(10, invalidDate),
  address: Yup.string().required(defaultMessage) ,
})