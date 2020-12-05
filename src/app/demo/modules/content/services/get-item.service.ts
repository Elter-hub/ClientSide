import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../model/item';

const CONTENT_API = 'http://localhost:5000/content/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GetItemService {
  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(CONTENT_API)
  }

  postItem(value: any){
    return this.http.post(CONTENT_API + 'add-item', {
      price: value.price,
      quantity: value.quantity,
      itemName: value.itemName,
      type: value.type,
      itemImageUrl: value.itemImageUrl,
      description: value.description
    }, httpOptions)
  }

}
