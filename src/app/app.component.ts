import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService, ISystem } from './api';

@Component({
  selector: 'rdx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly system$ = new BehaviorSubject<ISystem>(undefined);

  constructor(private readonly _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.once('system', (_, v) => {
      this.system$.next(v);
    });
  }
}
