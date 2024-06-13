"use client";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "@/app/styles/react-big-calender.css";
import dayjs from "dayjs";
import { EVENTS } from "./customData";
import CustomAppoitment from "./custom-appoitment";

const components = {
  event: ({ event }) => {
    const data = event?.data;
    console.log("dsadsdsdsd", event.data);
    if (data?.appointment)
      return <CustomAppoitment appointment={data?.appointment} />;
    // if (data?.blockout) return <CustomAppoitment blockout={data?.blockout} />;

    return null;
  },
};
const ReactBigCalender = () => {
  const localizer = dayjsLocalizer(dayjs);
  return (
    <section className="w-full h-[80vh]">
      <Calendar
        components={components}
        localizer={localizer}
        events={EVENTS}
        view="week"
      />
    </section>
  );
};

export default ReactBigCalender;
