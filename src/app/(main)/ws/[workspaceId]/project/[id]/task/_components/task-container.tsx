"use client";
import { Separator } from "@/components/ui/separator";
import TaskCard from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/task-card";
import TTask from "@/type/task/task";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { editTaskStatus } from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/action/task.actions";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddTask from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/add-task";

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const TaskContainer = ({ tasks }: { tasks: TTask[] }) => {
  const [orderedList, setOrderedList] = useState(tasks);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search !== "") {
      const filteredTasks = tasks.map((statusGroup) => {
        return {
          status: statusGroup.status,
          data: statusGroup.data.filter((task) =>
            task.name.toLowerCase().includes(search.toLowerCase()),
          ),
        };
      });
      setOrderedList(filteredTasks);
      return;
    }
    setOrderedList(tasks);
  }, [tasks, search]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    console.log(result);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let newOrderedData = [...orderedList];
    console.log(newOrderedData, "ordered data");
    const sourceList = newOrderedData.find(
      (list) => list.status === source.droppableId,
    );
    const destList = newOrderedData.find(
      (list) => list.status === destination.droppableId,
    );
    if (!sourceList || !destList) {
      return;
    }
    if (!sourceList.data) {
      sourceList.data = [];
    }
    if (!destList.data) {
      destList.data = [];
    }
    if (source.droppableId === destination.droppableId) {
      return;
    } else {
      const [moveCard] = sourceList.data.splice(source.index, 1);
      moveCard.status = destination.droppableId;
      destList.data.splice(destination.index, 0, moveCard);
      sourceList.data.forEach((card, idx) => {
        card.order = idx;
      });

      // Update the order for each card in the destination list
      destList.data.forEach((card, idx) => {
        card.order = idx;
      });
      setOrderedList(newOrderedData);
      await editTaskStatus({
        taskId: moveCard.id,
        status: destination.droppableId,
      });
      toast.success("Task status chaged successfully");
    }
  };
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative min-w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foregrounds" />
            <Input
              className="w-full rounded-md pl-8"
              placeholder="Search Task"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <AddTask />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full grid justify-between gap-x-4 gap-y-8 grid-cols-[repeat(auto-fill,minmax(350px,1fr))] mt-4">
          {orderedList?.map((list, index) => (
            <div
              className="w-[350px] min-h-[450px] overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl"
              key={index}
            >
              <h1 className="text-xl font-bold px-4 py-2">{list.status}</h1>
              <Separator className="my-2" />
              <Droppable droppableId={list.status} type="card">
                {(provided) => (
                  <div
                    className="my-2"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {list?.data?.map((task, index) => (
                      <TaskCard task={task} index={index} key={task.id} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};
export default TaskContainer;
