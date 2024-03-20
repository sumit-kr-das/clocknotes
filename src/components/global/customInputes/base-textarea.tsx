import {
  FormControl,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TProps {
  field: any;
  placeholder?: string;
  label?: string;
  description?: string;
}
const BaseTextarea = ({ field, placeholder, label, description }: TProps) => {
  return (
    <>
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};
export default BaseTextarea;
