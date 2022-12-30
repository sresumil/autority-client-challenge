import type { NextPage } from 'next'
import TodoList from '../components/TodoList'

const IndexPage: NextPage = () => {
  return (
    <main>
      <TodoList/>
    </main>
  )
}

export default IndexPage
