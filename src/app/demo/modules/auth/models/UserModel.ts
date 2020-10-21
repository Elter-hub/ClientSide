import {Item} from '../../content/model/item';
import {Cart} from '../../content/model/cart';

export interface User {
  userId: number;
  userName: string;
  userLastName: string;
  userNickName: string;
  userEmail: string;
  userAge: number;
  userSex: string;
  imageUrl: string;
  cart: Cart;
  roles: string[];
}
