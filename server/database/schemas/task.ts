import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { LabelAssigned, TypeTask } from '../../models/task'

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: TypeTask.WORK,
      enum: Object.values(TypeTask)
    },
    dueDate: {
      type: Date,
    },
    labelAssigned: {
      type: String,
      default: LabelAssigned.CAN_BE_POSTPONED,
      enum: Object.values(LabelAssigned)
    }
  },
  {
    timestamps: true,
  },
)
taskSchema.indexes()
taskSchema.plugin(uniqueValidator, { message: 'The {PATH} {VALUE} already exist.' })

const Task = mongoose.model('Task', taskSchema)
export default Task
