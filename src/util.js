import moment from "moment";

export function convertToPercent(v) {
  return Number(v.toFixed(2)) + "%";
}

export function getNowStr() {
  return moment().format("YYYY/MM/DD HH:mm");
}
