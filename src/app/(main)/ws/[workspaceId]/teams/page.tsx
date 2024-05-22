import TeamsTable from "@/app/(main)/ws/[workspaceId]/teams/_components/teams-table";
import { getTeams } from "@/app/(main)/ws/[workspaceId]/teams/_components/actions/teams.action";
import { teamColumns } from "@/app/(main)/ws/[workspaceId]/teams/_components/columns";
const Teams = async ({ params }: any) => {
  const teams = await getTeams({ workspaceId: params?.workspaceId });
  return (
    <>
      <TeamsTable columns={teamColumns} data={teams} />
    </>
  );
};
export default Teams;
