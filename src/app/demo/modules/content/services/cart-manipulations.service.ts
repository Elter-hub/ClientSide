import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../model/cart';
import {Item} from '../model/item';

const CONTENT_API = 'http://localhost:5000/user/';

@Injectable({
  providedIn: 'root'
})
export class CartManipulationsService {

  constructor(private http: HttpClient) {
  }

  addToCart(userEmail: string, productId: string, count: number, price: number): Observable<Item[]> {
    return this.http.patch<Item[]>(CONTENT_API + 'addToCart', {
      email: userEmail,
      product: {
        productId,
        count,
        price,
      }
    });
  }

  removeFromCart(userEmail: string, productId: string, count: number, price: number): Observable<Item[]> {
    console.log(productId);
    console.log(count);
    console.log(price);
    return this.http.patch<Item[]>(CONTENT_API + 'removeFromCart', {
      email: userEmail,
      product: {
        productId,
        count,
        price,
      }
    });
  }
}
