import { Component, OnInit } from '@angular/core';
import {GetItemService} from '../../services/get-item.service';
import {Item} from '../../model/item';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {
  whiskeys: Item[];
   liquors: Item[];
   roms: Item[];
   brandies: Item[];
   vodkas: Item[];
   absents: Item[];
   allItems: Item[];
  types = ['WHISKEY', 'LIQUOR', 'ROM', 'BRANDY', 'VODKA', 'ABSENT']
  filtered: Item[];
  filter = false;


  constructor(private getItemService: GetItemService) { }

  ngOnInit(): void {
    this.getItemService.getWhiskey().subscribe(data => this.whiskeys = data, error => console.log(error))
    this.getItemService.getLiquors().subscribe(data => this.liquors = data, error => console.log(error));
    this.getItemService.getRoms().subscribe(data => this.roms = data, error => console.log(error));
    this.getItemService.getBrandies().subscribe(data => this.brandies = data, error => console.log(error));
    this.getItemService.getVodkas().subscribe(data => this.vodkas = data, error => console.log(error));
    this.getItemService.getAbsents().subscribe(data => this.absents = data, error => console.log(error));
    this.getItemService.getAllItems().subscribe(data => {
      this.filtered = data;
      this.allItems = data
    }, error => console.log(error))
  }

  byLowestPrice() {
    this.filtered.sort((item1, item2) => {
      return item1.price > item2.price ? 1 : -1;
    } )
  }

  byHighestPrice() {
    this.filtered.sort((item1, item2) => {
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
    }
    this.filtered = this.filtered.filter(
      item => item.itemName.includes(value)
    )
  }
}
