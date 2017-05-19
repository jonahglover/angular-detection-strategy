import { Component, Injectable, Input, ChangeDetectorRef } from '@angular/core';
import { DoCheck, OnChanges, OnInit } from '@angular/core';
/**
 * From https://codepen.io/philippkuehn/pen/QbrOaN
 * This class represents the lazy loaded HomeComponent.
 */

export interface Tree {
  children: Tree[];
}

@Component({
  moduleId: module.id,
  selector: 'big-tree',
  styleUrls: ['tree.component.css'],
  templateUrl: 'tree.component.html',
})
export class TreeComponent implements OnChanges, DoCheck, OnInit {
  @Input() public tree: Tree;
  @Input() public parentColor: string;

  color: string = '';
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
    this.color = prompt('Enter a new color');
    this.ref.markForCheck();
  }

  ngOnInit() {
    this.color = this.parentColor;
  }

  ngOnChanges() {
    this.color = this.parentColor;
  }
  ngDoCheck() {
    console.log('do check');
  }

}
