"use client";
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
import { createCheckoutSession } from "@/app/(main)/ws/[workspaceId]/billing/_components/actions/billing.actions";
import { useParams } from "next/navigation";

const proPlan = [
  "All Free Plan Items",
  "Unlimited Workspaces",
  "Unlimited Users",
  "Unlimited Teams",
  "Roles",
  "Unlimited Notes",
  "Submit and Approve Time Sheets",
];

const ProPlan = () => {
  const params = useParams<{ workspaceId: string }>();
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Pro Plan</span> <span>$7.99/Mo</span>
        </CardTitle>
        <CardDescription>
          Pro plan allows you access all the pro features. This is the monthly
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
        <form action={createCheckoutSession}>
          <input type="hidden" name="lookup_key" value="pro-monthly" />
          <input type="hidden" name="workspaceId" value={params.workspaceId} />
          <Button className="w-full" type="submit">
            <CreditCard className="mr-2 h-4 w-4" /> 15 Days Free Trail
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
export default ProPlan;
