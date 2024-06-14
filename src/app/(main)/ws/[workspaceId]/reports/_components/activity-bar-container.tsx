"use client";
import ActivityBar from "@/app/(main)/ws/[workspaceId]/reports/_components/activity-bar";

const ActivityBarContainer = ({ activity }: any) => {
  const options = {
    series: [
      {
        name: "Total Activity",
        data: activity.activities,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: activity.dates,
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return val + "h";
          },
        },
      },
    },

    // series: [
    //   {
    //     name: "Total Activity",
    //     data: activity.activities,
    //   },
    // ],
    // options: {
    //   chart: {
    //     type: "bar",
    //     height: 350,
    //     stacked: true,
    //     toolbar: {
    //       show: false,
    //     },
    //     zoom: {
    //       enabled: false,
    //     },
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         legend: {
    //           position: "bottom",
    //           offsetX: -10,
    //           offsetY: 0,
    //         },
    //       },
    //     },
    //   ],
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       dataLabels: {
    //         total: {
    //           enabled: true,
    //           offsetY: -20,
    //           formatter: function (val: string) {
    //             return val + "h";
    //           },
    //           style: {
    //             fontSize: "13px",
    //             color: "#fff",
    //             fontWeight: 500,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   xaxis: {
    //     type: "date",
    //     categories: activity.dates,
    //   },
    //
    //   legend: {
    //     position: "right",
    //     offsetY: 40,
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    // },
  };
  return (
    <div className="w-full rounded-sm border border-s  shadow">
      <div className="w-full overflow-hidden border-s bg-white px-5 pb-5 pt-7.5 dark:bg-gray-800">
        <p className="mt-2">
          Total Time: <span className="font-bold text-2xl">00:00:00</span>
        </p>
      </div>
      <div className="px-5 pb-5 pt-7.5">
        <ActivityBar options={options} />
      </div>
    </div>
  );
};
export default ActivityBarContainer;
