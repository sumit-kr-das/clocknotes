"use client";
import ActivityPie from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-pie";
import { Loader } from "lucide-react";
import formatActivityTime from "@/lib/format-activity-time";
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
      {data ? <ActivityPie options={options} /> : <Loader />}
    </div>
  );
};
export default ActivityProjectContainer;
