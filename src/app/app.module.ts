import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { I18nModule } from './core/I18n';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [I18nModule.setLocale(), I18nModule.setLocaleId()],
  bootstrap: [AppComponent],
})
export class AppModule {}
