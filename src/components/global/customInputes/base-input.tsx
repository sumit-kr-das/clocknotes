import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface TProps {
  field: any;
  placeholder?: string;
  label?: string;
  description?: string;
}

const BaseInput = ({ field, placeholder, label, description }: TProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormDescription>{description}</FormDescription>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default BaseInput;
