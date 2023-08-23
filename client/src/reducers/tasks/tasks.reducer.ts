import { createReducer } from '@reduxjs/toolkit'
import { Task } from '../../model/task'
import { createTask, getTasks } from './tasks.actions'

interface TaskState {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: [],
}

export const tasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(getTasks.pending, (state) => ({
    ...state,
    tasks: [],
  }))

  builder.addCase(getTasks.rejected, (state) => ({
    ...state,
    tasks: [],
  }))

  builder.addCase(getTasks.fulfilled, (state, action) => ({
    ...state,
    tasks: action.payload,
  }))

  builder.addCase(createTask.fulfilled, (state, action) => ({
    ...state,
    tasks: [action.payload, ...state.tasks],
  }))
})
