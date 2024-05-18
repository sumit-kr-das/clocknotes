import TaskContainer from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/task-container";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddTask from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/add-task";
import { getTasks } from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/action/task.actions";
// import { useParams } from "next/navigation";
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
