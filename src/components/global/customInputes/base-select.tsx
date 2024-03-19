import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TProps {
  field: any;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  label: string;
}

const BaseSelect = ({ field, placeholder, options, label }: TProps) => {
  return (
    <>
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options?.map((item, index) => (
              <SelectItem value={item?.value} key={index}>
                {item?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </>
  );
};
export default BaseSelect;
