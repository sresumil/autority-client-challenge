import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTodo, createOrUpdateTodo, fetchTodoById } from '../features/todo/todoSlice'

function TodoForm({todoId = ""}) {

  const { todo, isLoading } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleChange = function (e) {
    const newTodo = {
      ...todo.todo,
      [e.target.name]: e.target.value
    }
    dispatch(setTodo(newTodo))
  }

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(createOrUpdateTodo())
  }

  useEffect(() => {
    if ( todoId != "" ) {
      dispatch(fetchTodoById({id: todoId}))
    }
  }, [])

  return(
    <>
      <h1>TodoForm</h1>
      <p>{ isLoading ? 'Loading' : 'Ready' }</p>
      <p>{ todo.todo.name }</p>
      <form>
        <ul>
          <li><label>Nombre: </label><input type="text" name="name" value={todo.todo.name} onChange={handleChange} /></li>
          <li><label>Autor: </label><input type="text" name="author" value={todo.todo.author} onChange={handleChange} /></li>
          <li><label>Descripcion: </label><textarea name="description" value={todo.todo.description} onChange={handleChange}></textarea></li>
          <li><button type="submit" onClick={handleSubmit}>Enviar</button></li>
        </ul>
      </form>
    </>
  )
}

export default TodoForm