import ItemRepositoryDatabase from "../../src/domain/infra/repository/database/ItemRepositoryDatabase";
import PgPromiseConnectionAdapter from "../../src/domain/infra/database/PgPromiseConnectionAdapter";

test("Deve retornar itens do banco de daodos", async function () {
  const connection = new PgPromiseConnectionAdapter();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const items = await itemRepository.list();
  expect(items).toHaveLength(3);
  await connection.close();
});

test("Deve retornar um item do banco de daodos", async function () {
  const connection = new PgPromiseConnectionAdapter();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const item = await itemRepository.get(1);
  expect(item.price).toBe(1000);
  await connection.close();
});
