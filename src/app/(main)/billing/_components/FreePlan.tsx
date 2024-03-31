import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const freeFeatures = [
  "Tracking Activity",
  "Timesheet & Calender",
  " Reports & Analytics",
  " Project, Clients, Tasks, Tags",
  "1 workspace",
  "Bill & Invoice",
];
const FreePlan = () => {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Free PLan</span> <span>$0.00</span>
        </CardTitle>
        <CardDescription>By default you are in the free plan</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {freeFeatures?.map((item, index) => (
          <div
            className="mb-4 grid grid-cols-[25px_1fr] items-center gap-4 pb-1 last:mb-0 last:pb-0"
            key={index}
          >
            <CheckCheck className="text-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{item}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled>
          <CheckCircle className="mr-2 h-4 w-4" /> Currently Activated
        </Button>
      </CardFooter>
    </Card>
  );
};
export default FreePlan;
