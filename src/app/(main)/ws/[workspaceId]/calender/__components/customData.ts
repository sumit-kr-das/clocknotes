import dayjs from "dayjs";

export const EVENTS = [
  {
    start: dayjs("2024-06-09T09:00:00").toDate(),
    end: dayjs("2024-06-09T12:59:59").toDate(),
    data: {
      name: "Fixing navigation bar Fixing navigation bar",
      isBillable: true,
      project: "Company 1",
      tags: ["node", "reactjs", "mariaDB"],
      color: "#2E4EAD",
    },
    isDraggable: true,
  },
  {
    start: dayjs("2024-06-10T12:00:00").toDate(),
    end: dayjs("2024-06-10T13:00:00").toDate(),
    data: {
      name: "Home page complete",
      isBillable: true,
      project: "Company 1",
      tags: ["node", "reactjs", "mariaDB"],
      color: "#6D1509",
    },
    isDraggable: true,
  },
  {
    start: dayjs("2024-06-12T09:00:00").toDate(),
    end: dayjs("2024-06-12T14:59:59").toDate(),
    data: {
      name: "Fixing navigation bar",
      isBillable: false,
      project: "NPTEL",
      tags: ["node", "reactjs", "mariaDB"],
      color: "#118186",
    },
    isDraggable: true,
  },
];
