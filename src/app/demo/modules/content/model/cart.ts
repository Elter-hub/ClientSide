import {Item} from './item';

export interface Cart {
  items: Item[];
  quantities: number[];
}
