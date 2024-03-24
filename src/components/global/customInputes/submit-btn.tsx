import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
const SubmitBtn = ({
  isLoading,
  variant,
  label,
}: {
  isLoading: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  label?: string;
}) => {
  return (
    <>
      {isLoading ? (
        <Button disabled>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant={variant || "default"} type="submit">
          {label || "Submit"}
        </Button>
      )}
    </>
  );
};
export default SubmitBtn;
