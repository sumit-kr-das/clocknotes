import ClientTable from "@/app/(main)/client/_components/client-table";
import { columns } from "@/app/(main)/client/_components/columns";
import { getClients } from "@/app/api/client/client.actions";
const Client = async () => {
  const data = await getClients();

  return <>{data && <ClientTable data={data} columns={columns} />}</>;
};

export default Client;
