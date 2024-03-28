import FreePlan from "@/app/(main)/billing/_components/FreePlan";
import ProPlan from "@/app/(main)/billing/_components/ProPlan";
import YearProPlan from "@/app/(main)/billing/_components/YearProPlan";
import { hasSubscription } from "@/lib/stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSliders } from "lucide-react";
import { createPortalSession } from "@/app/(main)/billing/_components/actions/billing.actions";
const Billing = async () => {
  const subs = await hasSubscription();
  return (
    <div>
      {subs ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Pro Plan Activated</CardTitle>
              <CardDescription>
                You are currently on a pro plan. In the pro plan your all
                features are unlocked. You can manage your subscription clicking
                on the manage subscription buttion
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <form action={createPortalSession}>
                <Button type="submit">
                  <FileSliders className="mr-2 h-4 w-4" /> Manage Subscription
                </Button>
              </form>
            </CardFooter>
          </Card>
        </>
      ) : (
        <div className="flex gap-12 mt-4">
          <FreePlan />
          <ProPlan />
          {/*<YearProPlan />*/}
        </div>
      )}
    </div>
  );
};
export default Billing;
