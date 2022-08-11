import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  lang = 'en';
  constructor(@Inject(LOCALE_ID) public activeLocale: string) {
    if (activeLocale) {
      this.lang = this.activeLocale.split('-')[0];
      console.log(this.lang);
    }
  }

  ngOnInit(): void {}
  changeLanguage() {
    window.location.href = `/${this.lang === 'en' ? 'ar' : 'en'}`;
  }
}
