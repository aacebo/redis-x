import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToolbarModule } from './components/toolbar';
import { ActionbarModule } from './components/actionbar';
import { SidenavModule } from './components/sidenav';
import { AlertModule } from './components/alert';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    ToolbarModule,
    ActionbarModule,
    SidenavModule,
    AlertModule,
    NgbModule,
  ],
})
export class AppModule { }
