export const getDate = (date: Date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
  let day = date.getDate();
  let Smonth = month < 10 ? "0" + month : month;
  let Sday = day < 10 ? "0" + day : day;
  return year + "-" + Smonth + "-" + Sday;
};
