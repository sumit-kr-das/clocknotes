import ClientTable from "@/app/(main)/client/_components/ClientTable";
import { Payment, columns } from "@/app/(main)/client/_components/columns";
const Client = async () => {
  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        name: "Jony Sins",
        address: "Bihar, Jabbalpur",
        currency: "$",
      },
      {
        id: "8c6f94a2",
        name: "Alice Smith",
        address: "New York, USA",
        currency: "USD",
      },
      {
        id: "3b7e5d9c",
        name: "Juan Rodriguez",
        address: "Madrid, Spain",
        currency: "€",
      },
      {
        id: "9f2a7b1e",
        name: "Mai Nguyen",
        address: "Ho Chi Minh City, Vietnam",
        currency: "₫",
      },
    ];
  }
  const data = await getData();
  return (
    <>
      <ClientTable data={data} columns={columns} />
    </>
  );
};

export default Client;
