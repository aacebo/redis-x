import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

import { ToolbarModule } from './components/toolbar';
import { ActionbarModule } from './components/actionbar';
import { SidenavModule } from './components/sidenav';

import { FeatherModule } from './feather.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,

    AppRoutingModule,
    FeatherModule,

    ToolbarModule,
    ActionbarModule,
    SidenavModule,
  ],
})
export class AppModule { }
