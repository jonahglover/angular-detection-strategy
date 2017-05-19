import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimeTurnerService } from '../time-turner/time-turner.service';
import { TreeRegistrarService } from '../tree-registrar/tree-registrar.service';
import { LockService } from '../lock/lock.service';
import { FilterLogs } from './../pipes/data-pipes';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FilterLogs],
  exports: [CommonModule, RouterModule, FilterLogs],
  providers: [TimeTurnerService, TreeRegistrarService, LockService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
