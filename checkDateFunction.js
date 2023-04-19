function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const date = new Date();

if (isValidDate(date)) {
  console.log("This is a valid date");
} else {
  console.log("This is a Invalid date");
}
