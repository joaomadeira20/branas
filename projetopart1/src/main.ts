import ExpressAdapter from "./domain/infra/http/ExpressAdapter";
import GetItems from "./domain/application/GetItems";
import ItemRepositoryDatabase from "./domain/infra/repository/database/ItemRepositoryDatabase";
import PgPromiseConnectionAdapter from "./domain/infra/database/PgPromiseConnectionAdapter";
import GetSingleItem from "./domain/application/GetSingleItem";

const http = new ExpressAdapter();

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);

http.on("get", "/items", async function (params: any, body: any) {
  const getItems = new GetItems(itemRepository);
  const output = await getItems.execute();
  return output;
});

http.on("get", "/items/:id", async function (params: any, body: any) {
  const getItem = new GetSingleItem(itemRepository);
  const output = await getItem.execute(parseInt(params.id));
  return output;
});
http.listen(3000);
