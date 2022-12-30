import { NextPage } from "next";
import TaskForm from '../../components/form';

const TaskPage: NextPage = ({task}) => {
  return (
      <>
        <TaskForm initialValues={task.data} />
      </>
  )
}

export async function getServerSideProps({params}) {
  const { id } = params;
  const task = await fetch(`http://api:4000/task/${id}`);
  const taskJson = await task.json();
  return {
    props: { task: taskJson }
  }
}

export default TaskPage;