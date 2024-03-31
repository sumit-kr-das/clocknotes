import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const proPlan = [
  "All Free Plan Items",
  "Unlimited Workspaces",
  "Unlimited Users",
  "Unlimited Teams",
  "Roles",
  "Unlimited Notes",
  "Submit and Approve Time Sheets",
];
const YearProPlan = () => {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Yearly Pro Plan</span> <span>$99.99/Year</span>
        </CardTitle>
        <CardDescription>
          Pro plan allows you access all the pro features. This is the yearly
          plan
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {proPlan?.map((item, index) => (
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
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" /> Upgrade
        </Button>
      </CardFooter>
    </Card>
  );
};
export default YearProPlan;
