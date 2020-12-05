export interface Item {
  itemId: number;
  price: number;
  label: string;
  type: string;
  productImageUrl: string;
  description: string;
  stars: number;
  quantity: number;
  discount?: number;
  newPrice?: number;
  _id: string,
  count: number,
}
