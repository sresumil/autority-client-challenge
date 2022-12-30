import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

const IndexPage: NextPage = ({tasks}) => {

  const [todos, setTodos] = useState(tasks);

  const completeTodo = async function(task) {
    task = {
      ...task,
      isComplete: !task.isComplete,
    }
    await fetch(`http://localhost:4000/task/${task.id}`, {method: "put", body: JSON.stringify(task), headers: {Accept: 'application/json', 'Content-Type': 'application/json'}, })
    const newData = todos.data.map((todo) => {
      if ( todo.id === task.id ) {
        return task;
      }
      return todo;
    });
    const newTodos = {
      ...todos,
      data: newData
    }
    setTodos(newTodos);
  }

  const deleteTask = async function (id) {
    let response = await fetch(`http://localhost:4000/task/${id}`, {
      method: "delete",
    });
    const todos = await response.json();
    setTodos(todos)
  }

  return (
    <main>
      <h1>Lista de tareas</h1>
      <ul>
        {todos && todos.data && todos.data.length > 0 && todos.data.map((task, index) => (
          <li key={index}><input type="checkbox" checked={task.isComplete} onChange={() => completeTodo(task)} key={task.id} /><Link href={`/task/${task.id}`}>{task.name} - {task.isComplete ? "terminado" : "pendiente"}</Link> - <button onClick={() => {deleteTask(task.id)}}>X</button></li>
        ))}
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  const tasks = await fetch("http://api:4000/tasks");
  const tasksJson = await tasks.json();
  return {
    props: { tasks: tasksJson }
  }
}

export default IndexPage
