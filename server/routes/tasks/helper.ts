import { addDays, addMonths, differenceInDays, differenceInMonths, differenceInWeeks, isValid, parse } from 'date-fns'
import { BodyTask, LabelAssigned, TypeTask } from '../../models/task'

export const getLabel = ({ dueDate, type, name }: BodyTask) => {
  if (type === TypeTask.OTHER && !isValid(parse(dueDate, 'MM/dd/yyyy', new Date()))) {
    return LabelAssigned.NOT_IMPORTANT
  }

  if (
    (type === TypeTask.WORK && differenceInDays(new Date(dueDate), addDays(new Date(), 1)) === 0) ||
    (type === TypeTask.HEALTH &&
      differenceInDays(new Date(dueDate), addDays(new Date(), 3)) === 0 &&
      !name.includes('Treatment'))
  ) {
    return LabelAssigned.URGENT
  }

  if (
    (type === TypeTask.PERSONAL && differenceInWeeks(new Date(dueDate), addDays(new Date(), 7)) === 0) ||
    (type === TypeTask.OTHER && differenceInDays(new Date(dueDate), addDays(new Date(), 5)) === 0) ||
    (type === TypeTask.WORK &&
      differenceInMonths(new Date(dueDate), addMonths(new Date(), 1)) === 0 &&
      (name.includes('PLO') || name.includes('GJL')))
  ) {
    return LabelAssigned.CAN_BE_POSTPONED
  }

  return LabelAssigned.NOT_IMPORTANT
}
