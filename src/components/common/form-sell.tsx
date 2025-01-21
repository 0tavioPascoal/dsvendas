import { Sell } from "@/models/sell/sell"
import { sellFormProps } from "@/types/sell/sellFormProps"
import { useFormik } from "formik";

export const FormSell: React.FC<sellFormProps> = ({onSubmit}) => {

  const formik = useFormik<Sell>({
  onSubmit,
  initialValues: {
    client: {},
    payment: '',
    product: [],
    total: 0
  }
  })
  return(
    <form onSubmit={formik.handleSubmit}>

    </form>
  )
}