import { Component, Injectable, Input, ElementRef, SimpleChanges } from '@angular/core';
import { AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked } from '@angular/core';
import { TimeTurnerService, LogEvent, Log } from '../time-turner/time-turner.service';
import { TreeRegistrarService } from '../tree-registrar/tree-registrar.service';

export interface Tree {
  children: Tree[];
}

@Component({
  moduleId: module.id,
  selector: 'big-tree',
  styleUrls: ['tree.component.css'],
  templateUrl: 'tree.component.html',
})
export class TreeComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() public tree: Tree;
  @Input() public parentTreeColor: String;


  treeColor: String;

  // unforunate hack so that I can save ngOnChanges logs;
  bufferedLogs: Log[] = [];
  id: number = null;

  constructor(
    private timeTurnerService: TimeTurnerService,
    private treeRegistrarService: TreeRegistrarService,
    private elementRef: ElementRef,
  ) {}

  /*** Look below this guy */

  changeButtonColor() {
    this.treeColor = prompt('Enter a new color');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.treeColor = this.parentTreeColor;

    // IGNORE BELOW
    this.ngOnChangesStuffYouShouldIgnoreSeriouslyDontLook(changes);
    // IGNORE ABOVE
  }

  /** Look above this guy */





  /**** CODE BELOW THIS LINE IS NOT IMPORTANT FOR THE DEMO !!!!!! */

  ngOnInit():void {
    // hack so that I get the first ngOnChanges event
    this.id = this.treeRegistrarService.registerTree(this);
    if(this.bufferedLogs.length > 0) {
      this.bufferedLogs.forEach((log: Log) => {
        this.timeTurnerService.log(this.id, log.event, log.message);
      });
      this.bufferedLogs = [];
    }
    this.timeTurnerService.log(this.id, LogEvent.ngOnInit);
  }

  ngOnChangesStuffYouShouldIgnoreSeriouslyDontLook(changes: SimpleChanges) {
    if(this.id !== null) {
      this.timeTurnerService.log(this.id, LogEvent.ngOnChanges, changes);
    } else {
      this.bufferedLogs.push({
        id: null,
        nodeId: this.id,
        event: LogEvent.ngOnChanges,
        message: changes
      });
    }
  }

  ngDoCheck() {
    this.timeTurnerService.log(this.id, LogEvent.ngDoCheck);
  }

  ngAfterContentInit() {
    this.timeTurnerService.log(this.id, LogEvent.ngAfterContentInit);
  }

  ngAfterContentChecked() {
    this.timeTurnerService.log(this.id, LogEvent.ngAfterContentChecked);
  }

  ngAfterViewInit() {
    this.timeTurnerService.log(this.id, LogEvent.ngAfterViewInit);
  }

  ngAfterViewChecked() {
    this.timeTurnerService.log(this.id, LogEvent.ngAfterViewChecked);
  }

  ngOnDestroy() {
    this.timeTurnerService.log(this.id, LogEvent.ngOnDestroy);
  }

  addChild() {
    const child: Tree = {
      children: [],
    };
    this.tree.children.push(child);
  }

  removeChild() {
    this.tree.children.pop();
    this.timeTurnerService.clearLogs();
  }

  getElementRef() {
    return this.elementRef;
  }

}
