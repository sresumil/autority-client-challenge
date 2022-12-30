import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { config } from '../../config';

export const fetchTodoById = createAsyncThunk(
  'todo/fetchTodoById',
  async (args) => {
    const { id } = args;
    const task = await fetch(`${config.API_URL}/task/${id}`);
    const taskJson = await task.json();
    return taskJson.data;
  }
)

export const createOrUpdateTodo = createAsyncThunk(
  'todo/createOrUpdateTodo',
  async (args, {getState}) => {
    try {
      const _todo = getState().todo.todo;
      const { id } = _todo; 
      let method = 'post';
      let url = `${config.API_URL}/task`;
      if ( id != "" ) {
        url += `/${id}`
        method = 'put';
      }
      const task = await fetch(url, {
        method: method,
        body: JSON.stringify(_todo),
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      });
      const taskJson = await task.json();
      return taskJson.data;
    } catch (error) {
      console.log(error)
    }
  }
)

const todo = {
  id: '',
  name: '',
  description: '',
  author: '',
  isComplete: false,
}

const initialState = {
  isLoading: true,
  todo,
}

export const todoSlice = createSlice({ 
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload
    }
  },
  extraReducers: (builder) => {
    // getById
    builder.addCase(fetchTodoById.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchTodoById.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.todo = action.payload;
    })
    builder.addCase(fetchTodoById.rejected, (state) => {
      state.isLoading = false;
    })
    // createOrUpdate
    builder.addCase(createOrUpdateTodo.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(createOrUpdateTodo.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      state.todo = action.payload;
    })
    builder.addCase(createOrUpdateTodo.rejected, (state) => {
      state.isLoading = false;
    })
  },
})

export const { setTodo } = todoSlice.actions

export default todoSlice.reducer
