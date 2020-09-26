import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { Constructor } from '../types/constructor.type';

export function subscribableMixin<T extends Constructor<{}>>(Base: T) {
  @Component({ template: '' })
  class Subscribable extends Base implements OnDestroy {
    readonly destroy$ = new Subject<void>();

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  return Subscribable;
}
