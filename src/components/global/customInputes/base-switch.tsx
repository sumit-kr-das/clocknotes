import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

interface TProps {
  field: any;
  label: string;
  description: string;
}
const BaseSwitch = ({ field, label, description }: TProps) => {
  return (
    <>
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <div className="space-y-0.5">
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
        </div>
        <FormControl>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
      </FormItem>
    </>
  );
};
export default BaseSwitch;
