import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { deleteTask } from "@/app/(main)/ws/[workspaceId]/project/[id]/task/_components/action/task.actions";
import toast from "react-hot-toast";

const DeleteTask = ({
  taskId,
  open,
  setOpen,
}: {
  taskId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const params = useParams();
  const projectId = params.id;

  const onDelete = async () => {
    try {
      await deleteTask({ taskId, projectId });
      toast.success("Task deleted successfully");
      setOpen(false);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete the task?</AlertDialogTitle>
          <AlertDialogDescription>
            Once the task is deleted it cannot be revert later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTask;
