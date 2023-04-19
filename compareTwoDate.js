function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const date1 = new Date("2022-03-27");
const date2 = new Date("2022-03-26");

if (!isValidDate(date1)) {
  console.log("date1 is Invalid ");
}
if (!isValidDate(date2)) {
  console.log("date2 is Invalid ");
}

if (date1 > date2) {
  console.log("date1 is greater than date2");
}

if (date2 > date1) {
  console.log("date2 is greater than date1");
}
