import { Component, OnInit } from '@angular/core';
import { TreeComponent, Tree } from './../tree/tree.component';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  color: string =  'green';

  rootTree: Tree = {
    children: [],
  };


}
