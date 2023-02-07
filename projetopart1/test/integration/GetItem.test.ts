import GetSingleItem from "../../src/domain/application/GetSingleItem";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import ItemRepositoryMemory from "../../src/domain/infra/repository/memory/ItemRepositoryMemory";

test("Deve buscar um item ", async function () {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3)
  );
  const getItem = new GetSingleItem(itemRepository);
  const output = await getItem.execute(1);
  expect(output.price).toBe(1000);
});
