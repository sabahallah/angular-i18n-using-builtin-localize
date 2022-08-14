import { Component, OnInit } from '@angular/core';
import CookieUtils from '../../utils/CookieUtil';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  changeLanguage() {
    // add cookie for arabic language only
    let langCookie = CookieUtils.getCookie('lang');
    console.log('langCookie: ', langCookie);
    if (!langCookie) {
      CookieUtils.setCookie('lang', 'ar', '/', 365);
    } else {
      CookieUtils.removeCookie('lang');
    }

    window.location.reload();
  }
}
