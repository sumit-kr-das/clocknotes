"use client";
import ActivityBar from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/activity-bar";
import formatActivityTime from "@/lib/format-activity-time";
import { useState } from "react";
import { Loader } from "lucide-react";
import ActivityReportLoader from "@/app/(main)/ws/[workspaceId]/reports/summary/_components/activity-report-loader";
const ActivityBarContainer = ({ activity }: { activity: any }) => {
  const options = {
    series: [
      {
        name: "Total Activity",
        data: activity?.activities,
      },
    ],
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
        type: "bar",
        height: 350,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "100%",
          endingShape: "rounded",
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
        formatter: (val: number) => {
          return formatActivityTime(val);
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        type: "date",
        categories: activity?.dates,
      },
      yaxis: {
        labels: {
          formatter: (val: string) => {
            return val + " H";
          },
        },
        title: {
          text: "Activity Time in Hours",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        theme: true,
        y: {
          formatter: function (val: number) {
            return formatActivityTime(val);
          },
        },
      },
    },
  };
  return (
    <>
      {activity?.activities ? (
        <div className="w-full rounded-sm border border-s  shadow">
          <div className="w-full overflow-hidden border-s bg-white px-5 pb-5 pt-7.5 dark:bg-gray-800">
            <p className="mt-2">
              Total Time:{" "}
              <span className="font-bold text-2xl">
                {formatActivityTime(activity?.totalActivityTime)}
              </span>
            </p>
          </div>
          <div className="px-5 pb-5 pt-7.5">
            <ActivityBar options={options} />
          </div>
        </div>
      ) : (
        <ActivityReportLoader />
      )}
    </>
  );
};
export default ActivityBarContainer;
