import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from './product-service/product-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {


  constructor(public productService: ProductServiceService) { }

  public productList: any = [];
  public showToTop: boolean = false;
  public totalCount: number = 0;
  public searchTerm: any;

  searchFrom = new FormGroup({
    searchTerm: new FormControl(''),
  });

  searchProduct(event?: any) {
    this.productService.displayLoader = true;
    this.showToTop = false;
    this.getProduct(this.searchTerm, event?.paginationInd ? event.paginationInd : 0);
  }

  getProduct(term: any, ind: any) {
    this.productService.getProductList(term, ind).subscribe(({
      next: (response) => {
        this.productList = response.data.searchTerm ? response.data.products : null;
        this.totalCount = response.data.searchTerm ? response.data.paging.total_page : 0;
        this.productService.displayLoader = false;
        this.scrollbarTop()

      },
      error: (err: Error) => {
        this.productService.displayLoader = false;
        alert('Error occured, please try again')
      }
    }));
  }

  scrollbarTop() {
    window.scroll(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY >= (document.body.scrollHeight / 1.3)) {
      this.showToTop = true;
    } else {
      this.showToTop = false;
    }
  }
}
