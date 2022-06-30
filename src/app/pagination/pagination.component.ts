import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductServiceService } from '../product-service/product-service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(public productService: ProductServiceService) { }
  @Input()
  searchTerm: any;

  @Input()
  totalCount: any;

  @Input()
  productList: any = [];

  public paginationInd = 0;

  @Output() getProduct: EventEmitter<any> = new EventEmitter<any>;

  ngOnInit(): void {
  }

  doPagination(ind: string) {
    this.productService.displayLoader = true;
    if (ind == 'next') {
      this.paginationInd += 1;
    } else {
      this.paginationInd -= 1;
    }
    let searchTerm = this.searchTerm;
    let paginationInd = this.paginationInd;
    this.getProduct.emit({ searchTerm, paginationInd });

  }
}
