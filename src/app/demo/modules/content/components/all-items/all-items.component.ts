import { Component, OnInit } from '@angular/core';
import {GetItemService} from '../../services/get-item.service';
import {Item} from '../../model/item';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {
  allItems: Item[];
  types = ['WHISKEY', 'LIQUOR', 'ROM', 'BRANDY', 'VODKA', 'ABSENT']
  filtered: Item[];
  filter = false;
  pageIndex:number = 0;
  pageSize:number = 10;
  lowValue:number = 0;
  highValue:number = 10;
  pageEvent: PageEvent;

  constructor(private getItemService: GetItemService) { }

  ngOnInit(): void {
    this.getItemService.getAllItems().subscribe(data => {
      this.filtered = data;
      this.allItems = data
    }, error => {
      console.log(error)
      console.log('WAIT FOR FUCKING INTERCEPTOR TO HANDLE 401');
    })
  }

  getPaginatorData(event){
    console.log(event);
    if (event == null){
      this.pageIndex = 0;
      this.lowValue = 0;
      this.highValue = this.highValue - this.pageSize;
      return;
    }

    if(event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
    }
    else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
    return event
  }

  byLowestPrice() {
    this.filtered.sort((item1, item2) => {
      this.filter = true;
      return item1.price > item2.price ? 1 : -1;
    } )
  }

  byHighestPrice() {
    this.filtered.sort((item1, item2) => {
      this.filter = true;
      return item1.price > item2.price ? -1 : 1;
    } )
  }

  showByType(type) {
    this.filtered = Object.assign([], this.allItems);
    this.filter = true;

    if (!type) {
    } // when nothing has typed
     this.filtered = this.filtered.filter(
      item => item.type == type
    )
  }

  showAll() {
    this.filter = false;
    this.filtered = Object.assign([], this.allItems);
  }

  filterByName(value: string) {
    this.filtered = Object.assign([], this.allItems);
    this.filter = true;
    if (!value) {
      this.filter = false;
    }
    this.filtered = this.filtered.filter(
      item => item.itemName.toLowerCase().includes(value.toLowerCase())
    )
  }
}
