import ReportTable from "@/app/(main)/ws/[workspaceId]/reports/detailed/_components/report-table";
import { columns } from "@/app/(main)/ws/[workspaceId]/reports/detailed/_components/detail-report-column";
import { getDetailActivityReport } from "@/app/(main)/ws/[workspaceId]/reports/detailed/_components/actions/report-detail.action";
const DetailReport = async ({ params }: any) => {
  const data = await getDetailActivityReport({
    workspaceId: params?.workspaceId,
  });
  return (
    <>
      <ReportTable columns={columns} data={data} />
    </>
  );
};
export default DetailReport;
