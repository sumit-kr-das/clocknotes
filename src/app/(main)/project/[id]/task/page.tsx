import TaskContainer from "@/app/(main)/project/[id]/task/_components/task-container";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddTask from "@/app/(main)/project/[id]/task/_components/add-task";
import { getTasks } from "@/app/(main)/project/[id]/task/_components/action/task.actions";
// import { useParams } from "next/navigation";
const Task = async (props: any) => {
  // const params = useParams();
  const params = props.params;
  console.log(params.id);
  const tasks = await getTasks(params.id);
  return (
    <>
      <h1 className="text-xl mb-4 font-bold">Tasks</h1>
      <div className="w-full flex justify-between">
        <div className="bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative min-w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foregrounds" />
            <Input
              className="w-full rounded-md pl-8"
              placeholder="Search Task"
            />
          </div>
        </div>
        <AddTask />
      </div>
      <TaskContainer tasks={tasks} />
    </>
  );
};

export default Task;
