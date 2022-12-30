import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { config } from '../../config';

export const fetchAllTodos = createAsyncThunk(
  'todos/fetchAllTodos',
  async () => {
    const tasks = await fetch(`${config.API_URL}/tasks`);
    const tasksJson = await tasks.json();
    return tasksJson.data;
  }
)

export const completeTodo = createAsyncThunk(
  'todo/completeTodo',
  async (args) => {
    try {
      const { id } = args;
      const newTodo = {
        ...args,
        isComplete: !args.isComplete
      }
      let url = `${config.API_URL}/task/${id}`;
      const task = await fetch(url, {
        method: 'put',
        body: JSON.stringify(newTodo),
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      });
      const taskJson = await task.json();
      return taskJson.data;
    } catch (error) {
      console.log(error)
    }
  }
)

const initialState = {
  isLoading: true,
  todos: [],
}

export const todosSlice = createSlice({ 
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    }
  },
  extraReducers: (builder) => {
    // fetch all
    builder.addCase(fetchAllTodos.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.todos = action.payload;
    })
    builder.addCase(fetchAllTodos.rejected, (state) => {
      state.isLoading = false;
    })
    // completeTodo
    builder.addCase(completeTodo.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(completeTodo.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      const newTodos = state.todos.map((_todo) => {
        if ( _todo.id === action.payload.id ) {
          return action.payload;
        }
        return _todo;
      })
      state.todos = newTodos;
    })
    builder.addCase(completeTodo.rejected, (state) => {
      state.isLoading = false;
    })
  },
})

export const { setTodos } = todosSlice.actions

export default todosSlice.reducer
