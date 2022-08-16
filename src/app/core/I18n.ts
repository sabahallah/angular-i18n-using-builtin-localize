import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, Injectable, LOCALE_ID } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import CookieUtils from '../utils/CookieUtil';

@Injectable({
  providedIn: 'root',
})
class I18n {
  locale = 'en';

  async setLocale() {
    // First locale is default, add additional after it
    const availableLocales = ['en', 'ar'];

    let langCookie = CookieUtils.getCookie('lang');

    this.locale =
      availableLocales.find((l) => langCookie === l) ??
      availableLocales.find((l) => navigator.language.startsWith(l)) ??
      availableLocales[0];

    window.document.documentElement.lang = this.locale;
    if (this.locale === 'ar') {
      window.document.documentElement.dir = 'rtl';
    } else {
      window.document.documentElement.dir = 'ltr';
    }
    if (this.locale !== availableLocales[0]) {
      // Use web pack magic string to only include required locale data
      const localeModule = await import(
        /* webpackInclude: /(en|ar)\.mjs$/ */

        `/node_modules/@angular/common/locales/${this.locale}.mjs`
      );

      // Set locale for built in pipes, dates, etc.
      registerLocaleData(localeModule.default);

      // Load translation file
      // you can also load via fetch API
      const localeTranslationsModule = await import(
        `src/assets/i18n/messages.${this.locale}.json`
      );

      // Load translations for the current locale at run-time
      loadTranslations(localeTranslationsModule.default.translations);
    }
  }
}

// Load locale data at app start-up
function setLocale() {
  return {
    provide: APP_INITIALIZER,
    useFactory: (i18n: I18n) => () => i18n.setLocale(),
    deps: [I18n],
    multi: true,
  };
}

// Set the runtime locale for the app
function setLocaleId() {
  return {
    provide: LOCALE_ID,
    useFactory: (i18n: I18n) => i18n.locale,
    deps: [I18n],
  };
}

export const I18nModule = {
  setLocale: setLocale,
  setLocaleId: setLocaleId,
};
