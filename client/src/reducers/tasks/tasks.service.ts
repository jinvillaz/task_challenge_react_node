import axios from 'axios'
import { BodyTask, Task } from '../../model/task'

const api = process.env.REACT_APP_API_URL + '/tasks'

class TaskService {
  async getAll(): Promise<Task[]> {
    const { data } = await axios.get(api)
    return data
  }

  async create(body: BodyTask): Promise<Task> {
    const { data } = await axios.post(api, body)
    return data
  }
}

export const taskService = new TaskService()
