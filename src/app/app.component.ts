import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { ApiService } from './api';
import { SystemService } from './stores/system';

@Component({
  selector: 'rdx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _apiService: ApiService,
    private readonly _systemService: SystemService,
  ) { }

  ngOnInit() {
    this._apiService.once('system', (_, v) => {
      this._systemService.set(v);
    });
  }
}
