import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SystemService } from '../../stores/system';

@Component({
  selector: 'rdx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  constructor(readonly systemService: SystemService) { }
}
