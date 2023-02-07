import Item from "../../../entity/Item";
import ItemRepository from "../../../repository/ItemRepository";
import Connection from "../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async get(idItem: number): Promise<Item> {
    const itemsData = await this.connection.query(
      `select * from cccamad.item where id_item = ${idItem}`,
      []
    );
    if (!itemsData.length) throw new Error("Item not found");

    const item = new Item(
      itemsData[0].id_item,
      itemsData[0].description,
      parseFloat(itemsData[0].price)
    );
    return item;
  }
  save(item: Item): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<Item[]> {
    const itemsData = await this.connection.query(
      "select * from cccamad.item",
      []
    );
    const items: Item[] = [];
    for (const itemData of itemsData) {
      items.push(
        new Item(
          itemData.id_item,
          itemData.description,
          parseFloat(itemData.price)
        )
      );
    }
    return items;
  }
}
