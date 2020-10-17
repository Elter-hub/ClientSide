import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AddItemComponent } from './components/add-item/add-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ItemComponent } from './components/item/item.component';
import {AllItemsComponent} from './components/all-items/all-items.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [MenuComponent, AddItemComponent, ItemComponent, AllItemsComponent],
    imports: [
        CommonModule,
        ContentRoutingModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        DragDropModule
    ]
})
export class ContentModule { }
