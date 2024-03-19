import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { ReactChildren, ReactNode } from "react";

interface TProps {
  label: string;
  placeholder: string;
  children: ReactNode;
}

const BaseCombobox = ({ children, label, placeholder }: TProps) => {
  return (
    <>
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        {children}

        <FormMessage />
      </FormItem>
    </>
  );
};

export default BaseCombobox;
