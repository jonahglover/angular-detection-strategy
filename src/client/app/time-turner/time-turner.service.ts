import { Injectable, NgZone } from '@angular/core';
import { LockService } from '../lock/lock.service';
import { Observable, Observer } from 'rxjs/Rx';
import * as _ from "lodash";

export interface Log {
  event: LogEvent;
  nodeId: number;
  id: number;
}

export enum LogEvent {
  ngOnChanges,
  ngOnInit,
  ngDoCheck,
  ngAfterContentInit,
  ngAfterContentChecked,
  ngAfterViewInit,
  ngAfterViewChecked,
  ngOnDestroy
}

@Injectable()
export class TimeTurnerService {

  logger: Log[] = [];
  public logSource: Observable<Array<Log>>;
  private observor: Observer<Array<Log>>;


  constructor(
    private lockService: LockService
  ) { 
    this.logSource =  new Observable(observer => {
      this.observor = observer;
    });

  }

  log(nodeId: number, event: LogEvent):void {
    const id = this.logger.length;
    if(!this.lockService.isLocked()) {
      this.logger.push({
        event,
        nodeId,
        id
      });
    }
    this.logger = [].concat(this.logger);
    this.observor.next(this.logger);
  }

  getLog(): Log[] {
    return this.logger;
  }

  clearLogs(): void {
    this.logger = [];
  }

  getLogFromId(logId: number): Log {
    return _.find(this.logger, (l: Log) => {
      return l.id === logId;
    });
  }

}
