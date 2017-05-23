import { Component, OnInit } from '@angular/core';
import { TreeComponent,Tree, TreeOptions } from './../tree/tree.component';
import { ControlsComponent } from './../controls/controls.component';
import { TimeTurnerService } from '../time-turner/time-turner.service';
import { TreeRegistrarService } from '../tree-registrar/tree-registrar.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [
    TimeTurnerService,
    TreeRegistrarService
  ]
})
export class HomeComponent {

  public rootTree: Tree = {
    children: [],
  };

  /** nothing above this line is important */
  public rootOptions: TreeOptions = {
    color: 'red'
  };
  /** nothing below this line is important */

  constructor(
    public timeTurnerService: TimeTurnerService
  ) {}
  getHistory() {
    return this.timeTurnerService.logger || [];
  }
}
