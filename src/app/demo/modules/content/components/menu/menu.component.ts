import { Component, OnInit } from '@angular/core';
import {GetItemService} from '../../services/get-item.service';
import {Item} from '../../model/item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  whiskeys: Item[];
  liquors: Item[];
  roms: Item[];
  vodkas: Item[];
  absents: Item[];
  brandies: Item[];

  constructor(private getItemService: GetItemService) { }

  ngOnInit(): void {
      // this.getItemService.getWhiskey().subscribe(data => this.whiskeys = data, error => console.log(error))
      // this.getItemService.getLiquors().subscribe(data => this.liquors = data, error => console.log(error));
      // this.getItemService.getRoms().subscribe(data => this.roms = data, error => console.log(error));
      // this.getItemService.getBrandies().subscribe(data => this.brandies = data, error => console.log(error));
      // this.getItemService.getVodkas().subscribe(data => this.vodkas = data, error => console.log(error));
      // this.getItemService.getAbsents().subscribe(data => this.absents = data, error => console.log(error));
  }
}
