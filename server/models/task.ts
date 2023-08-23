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

export interface Task extends BodyTask {
  id: string
  labelAssigned: LabelAssigned
}

export interface DataTask {
  name: string
  description: string
  type: TypeTask
  labelAssigned: LabelAssigned
  dueDate?: Date
}
