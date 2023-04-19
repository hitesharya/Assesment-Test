let start = 0;
const end = 60;
let gap = 2;

const seriesArray = [];

function printSeries(start, end, gap) {
  seriesArray.push(start);
  for (let i = start; i <= end; i++) {
    start = start + gap;
    seriesArray.push(start);
    i = start + gap;
    gap++;
  }
}

printSeries(start, end, gap);

console.log(seriesArray);
