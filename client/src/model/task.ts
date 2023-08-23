export enum TypeTask {
  WORK = 'Work',
  PERSONAL = 'Personal',
  HEALTH = 'Health',
  OTHER = 'Other',
}

export enum LabelAssigned {
  URGENT = 'Urgent',
  CAN_BE_POSTPONED = 'Can be postponed',
  NOT_IMPORTANT = 'Not important',
}

export interface BodyTask {
  name: string
  description: string
  type: TypeTask
  dueDate?: string
}

export interface Task {
  _id: string
  name: string
  description: string
  type: TypeTask
  dueDate?: Date
  labelAssigned: LabelAssigned
}

export interface FormDataTask {
  name: string
  description: string
  type: TypeTask
  dueDate?: Date | null
}
