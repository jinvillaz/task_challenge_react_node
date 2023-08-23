import { createAsyncThunk } from '@reduxjs/toolkit'
import { taskService } from './tasks.service'
import { BodyTask, Task } from '../../model/task'

export const getTasks = createAsyncThunk<Task[]>(
  'tasks/getTasks',
  async (): Promise<Task[]> => {
    return await taskService.getAll()
  },
)

export const createTask = createAsyncThunk<Task, any>(
  'tasks/createTask',
  async (data: BodyTask): Promise<Task> => {
    return await taskService.create(data)
  },
)
