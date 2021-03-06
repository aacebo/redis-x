import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'rdx-highlight',
  template: '',
  styleUrls: ['./highlight.component.scss'],
  host: {
    class: 'rdx-highlight',
    '[innerHTML]': 'html',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HighlightComponent implements OnInit, OnChanges {
  @Input() keyword: string;
  @Input() text: string;

  html: string;

  ngOnInit() {
    this.html = this._markify(this.keyword, this.text);
  }

  ngOnChanges() {
    this.html = this._markify(this.keyword, this.text);
  }

  private _markify(keyword: string, text: string) {
    if (!keyword?.length) {
      return text;
    }

    return text.replace(new RegExp(`(${keyword})`, 'g'), `<mark>${keyword}</mark>`);
  }
}
