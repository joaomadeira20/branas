import { validateCpf } from "../../../src/example2/after/cpf";

test("Deve validar um cpf válido", function () {
  const isValid = validateCpf("46218186865");
  expect(isValid).toBeTruthy();
});

const wrongSameDigitsCpf = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
];

test.each(wrongSameDigitsCpf)(
  "Deve validar um cpf com todos números iguais",
  function (cpf) {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeFalsy();
  }
);

test("Deve validar um cpf que seja nulo", function () {
  const isValid = validateCpf(null);
  expect(isValid).toBeFalsy();
});

test("Deve validar um cpf válido sem pontos e traços", function () {
  const isValid = validateCpf("46218186865");
  expect(isValid).toBeTruthy();
});

test("Deve validar um cpf válido com alguns pontos", function () {
  const isValid = validateCpf("462.181.86865");
  expect(isValid).toBeTruthy();
});
