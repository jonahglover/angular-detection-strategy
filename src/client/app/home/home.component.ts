import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TreeComponent, Tree } from './../tree/tree.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TimeTurnerService,
    TreeRegistrarService
  ]
})
export class HomeComponent {
  constructor(
    public timeTurnerService: TimeTurnerService
  ){}

  color: String = 'red';

  rootTree: Tree = {
    children: [],
  };

  getHistory() {
    debugger;
    return this.timeTurnerService.logger || [];
  }
}
