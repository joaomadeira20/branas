import { validate } from "../../../src/example2/before/cpf";

test("Deve validar um cpf válido", function () {
  const isValid = validate("46218186865");
  expect(isValid).toBeTruthy();
});

test("Deve validar um cpf com todos números iguais", function () {
  const isValid2 = validate("111.111.111-11");
  expect(isValid2).toBeFalsy();
});

test("Deve validar um cpf que seja nulo", function () {
  const isValid2 = validate(null);
  expect(isValid2).toBeFalsy();
});
