import ItemRepository from "../repository/ItemRepository";

export default class GetSingleItem {
  constructor(readonly itemRepository: ItemRepository) {}

  async execute(itemId: number): Promise<Output> {
    const item = await this.itemRepository.get(itemId);
    return item;
  }
}

type Output = {
  idItem: number;
  description: string;
  price: number;
};
