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
import { deleteTag } from "@/app/(main)/ws/[workspaceId]/tags/_components/actions/tags.action";
import toast from "react-hot-toast";

const DeleteTags = ({
  delOpen,
  setDelOpen,
  tagId,
}: {
  delOpen: boolean;
  setDelOpen: (delOpen: boolean) => void;
  tagId: string;
}) => {
  const onDelete = async () => {
    try {
      await deleteTag(tagId);
      toast.success("Tag deleted successfully");
      setDelOpen(false);
    } catch (e) {
      setDelOpen(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <AlertDialog open={delOpen} onOpenChange={setDelOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this tag?</AlertDialogTitle>
          <AlertDialogDescription>
            Once tag is deleted it cannot be recovered latter. Delete tags
            carefully.
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
export default DeleteTags;
