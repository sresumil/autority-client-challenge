import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../features/counter-reference-redux/counterSlice'
import todosReducer from '../features/todos/todosSlice'
import todoReducer from '../features/todo/todoSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      todos: todosReducer,
      todo: todoReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
