import Coupon from "../../../entity/Coupon";
import CouponRepository from "../../../repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [];
  }

  async get(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => coupon.code === code);
    if (!coupon) throw new Error("Coupon not found");
    return coupon;
  }

  async save(coupon: Coupon): Promise<void> {
    this.coupons.push(coupon);
  }
}
