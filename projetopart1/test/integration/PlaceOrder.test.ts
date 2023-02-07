import Item from "../../src/domain/entity/Item";
import ItemRepositoryMemory from "../../src/domain/infra/repository/memory/ItemRepositoryMemory";
import PlaceOrder from "../../src/domain/application/PlaceOrder";
import OrderRepositoryMemory from "../../src/domain/infra/repository/memory/OrderRepositoryMemory";
import Dimension from "../../src/domain/entity/Dimension";
import CouponRepositoryMemory from "../../src/domain/infra/repository/memory/CouponRepositoryMemory";
import Coupon from "../../src/domain/entity/Coupon";
import OrderRepositoryDatabase from "../../src/domain/infra/repository/database/OrderRepositoryDatabase";
import PgPromiseConnectionAdapter from "../../src/domain/infra/database/PgPromiseConnectionAdapter";

test("Deve fazer um pedido", async function () {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
  const connection = new PgPromiseConnectionAdapter();
  const orderRepository = new OrderRepositoryDatabase(connection);
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
  const input = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6350);
  await connection.close();
});

test("Deve fazer um pedido com desconto", async function () {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  couponRepository.save(
    new Coupon("MADEIRA20", 20, new Date("2024-10-10T10:00:00"))
  );
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
  const input = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    coupon: "MADEIRA20",
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(5132);
});

test("Deve fazer um pedido e gerar o código do pedido", async function () {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
  );
  itemRepository.save(
    new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20)
  );
  itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
  const input = {
    cpf: "935.411.347-80",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2021-03-01T10:00:00"),
  };
  const output = await placeOrder.execute(input);
  expect(output.code).toBe("202100000001");
});
