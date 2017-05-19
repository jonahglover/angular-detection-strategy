import { Component, Injectable, Input, ChangeDetectorRef } from '@angular/core';
import { DoCheck, OnChanges, OnInit } from '@angular/core';
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
  templateUrl: 'tree.component.html',
})
export class TreeComponent implements OnChanges {
  @Input() public tree: Tree;
  @Input() public parentOptions: Options;

  options: Options = {
    color: ''
  };

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
    this.options.color = prompt('Enter a new color');
  }

  ngOnChanges() {
    this.options.color = this.parentOptions.color;
  }

}
