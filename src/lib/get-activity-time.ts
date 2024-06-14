const getActivityTime = (start: any, end: any) => {
  const timeGap = new Date(end).getTime() - new Date(start).getTime();

  const timeGapInHours = timeGap / (1000 * 60 * 60);
  const roundedTimeGapInHours = Math.round(timeGapInHours * 100) / 100;
  return roundedTimeGapInHours;
};
export default getActivityTime;
