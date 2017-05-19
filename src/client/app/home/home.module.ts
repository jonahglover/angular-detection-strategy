import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TreeComponent } from './../tree/tree.component';
import { ControlsComponent } from './../controls/controls.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, TreeComponent, ControlsComponent],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule { }
