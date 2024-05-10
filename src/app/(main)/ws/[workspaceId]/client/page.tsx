import ClientTable from "@/app/(main)/ws/[workspaceId]/client/_components/client-table";
import { columns } from "@/app/(main)/ws/[workspaceId]/client/_components/columns";
import { getClients } from "@/app/(main)/ws/[workspaceId]/client/_components/action/client.actions";
import { getWorkspaceById } from "@/app/(main)/ws/actions/workspace.action";
const Client = async () => {
  const data = await getClients();

  return <>{data && <ClientTable data={data} columns={columns} />}</>;
};

export default Client;
