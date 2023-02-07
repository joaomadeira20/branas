import { calculateRide } from "../../src/example1/calculateRide";

test("Deve calculateRideular o valor da corrida em horário normal", function () {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-01T10:00:00") },
  ]);
  expect(fare).toBe(21);
});

test("Deve calculateRideular o valor da corrida em horário noturno", function () {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-01T23:00:00") },
  ]);
  expect(fare).toBe(39);
});

test("Deve calculateRideular o valor da corrida em horário normal no domingo", function () {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-07T10:00:00") },
  ]);
  expect(fare).toBe(29);
});

test("Deve calculateRideular o valor da corrida em horário noturno no domingo", function () {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-07T23:00:00") },
  ]);
  expect(fare).toBe(50);
});

test("Deve calculateRideular o valor da corrida minima", function () {
  const fare = calculateRide([
    { distance: 3, date: new Date("2021-03-01T10:00:00") },
  ]);
  expect(fare).toBe(10);
});

test("Deve retornar -1 se a distanceancia for invalida", function () {
  // const fare = calculateRide([
  //   { distance: -3, date: new Date("2021-03-01T10:00:00") },
  // ]);
  expect(() =>
    calculateRide([{ distance: -3, date: new Date("2021-03-01T10:00:00") }])
  ).toThrow(new Error("Invalid Distance"));
  // expect(fare).toBe(-1);
});

test("Deve retornar -2 se a data for invalida", function () {
  // const fare = calculateRide([{ distance: 10, date: new Date("abcdef") }]);
  expect(() =>
    calculateRide([{ distance: 10, date: new Date("abcdef") }])
  ).toThrow(new Error("Invalid Date"));
  // expect(fare).toBe(-2);
});

test("Deve retornar o valor da corrida em multiplos horarios", function () {
  const fare = calculateRide([
    { distance: 10, date: new Date("2021-03-01T21:00:00") },
    { distance: 10, date: new Date("2021-03-01T22:00:00") },
  ]);
  expect(fare).toBe(60);
});
