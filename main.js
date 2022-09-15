const container = document.getElementById("container");

const colors = { r: "red", y: "yellow", b: "blue", p: "purple", g: "green" };

const rows = [
  "12 12 12 12 12 12 12 12",
  "10 6x 6 6x 4 20x 4 12x 8x 12x 10",
  "16 6x 6 6x 4 20x 4 12x 8x 12x 16",
  "8 6x 6 6x 4 20x 4 12x 8x 12x 8",
  "20 6x 6 6x 18 6x 4 6x 6 6x 6 6x 20",
  "14 6x 6 6x 18 6x 4 6x 6 6x 6 6x 14",
  "10 6x 6 6x 18 6x 4 6x 6 6x 6 6x 10",
  "16 20x 4 20x 4 6x 6 6x 6 6x 16",
  "20 20x 4 20x 4 6x 6 6x 6 6x 20",
  "16 20x 4 20x 4 6x 6 6x 6 6x 16",
  "12 11 6x 4 6x 6 6x 4 6x 6 6x 6 6x 10",
  "14 13 6x 4 6x 6 6x 4 6x 6 6x 6 6x 14",
  "16 17 6x 4 6x 6 6x 4 6x 6 6x 6 6x 20",
  "8 20x 4 20x 4 6x 6 6x 6 6x 8",
  "16 20x 4 20x 4 6x 6 6x 6 6x 16",
  "10 20x 4 20x 4 6x 6 6x 6 6x 10",
  "12 12 12 12 12 12 12 12",
];

const split = (length) => {
  let result = [];
  for (let i = 2; i < length - 2; i++) {
    const rest = length - 1 - i;
    if (rest > 1) {
      result.push([i, rest]);
    }
    if (rest > 4) {
      result.push([i, ...split(rest)[0]]);
    }
    if (i > 4) {
      result.push([...split(i)[0], rest]);
    }
  }
  return result;
};

const randomLength = (length) => {
  let result = split(length);
  result.push([length]);
  return result[Math.floor(Math.random() * result.length)];
};

const randomColor = () => {
  const keys = Object.keys(colors);
  return colors[keys[Math.floor(Math.random() * keys.length)]];
};

rows.forEach((row) => {
  const rowElement = document.createElement("div");
  rowElement.className = "row";

  row.split(" ").forEach((cell) => {
    const length = cell.match(/\d+/g);
    const color = cell.match(/\D+/g);
    const splitCell = randomLength(parseInt(length));
    splitCell.forEach((abc) => {
      const cellElement = document.createElement("div");
      cellElement.className = `cell length-${abc} ${color ? randomColor() : ""}`;
      rowElement.appendChild(cellElement);
    });
  });

  container.appendChild(rowElement);
});

let isDone = false;
let isHide = false;
setTimeout(() => {
  isDone = true;
}, 3000);
const rowElements = document.getElementsByClassName("row");
container.onclick = () => {
  if (isDone) {
    isDone = false;
    if (!isHide) {
      isHide = true;
      Array.from(rowElements).forEach((row) => {
        row.style.opacity = 1;
        row.style.translate = 0;
        row.style.animation = "hide 1s ease-out calc(var(--delay, 1) * 100ms) forwards";
      });
    } else {
      isHide = false;
      Array.from(rowElements).forEach((row) => {
        row.style.opacity = 0.3;
        row.style.translate = "calc(var(--offset) * 20rem)";
        row.style.animation = "show 1s ease-out calc(var(--delay, 1) * 100ms) forwards";
      });
    }
    setTimeout(() => {
      isDone = true;
    }, 3000);
  }
};
