import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { fetchTeam } from "@/app/(main)/invite/[inviteKey]/_components/actions/invite.actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Invite = async ({ params }: any) => {
  const inviteKey = params?.inviteKey;
  console.log(inviteKey, "invite key");
  // const setInvite = async () => {
  //   await acceptInvite({ teamId: inviteKey });
  // };
  async function acceptInvite() {
    "use server";
    try {
      cookies().set("teamId", inviteKey, { secure: true });
    } catch (e: any) {
      console.log(e.message);
    }
    redirect("../auth/sign-in");
  }
  const team = await fetchTeam({ teamId: inviteKey });
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Invitation Request</CardTitle>
          <CardDescription>
            Click on accept button to join the team .
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {team?.workspace?.name}
              </p>
            </div>
          </div>
          <div></div>
        </CardContent>
        <CardFooter>
          <form action={acceptInvite}>
            <Button className="w-full" type="submit">
              Accept Invitation
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Invite;
