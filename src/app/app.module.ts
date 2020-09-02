import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ToolbarModule } from './components/toolbar';
import { ActionbarModule } from './components/actionbar';
import { SidenavModule } from './components/sidenav';

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
  ],
})
export class AppModule { }
