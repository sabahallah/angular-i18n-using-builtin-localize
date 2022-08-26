import {
  DOCUMENT,
  isPlatformBrowser,
  registerLocaleData,
} from '@angular/common';
import {
  APP_INITIALIZER,
  Inject,
  Injectable,
  LOCALE_ID,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import CookieUtils from '../utils/CookieUtil';

@Injectable({
  providedIn: 'root',
})
class I18n {
  constructor(
    @Optional() @Inject(REQUEST) private req: Request,
    @Inject(PLATFORM_ID) private platform: any,
    @Inject(TransferState) private transferState: TransferState,
    @Inject(DOCUMENT) private document: Document
  ) {}
  locale = 'en';

  async setLocale() {
    const supportedLocales = ['en', 'ar'];
    const defaultLocal = 'en';

    let langCookie = isPlatformBrowser(this.platform)
      ? CookieUtils.getCookie('lang')
      : this.req?.cookies.lang;

    if (isPlatformBrowser(this.platform)) {
      this.locale =
        supportedLocales.find((l) => langCookie === l) ??
        supportedLocales.find((l) => navigator.language.startsWith(l)) ??
        defaultLocal;
    } else {
      const langFromHeaders = this.req?.headers
        ? this.req.headers['accept-language']?.split(',')[0].split('-')[0]
        : undefined;
      this.locale =
        supportedLocales.find((l) => langCookie === l) ??
        supportedLocales.find((l) => langFromHeaders === l) ??
        defaultLocal;
    }

    this.document.documentElement.lang = this.locale;

    if (this.locale === 'ar') {
      this.document.documentElement.dir = 'rtl';
    } else {
      this.document.documentElement.dir = 'ltr';
    }

    const localeModuleKey = makeStateKey<any>('transfer-state-local-module');
    let localeModule = this.transferState.get(localeModuleKey, null);
    if (!localeModule) {
      localeModule = await import(
        /* webpackInclude: /(en|ar)\.mjs$/ */

        `/node_modules/@angular/common/locales/${this.locale}.mjs`
      );

      this.transferState.set(localeModuleKey, localeModule);
    }

    // Set locale for built in pipes, dates, etc.
    registerLocaleData(localeModule.default);

    const translationsKey = makeStateKey<any>('transfer-state-translations');
    let localeTranslationsModule = this.transferState.get(
      translationsKey,
      null
    );
    if (!localeTranslationsModule) {
      // Load translation file
      // you can also load via fetch API
      localeTranslationsModule = await import(
        `src/assets/i18n/messages.${this.locale}.json`
      );
      this.transferState.set(translationsKey, localeTranslationsModule);
    }

    // Load translations for the current locale at run-time
    loadTranslations(localeTranslationsModule.default.translations);
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
    useFactory: (i18n: I18n) => {
      return i18n.locale;
    },
    deps: [I18n],
  };
}

export const I18nModule = {
  setLocale: setLocale,
  setLocaleId: setLocaleId,
};
