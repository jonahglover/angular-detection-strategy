import { Injectable } from '@angular/core';

@Injectable()
export class LockService {

  globalLock: boolean = true;

  lock(): void {
    this.globalLock = true;
  }

  unlock(): void {
    this.globalLock = false;
  }

  isLocked(): boolean {
    return this.globalLock;
  }

}
