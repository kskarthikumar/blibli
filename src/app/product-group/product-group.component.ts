import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent implements OnInit {

  constructor() { }

  @Input()
  productList: any = [];
  
  ngOnInit(): void {
  }

  showAlert() {
    alert('You clicked on view details!')
  }
}
