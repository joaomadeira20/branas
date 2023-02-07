import Cpf from "../../src/domain/entity/Cpf";

test("Deve validar um cpf válido", function () {
  const cpf = new Cpf("46218186865");
  expect(cpf.value).toBe("46218186865");
});

const wrongSameDigitsCpf = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
];

test.each(wrongSameDigitsCpf)(
  "Deve validar um cpf com todos números iguais",
  function (cpf) {
    expect(() => new Cpf(cpf)).toThrow(new Error("CPF Inválido"));
  }
);

test("Não deve validar cpf com menos caracteres", function () {
  expect(() => new Cpf("46218186864")).toThrow(new Error("CPF Inválido"));
});
