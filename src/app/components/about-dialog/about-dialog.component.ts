import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SystemService } from '../../stores/system';

@Component({
  selector: 'rdx-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDialogComponent {
  constructor(readonly systemService: SystemService) { }
}
