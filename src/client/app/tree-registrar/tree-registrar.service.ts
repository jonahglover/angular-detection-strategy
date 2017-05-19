import { Injectable } from '@angular/core';
import { TreeComponent } from '../tree/tree.component';


@Injectable()
export class TreeRegistrarService {
  index: number = 1;
  registeredTrees : { [k: string]: TreeComponent; } = {};
  registerTree(tree: TreeComponent): number {
    const treeIndex = this.index;
    this.registeredTrees[treeIndex] = tree;
    this.index = this.index+1;
    return treeIndex;
  }
}
