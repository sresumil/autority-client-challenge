import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTodos, setTodos, completeTodo } from '../features/todos/todosSlice';

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
      <ul>
        {!isLoading && todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" name="isComplete" checked={todo.isComplete} onChange={() => dispatch(completeTodo(todo))} />
            <Link href={`/task/${todo.id}`}>{todo.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList