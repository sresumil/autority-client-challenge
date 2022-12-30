import { NextPage } from "next";
import TodoForm from "../../components/TodoForm";

const TaskPage: NextPage = ({id}) => {
  return (
      <>
        <TodoForm todoId = {id}/>
      </>
  )
}

export async function getServerSideProps({params}) {
  const { id } = params;
  return {
    props: { id }
  }
}

export default TaskPage;