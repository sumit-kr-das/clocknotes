import { getTasks } from "@/app/(main)/project/[id]/task/_components/action/task.actions";
import TaskContainer from "@/app/(main)/project/[id]/task/_components/task-container";

const Task = async (props: any) => {
  const params = props.params;
  const tasks = await getTasks(params.id);
  return (
    <>
      <h1 className="text-xl mb-4 font-bold">Tasks</h1>
      <TaskContainer tasks={tasks} />
    </>
  );
};

export default Task;
