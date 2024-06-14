"use client";
import Chart from "react-apexcharts";
const ActivityBar = ({ options }: { options: any }) => {
  return (
    <>
      <Chart
        options={options.options}
        series={options.series}
        type="bar"
        height={350}
      />
    </>
  );
};
export default ActivityBar;
