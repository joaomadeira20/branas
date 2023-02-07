import ValidateCoupon from "../../src/domain/application/ValidateCoupon";
import Coupon from "../../src/domain/entity/Coupon";
import CouponRepositoryMemory from "../../src/domain/infra/repository/memory/CouponRepositoryMemory";

test("Deve validar um cupom de desconto", async function () {
  const couponRepository = new CouponRepositoryMemory();
  couponRepository.save(
    new Coupon("MADEIRA20", 20, new Date("2021-03-10T10:00:00"))
  );
  const validateCoupon = new ValidateCoupon(couponRepository);
  const input = {
    code: "MADEIRA20",
    date: new Date("2021-03-11T10:00:00"),
  };
  const output = await validateCoupon.execute(input);
  expect(output.isExpired).toBeTruthy();
});

test("Deve validar um cupom de desconto valido", async function () {
  const couponRepository = new CouponRepositoryMemory();

  couponRepository.save(
    new Coupon("MADEIRA20", 20, new Date("2021-03-12T10:00:00"))
  );
  const validateCoupon = new ValidateCoupon(couponRepository);
  const input = {
    code: "MADEIRA20",
    date: new Date("2021-03-10T10:00:00"),
  };
  const output = await validateCoupon.execute(input);
  expect(output.isExpired).toBeFalsy();
});
