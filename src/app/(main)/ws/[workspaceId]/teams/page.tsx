import TeamsTable from "@/app/(main)/ws/[workspaceId]/teams/_components/teams-table";
import { getTeams } from "@/app/(main)/ws/[workspaceId]/teams/_components/actions/teams.action";
import { teamColumns } from "@/app/(main)/ws/[workspaceId]/teams/_components/columns";
const Teams = async (context: any) => {
  const { query } = context;
  const teams = await getTeams({ workspaceId: query?.workspaceId });
  return (
    <>
      <TeamsTable columns={teamColumns} data={teams} />
    </>
  );
};
export default Teams;
