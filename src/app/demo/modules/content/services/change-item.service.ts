import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from '../model/item';
import {Observable} from 'rxjs';

const CONTENT_API = 'http://localhost:8082/content/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChangeItemService {

  constructor(private httpClient: HttpClient) { }

  promote(item: Item, newPrice: number): Observable<Item>{
    return this.httpClient.patch<Item>(CONTENT_API + 'promote-item', {
      item: item,
      newPrice: newPrice
    })
  }

  cancelPromotion(item: Item) {
    return this.httpClient.patch<Item>(CONTENT_API + 'cancel-promote-item', {
      item: item
    })
  }

  deleteItem(item: Item) {
    return this.httpClient.post<Item>(CONTENT_API + 'delete-item', {
      item: item
    })
  }

  changeQuantity(item: Item, quantity: number) {
    return this.httpClient.patch<Item>(CONTENT_API + 'change-quantity-item', {
      item: item,
      newQuantity: quantity
    })
  }
}
