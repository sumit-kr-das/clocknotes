import dayjs from "dayjs";
const getActivityTime = (start: any, end: any) => {
  const startTime = dayjs(start);
  const endTime = dayjs(end);
  const timeGapInHours = endTime.diff(startTime, "hour", true); // The true flag enables floating point values
  // const roundedTimeGapInHours = Math.round(timeGapInHours * 100) / 100;
  return timeGapInHours;
};
export default getActivityTime;
