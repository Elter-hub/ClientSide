import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GetItemService} from '../../services/get-item.service';
import {log} from 'util';
import {MatSnackBar} from '@angular/material/snack-bar';

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
              private _snackBar: MatSnackBar,
              private getItemService: GetItemService) { }

  ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      itemName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.pattern('[0-9]+')]],
      quantity: ['', [Validators.required]],
      type: ['', [Validators.required]],
      itemImageUrl: ['', [Validators.required]],
    })
  }

  onSubmit(form: any) {
    console.log(form);
    this.getItemService.postItem(form).subscribe(data => {
      this.openSnackBar(this.itemName.value, 'Successfully added!');
      this.addItemForm.reset();
    },
      error => console.log(error))

    return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
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
