import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'rdx-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit {
  @Input() text: string;

  @Output() search = new EventEmitter<string>();

  readonly control = new FormControl();

  ngOnInit() {
    this.control.setValue(this.text || '');
    this.control.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
    ).subscribe(text => {
      this.search.emit(text);
    });
  }
}
