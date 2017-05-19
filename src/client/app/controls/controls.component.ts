import { Component, Injectable, Input, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TimeTurnerService, LogEvent, Log } from '../time-turner/time-turner.service';
import { TreeRegistrarService } from './../tree-registrar/tree-registrar.service';
import { LockService } from './../lock/lock.service';
import { FilterLogs } from './../pipes/data-pipes';

@Component({
  moduleId: module.id,
  selector: 'tree-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['controls.component.css'],
  templateUrl: 'controls.component.html'
})
export class ControlsComponent {
  @Input() private logger: Log[] = [];

  controlState = {
    paused: true,
    currentStep: 0,
    recording: false,
    logFilters : {
      [LogEvent.ngOnChanges] : true,
      [LogEvent.ngOnInit]: false,
      [LogEvent.ngDoCheck]: true,
      [LogEvent.ngAfterContentInit]: false,
      [LogEvent.ngAfterContentChecked]: false,
      [LogEvent.ngAfterViewInit]: false,
      [LogEvent.ngAfterViewChecked]: true,
      [LogEvent.ngOnDestroy]: false
    }
  };

  public logEvent = LogEvent;
  public logs: Log[] = [];

  private logFilter = new FilterLogs();

  constructor(
    private ref: ChangeDetectorRef,
    private timeTurnerService: TimeTurnerService,
    private treeRegistrarService: TreeRegistrarService,
    private lockService: LockService,
    private ngZone: NgZone
  ) {
    this.timeTurnerService.logSource.subscribe((newLogs: Log[]) => {
      this.logs = this.logFilter.transform(newLogs, this.controlState.logFilters);
      this.ref.detectChanges();
    });
  }

  getNameFromLogEvent(evt: LogEvent) {
    return LogEvent[evt];
  }

  getEventName(event: LogEvent) {
    return LogEvent[event];
  }

  clearLogs() {
    this.timeTurnerService.clearLogs();
    this.controlState.currentStep = 0;
  }

  setStep(index: number) {
    this.controlState.currentStep = index;
    this.playCurrent();
  }

  stepForward() {
    if(this.controlState.currentStep < this.logs.length - 1) {
      this.controlState.currentStep+=1;
    }
    this.playCurrent();
  }

  stepBackward() {
    if(this.controlState.currentStep > 0) {
      this.controlState.currentStep-=1;
    }
    this.playCurrent();
  }

  getCurrentStep() {
    return this.controlState.currentStep;
  }

  record() {
    this.controlState.recording = true;
    this.lockService.unlock();
  }

  play() {
    this.controlState.paused = false;
    this.lockService.lock();
  }

  pause() {
    this.controlState.paused = true;
    this.lockService.lock();
  }

  stopRecording() {
    this.lockService.lock();
    this.controlState.recording = false;
  }

  isPaused() {
    return this.controlState.paused;
  }

  isRecording() {
    return this.controlState.recording;
  }

  playCurrent() {
    if(this.timeTurnerService.logger.length > 0) {
      this.ngZone.runOutsideAngular(() => {
        const step = this.getCurrentStep();
        const log = this.timeTurnerService.getLogFromId(this.logs[step].id);
        const colorClass = this.getLogEventColor(log.event);
        this.setNodeColor(Number(log.nodeId), colorClass);
        setTimeout(() => {
          this.removeNodeColor(log.nodeId, colorClass);
        }, 500);
      });
    }
  }

  logTrack(index: number, log: Log) {
    return log.id;
  }

  toggleLogOption(logEvent:LogEvent) {
    this.controlState.currentStep = 0;
    this.controlState.logFilters[logEvent] = !this.controlState.logFilters[logEvent];
  }


  /*
  * changes the color of a node to reflect that point in history
  * note this should be done in an NgZone to avoid being in the Angular LifeCycle
  * good gravy please do not touch this or judge me on it's contents, Its a hack that needed to be hack.
  */

  getLogEventColor(evt: LogEvent) {
    return 'background-'+LogEvent[evt];
  }

  setNodeColor(nodeId: number, colorClass: string) {
    const treeRef = this.treeRegistrarService.registeredTrees[nodeId].getElementRef();
    const element = treeRef.nativeElement.firstElementChild.firstElementChild.firstElementChild;
    element.classList.add(colorClass);
  }

  removeNodeColor(nodeId: number, colorClass: string) {
    const treeRef = this.treeRegistrarService.registeredTrees[nodeId].getElementRef();
    const element = treeRef.nativeElement.firstElementChild.firstElementChild.firstElementChild;
    element.classList.remove(colorClass);
  }
}


