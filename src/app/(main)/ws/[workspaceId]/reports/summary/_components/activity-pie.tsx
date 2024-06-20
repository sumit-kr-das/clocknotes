"use client";
import Chart from "react-apexcharts";
const ActivityPie = ({ options }: { options: any }) => {
  return (
    <>
      <Chart
        options={options.options}
        series={options.series}
        type="pie"
        height={350}
        width={500}
      />
    </>
  );
};
export default ActivityPie;
