import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TreeComponent, Tree, Options } from './../tree/tree.component';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  baseOptions: Options = {
    color: 'green'
  };

  rootTree: Tree = {
    children: [],
  };
}
