export const YEARS = [
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25",
  "2025-26",
  "2026-27",
];

export function moneyStrToNumber(d) {
  return +d.replaceAll(",", "").replace("$", "");
}

export function parseRawSalaries(d) {
  YEARS.map((y) => {
    d[y] = moneyStrToNumber(d[y]);
  });
  d["Guaranteed"] = moneyStrToNumber(d["Guaranteed"]);
  return d;
}
