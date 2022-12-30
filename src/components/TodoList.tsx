import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTodos, completeTodo, deleteTodo } from '../features/todos/todosSlice';
import Link from 'next/link'

function TodoList() {

  const { todos, isLoading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [])

  return(
    <>
      <h1>TodoList</h1>
      <Link href="/task">Agregar tarea</Link>
      <ul>
        {!isLoading && todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" name="isComplete" checked={todo.isComplete} onChange={() => dispatch(completeTodo(todo))} />
            <Link href={`/task/${todo.id}`}>{todo.name}</Link>
            <button onClick={() => dispatch(deleteTodo(todo))}>Eliminar tarea</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList