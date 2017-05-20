import { Component, Injectable, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
/**
 * From https://codepen.io/philippkuehn/pen/QbrOaN
 * This class represents the lazy loaded HomeComponent.
 */

export interface Tree {
  children: Tree[];
}

export interface Options {
  color: string;
}

@Component({
  moduleId: module.id,
  selector: 'big-tree',
  styleUrls: ['tree.component.css'],
  templateUrl: 'tree.component.html'
})
export class TreeComponent implements OnChanges {
  @Input() public tree: Tree;
  @Input() public parentOptions: Options;

  options: Options = {
    color: ''
  };

  ref: ChangeDetectorRef;

  constructor(ref: ChangeDetectorRef) {
    this.ref = ref;
  }

  addChild() {
    const child: Tree = {
      children: [],
    };
    this.tree.children.push(child);
  }

  removeChild() {
    this.tree.children.pop();
  }

  changeColor() {
    this.parentOptions.color = prompt('Enter a new color');
    this.ref.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.options.color = this.parentOptions.color;
  }
}
