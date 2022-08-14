import { enableProdMode } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import CookieUtils from './app/utils/CookieUtil';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}

// First locale is default, add additional after it
const availableLocales = ['en', 'ar'];

let langCookie = CookieUtils.getCookie('lang');

let locale =
  availableLocales.find((l) => langCookie === l) ??
  availableLocales.find((l) => navigator.language.startsWith(l)) ??
  availableLocales[0];

window.document.documentElement.lang = locale;
if (locale === 'ar') {
  window.document.documentElement.dir = 'rtl';
} else {
  window.document.documentElement.dir = 'ltr';
}

if (locale === availableLocales[0]) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
} else {
  // fetch resources for runtime translations. this could also point to an API endpoint
  fetch(`assets/i18n/messages.${locale}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      loadTranslations(result);

      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
    });
}
