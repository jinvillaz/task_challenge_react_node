import * as yup from 'yup'
import { BodyTask, TypeTask } from '../../models/task'

export const schemaValidator: yup.ObjectSchema<BodyTask> = yup
  .object({
    name: yup.string().defined(),
    description: yup.string().defined(),
    type: yup.mixed<TypeTask>().oneOf(Object.values(TypeTask)).defined(),
    dueDate: yup.string(),
  })
  .noUnknown(true, (err) => {
    return `invalid field: ${err.unknown}`
  })
  .strict()
