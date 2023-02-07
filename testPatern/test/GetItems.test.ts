import GetItems from "../src/GetItems";
import ItemsRepositoryMemory from "../src/ItemRepositoryMemory";
import ItemsRepositoryDatabase from "../src/ItemsRepositoryDatabase";
import sinon from "sinon";

test("Deve obter os itens", async function () {
  const itemsRepository = new ItemsRepositoryDatabase();
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(3);
  expect(items[0].description).toBe("Guitarra");
  expect(items[0].price).toBe(1000);
});

test("Deve obter os itens com um fake repository", async function () {
  //fake é uma implementacao completa q basicamente retorna conteudo
  const itemsRepository = new ItemsRepositoryMemory();
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(3);
  expect(items[0].description).toBe("Guitarra");
  expect(items[0].price).toBe(1000);
});

test("Deve obter os itens com um stub", async function () {
  const itemsRepository = new ItemsRepositoryDatabase();
  //passa por cima de um retorno especifico
  sinon
    .stub(itemsRepository, "getItems")
    .returns(Promise.resolve([{ description: "Bola", price: 1000 }]));
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(1);
  expect(items[0].description).toBe("Bola");
  expect(items[0].price).toBe(1000);
});

test("Deve obter os itens com um spy", async function () {
  const itemsRepository = new ItemsRepositoryDatabase();
  //usar qndo quero verificar se algo foi chamado, qts x
  const spy = sinon.spy(itemsRepository, "getItems");
  const getItems = new GetItems(itemsRepository);
  const items = await getItems.execute();
  expect(items).toHaveLength(3);
  sinon.assert.calledOnce(spy);
});

test("Deve obter os itens com um mock", async function () {
  const itemsRepository = new ItemsRepositoryDatabase();
  const getItems = new GetItems(itemsRepository);
  const mock = sinon.mock(getItems);
  mock
    .expects("execute")
    .returns(Promise.resolve([{ description: "Bola", price: 1000 }]));
  const items = await getItems.execute();
  expect(items).toHaveLength(1);
  expect(items[0].description).toBe("Bola");
  expect(items[0].price).toBe(1000);
  mock.verify(); //verifica a linha 52
  sinon.restore();
});

test("Deve obter os itens com um mock pegando do itemsRepository", async function () {
  const itemsRepository = new ItemsRepositoryDatabase();
  const getItems = new GetItems(itemsRepository);
  const mock = sinon.mock(itemsRepository);
  mock
    .expects("getItems")
    .returns(Promise.resolve([{ description: "Bola", price: 1000 }]));
  const items = await getItems.execute();
  expect(items).toHaveLength(1);
  expect(items[0].description).toBe("Bola");
  expect(items[0].price).toBe(1000);
  mock.verify(); //verifica a linha 67
  sinon.restore();
});
