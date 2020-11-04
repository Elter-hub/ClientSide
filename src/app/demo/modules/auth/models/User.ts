import {Cart} from '../../content/model/cart';
import {Message, Messages} from '../../user/models/Message';

export interface User {
  id: number;
  userName: string;
  userLastName: string;
  userNickName: string;
  userEmail: string;
  userAge: number;
  userSex: string;
  imageUrl: string;
  cart: Cart;
  roles: string[];
  messages: Messages;
}
