import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  printedTshirt: number = 12.55;
  slubJerseyTshirt = 18.7;
  tshirtWithMotif = 16.55;
  artTshirt = 12.55;
  constructor() {}

  ngOnInit(): void {}
}
