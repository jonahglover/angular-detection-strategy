import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TreeComponent } from './../tree/tree.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, TreeComponent],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule { }
