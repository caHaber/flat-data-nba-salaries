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
