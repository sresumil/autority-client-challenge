import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const IndexPage: NextPage = () => {

  // const todosState = useSelector(state => state.todos);

  return (
    <main>
      {/* <TodoForm/> */}
      <TodoList/>
    </main>
  )
}

// export async function getStaticProps() {
//   const tasks = await fetch("http://api:4000/tasks");
//   const tasksJson = await tasks.json();
//   return {
//     props: { tasks: tasksJson }
//   }
// }

export default IndexPage
