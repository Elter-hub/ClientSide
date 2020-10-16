import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GetItemService} from '../../services/get-item.service';
import {log} from 'util';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  alcohols = ['WHISKEY', 'LIQUOR', 'ROM', 'BRANDY', 'VODKA', 'ABSENT']
  selected: any;
  constructor(private formBuilder: FormBuilder,
              private getItemService: GetItemService) { }

  ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      itemName: [''],
      description: [''],
      price: [''],
      quantity: [''],
      type: [''],
      itemImageUrl: [''],
    })
  }

  onSubmit(value: any) {
    console.log(value);
    this.getItemService.postItem(value).subscribe(data => console.log(data),
      error => console.log(error))
    return false;
  }

  get itemName(){
    return this.addItemForm.get('itemName');
  }
  get description(){
    return this.addItemForm.get('description');
  }
  get price(){
    return this.addItemForm.get('price');
  }
  get quantity(){
    return this.addItemForm.get('quantity');
  }
  get type(){
    return this.addItemForm.get('type');
  }
  get itemImageUrl(){
    return this.addItemForm.get('itemImageUrl');
  }


}
