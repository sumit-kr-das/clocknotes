"use client";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

const events = [
  {
    start: dayjs("2024-03-18T12:00:00").toDate(),
    end: dayjs("2024-03-20T12:00:00").toDate(),
    title: "My first event",
  },
];
const ReactBigCalender = () => {
  const localizer = dayjsLocalizer(dayjs);
  return (
    <div className="w-[90vw] h-[90vh]">
      <Calendar localizer={localizer} events={events} />
    </div>
  );
};

export default ReactBigCalender;
