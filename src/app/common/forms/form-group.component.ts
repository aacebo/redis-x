import { ChangeDetectionStrategy, Component, ContentChildren, OnDestroy, QueryList, ViewEncapsulation } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'rdx-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  host: { class: 'rdx-form-group form-group' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupComponent implements OnDestroy {
  @ContentChildren(FormControlName, { descendants: false })
  get formControlNames() { return this._formControlNames; }
  set formControlNames(v) {
    this._formControlNames = v;

    if (v.first) {
      this._errors$ = v.first.statusChanges.pipe(
        takeUntil(this._destroy$),
        map(() => this._parseErrors(v.first)),
      );
    }
  }
  private _formControlNames: QueryList<FormControlName>;

  get errors$() { return this._errors$; }
  private _errors$?: Observable<string[]>;

  private readonly _destroy$ = new Subject<void>();
  private readonly _staticErrors = {
    required: 'required',
  };

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _parseErrors(c: FormControlName) {
    const errors: string[] = [];

    if (c.dirty && c.errors) {
      for (const key in c.errors) {
        errors.push(this._staticErrors[key] || c.errors[key]);
      }
    }

    return errors;
  }
}
