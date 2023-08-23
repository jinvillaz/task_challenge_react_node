import { Request, Response } from 'express'
import log4js from 'log4js'
import { schemaValidator } from './schema'
import mongoose from 'mongoose'
import { BodyTask, DataTask } from '../../models/task'
import { isValid, parse } from 'date-fns'
import { getLabel } from './helper'

const logger = log4js.getLogger('NotificationHandler')
logger.level = 'debug'
const BAD_REQUEST = 400

export const getHandler = async (req: Request, res: Response) => {
  const taskModel = mongoose.model('Task')
  const data = await taskModel.find({}).sort({ createdAt: -1 }).exec()
  res.json(data)
}

export const postHandler = async (req: Request, res: Response) => {
  try {
    const dataToValidate = req.body as BodyTask
    await schemaValidator.validate(dataToValidate, { abortEarly: false, strict: true })
    const data: DataTask = {
      name: dataToValidate.name,
      description: dataToValidate.description,
      type: dataToValidate.type,
      labelAssigned: getLabel(dataToValidate),
    }
    if (isValid(parse(dataToValidate.dueDate, 'MM/dd/yyyy', new Date()))) {
      data.dueDate = parse(dataToValidate.dueDate, 'MM/dd/yyyy', new Date())
    }
    
    const taskModel = mongoose.model('Task')
    const taskCreated = await taskModel.create(data)
    res.json(taskCreated)
  } catch (e) {
    logger.warn(e)
    if (e.errors) {
      return res.status(BAD_REQUEST).send(e.errors)
    } else {
      return res.status(BAD_REQUEST).send(e.message)
    }
  }
}
