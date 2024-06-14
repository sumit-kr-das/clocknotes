import dayjs from "dayjs";

export const EVENTS = [
  {
    start: dayjs("2024-06-10T10:00:00").toDate(),
    end: dayjs("2024-06-10T11:00:00").toDate(),
    name: "Fixing navigation bar",
    isBillable: true,
    project: "Company 1",
    tags: ["node", "reactjs", "mariaDB"],
    color: "",
    isDraggable: true,
  },
  {
    start: dayjs("2024-06-10T12:00:00").toDate(),
    end: dayjs("2024-06-10T13:00:00").toDate(),
    name: "Home page complete",
    isBillable: true,
    project: "Company 1",
    tags: ["node", "reactjs", "mariaDB"],
    isDraggable: true,
  },
  {
    start: dayjs("2024-06-12T09:00:00").toDate(),
    end: dayjs("2024-06-12T14:59:59").toDate(),
    name: "Fixing navigation bar",
    isBillable: false,
    project: "NPTEL",
    tags: ["node", "reactjs", "mariaDB"],
    isDraggable: true,
  },
];
