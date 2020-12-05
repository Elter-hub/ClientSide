import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../model/cart';

const CART_API = 'http://localhost:5000/cart/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BuyItemsService {

  constructor(private httpClient: HttpClient) { }

  buyItems(userEmail: string, itemId: number): Observable<Cart>{
    return this.httpClient.patch<Cart>(CART_API + 'add-item', {
      userEmail: userEmail,
      itemId: itemId
    }, httpOptions)
  }
}
