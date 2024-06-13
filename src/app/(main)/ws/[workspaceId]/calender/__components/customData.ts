import dayjs from "dayjs";

export const EVENTS = [
  {
    start: dayjs("2024-06-10T10:00:00").toDate(),
    end: dayjs("2024-06-10T11:00:00").toDate(),
    data: {
      appointment: {
        id: 1,
        status: "P",
        location: "New York",
        resource: "Dr Alex",
        address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
      },
    },
    isDraggable: true,
  },
  {
    start: dayjs("2024-06-10T12:00:00").toDate(),
    end: dayjs("2024-06-10T13:00:00").toDate(),
    data: {
      appointment: {
        id: 2,
        status: "CI",
        location: "Washington",
        resource: "Dr David",
        address: "Block 1\nSStreet 32\nLong Island\nNew York",
      },
    },
    isDraggable: false,
  },
  {
    start: dayjs("2024-06-12T09:00:00").toDate(),
    end: dayjs("2024-06-12T14:59:59").toDate(),
    data: {
      blockout: {
        id: 1,
        name: "Christmas Holidays",
      },
    },
  },
];
