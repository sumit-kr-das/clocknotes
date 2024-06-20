"use client";
import ActivityPie from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/activity-pie";
import formatActivityTime from "@/lib/format-activity-time";
import { Skeleton } from "@/components/ui/skeleton";
const ActivityProjectContainer = ({
  data,
}: {
  data: { projectsData: string[]; times: number[] };
}) => {
  const options = {
    series: data?.times,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: data?.projectsData,
      // dataLabels: {
      //   formatter(val: any, opts: any) {
      //     const name = opts.w.globals.labels[opts.seriesIndex];
      //     return [name, formatActivityTime(val)];
      //   },
      // },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val: number) {
            return formatActivityTime(val);
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="mt-2 p-4 rounded-sm border border-s  shadow">
      <h2 className="text-center pb-6 font-bold">Group By Project Data</h2>
      {data ? (
        <ActivityPie options={options} />
      ) : (
        <Skeleton className="h-[350px] w-[450px] rounded-sm" />
      )}
    </div>
  );
};
export default ActivityProjectContainer;
