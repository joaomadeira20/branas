// calculate ride
const OVERNIGHT_FARE = 3.9;
const SUNDAY_FARE = 2.9;
const OVERNIGHT_SUNDAY_FARE = 5;
const NORMAL_FARE = 2.1;
const OVERNIGHT_START = 22;
const OVERNIGHT_END = 6;
const MIN_FARE = 10;

function isOvernight(date: Date) {
  return date.getHours() >= OVERNIGHT_START || date.getHours() <= OVERNIGHT_END;
}
function isSunday(date: Date) {
  return date.getDay() === 0;
}
function isValidDistance(distance: number) {
  return (
    distance != null &&
    distance != undefined &&
    typeof distance === "number" &&
    distance > 0
  );
}
function isValidDate(date: Date) {
  return (
    date != null &&
    date != undefined &&
    date instanceof Date &&
    date.toString() !== "Invalid Date" &&
    date.toString() !== "Invalid Date"
  );
}

interface Segment {
  distance: number;
  date: Date;
}

export function calculateRide(segments: Segment[]): number {
  let fare = 0;
  for (const segment of segments) {
    if (!isValidDistance(segment.distance)) throw new Error("Invalid Distance");
    if (!isValidDate(segment.date)) throw new Error("Invalid Date");
    if (isOvernight(segment.date) && !isSunday(segment.date)) {
      fare += segment.distance * OVERNIGHT_FARE;
      continue;
    }
    if (isOvernight(segment.date) && isSunday(segment.date)) {
      fare += segment.distance * OVERNIGHT_SUNDAY_FARE;
      continue;
    }

    if (isSunday(segment.date)) {
      fare += segment.distance * SUNDAY_FARE;
      continue;
    }
    fare += segment.distance * NORMAL_FARE;
  }
  return fare > MIN_FARE ? fare : MIN_FARE;
}
