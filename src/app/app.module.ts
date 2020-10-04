import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { ToolbarModule } from './components/toolbar';
import { ActionbarModule } from './components/actionbar';
import { SidenavModule } from './components/sidenav';
import { AboutDialogModule } from './components/about-dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      maxOpened: 3,
      progressBar: true,
      autoDismiss: true,
      tapToDismiss: true,
      timeOut: 5000,
    }),

    ToolbarModule,
    ActionbarModule,
    SidenavModule,
    AboutDialogModule,
  ],
})
export class AppModule { }
