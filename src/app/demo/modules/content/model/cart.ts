import {Item} from './item';

export interface Cart {
  products: Item[]
  sum: number;
  userId: string
}



