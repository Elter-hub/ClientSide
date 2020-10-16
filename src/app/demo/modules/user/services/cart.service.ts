import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../../content/model/cart';

const CART_API = 'http://localhost:8082/cart/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  removeFromCart(userEmail: string, itemId: number): Observable<Cart>{
    return this.httpClient.patch<Cart>(CART_API + 'remove-item', {
      userEmail: userEmail,
      itemId: itemId
    }, httpOptions)
  }
}
