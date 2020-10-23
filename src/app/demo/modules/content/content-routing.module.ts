import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {AddItemComponent} from './components/add-item/add-item.component';
import {AllItemsComponent} from './components/all-items/all-items.component';

const routes: Routes = [
  {path: '', component: AllItemsComponent, children: [
      {path: '', component: MenuComponent },
  ]},
  {path: 'add-item', component: AddItemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
