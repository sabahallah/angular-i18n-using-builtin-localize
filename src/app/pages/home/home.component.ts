import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  heading: string = $localize`BEST PLACE TO CHOOSE YOUR CLOTHES`;
  shopNow: string = $localize`SHOP NOW`;
  constructor() {}

  ngOnInit(): void {}
  getLorem(lorem: string) {
    return $localize`:this is random text|random text@@lorem:${lorem}:loremName: dolor sit amet, consectetur adipisicing elit. Porro
    beatae error laborum ab amet sunt recusandae? Reiciendis natus
    perspiciatis optio.`;
  }
}
