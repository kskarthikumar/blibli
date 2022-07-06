import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service/product-service.service';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent implements OnInit {

  constructor(public productService: ProductServiceService) { }

  @Input()
  productList: any = [];

  ngOnInit(): void {
  }

  showAlert() {
    alert('You clicked on view details!')
  }
}
