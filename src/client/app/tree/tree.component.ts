import { Component, Injectable, Input, ElementRef } from '@angular/core';
import { AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked } from '@angular/core';
import { TimeTurnerService, LogEvent } from '../time-turner/time-turner.service';
import { TreeRegistrarService } from '../tree-registrar/tree-registrar.service';

export interface Tree {
  children: Tree[];
}

export interface Options {
  color: String;
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
  @Input() public options: Options;

  treeOptions: Options = {
    color: null
  };
  id: number = null;

  /* nothing in the constructor is helpful for this demo*/
  constructor(
    private timeTurnerService: TimeTurnerService,
    private treeRegistrarService: TreeRegistrarService,
    private elementRef: ElementRef,
  ) { }


  ngOnChanges() {
    this.treeOptions = {
      color: this.options.color
    };

    // IGNORE FOLLOWING
    if(this.id !== null) {
      this.timeTurnerService.log(this.id, LogEvent.ngOnChanges);
    }
  }


  /**** CODE BELOW THIS LINE IS NOT IMPORTANT FOR THE DEMO !!!!!! */

  ngOnInit():void {
    this.id = this.treeRegistrarService.registerTree(this);
    this.timeTurnerService.log(this.id, LogEvent.ngOnInit);
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

  changeButtonColor() {
    this.treeOptions = {
      color: prompt('Enter a new color')
    };
  }

  getElementRef() {
    return this.elementRef;
  }

}
