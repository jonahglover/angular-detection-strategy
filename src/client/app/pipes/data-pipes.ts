import {Pipe, PipeTransform} from '@angular/core';
import { Log } from '../time-turner/time-turner.service';

@Pipe({ name: 'filterLogs' })

export class FilterLogs implements PipeTransform {
  public transform(logs: Log[], opt: any): Log[] {
    return logs.filter((log: Log) => {
      return opt[log.event];
    });
  }
}