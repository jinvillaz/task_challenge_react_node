import * as yup from 'yup'
import { FormDataTask, TypeTask } from '../../model/task'

export const validationSchema: yup.ObjectSchema<FormDataTask> = yup
  .object({
    name: yup.string().defined(),
    description: yup.string().defined(),
    type: yup.mixed<TypeTask>().oneOf(Object.values(TypeTask)).defined(),
    dueDate: yup.date().nullable(),
  })
  .noUnknown(true, (err) => {
    return `invalid field: ${err.unknown}`
  })
  .strict()
