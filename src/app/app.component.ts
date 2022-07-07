import { Component, HostListener, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from './product-service/product-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APPCONSTANTS } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


  constructor(public productService: ProductServiceService, private renderer: Renderer2,
    private _snackBar: MatSnackBar) { }

  public productList: any = [];
  public showToTop: boolean = false;
  public enableLazyLoad: boolean = true;
  public totalCount: number = 0;
  public searchTerm: any = null;
  public searchTermLastValue: any;
  public paginationInd = 0;

  searchFrom = new FormGroup({
    searchTerm: new FormControl(''),
  });

  ngOnInit() {
    if (this.searchTerm == null) {
      this.enableLazyLoad = false;
    }
  }
  openSnackBar() {
    this._snackBar.open(APPCONSTANTS.GENERIC_ERR_MSG, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-alert-snackbar',
      duration: APPCONSTANTS.GENERIC_ERR_MSG_TIMER
    });
  }
  searchProduct(event?: any) {
    this.productService.displayLoader = true;
    this._snackBar.dismiss();
    this.productService.showAllCaughtErr = false;
    this.enableLazyLoad = false;
    this.showToTop = false;
    this.getProduct(this.searchTerm, event?.paginationInd ? event.paginationInd : 0);
  }

  disableNotification() {
    this.enableLazyLoad = false;
    this.productList = null;
    this.openSnackBar()
  }

  enableNotification(response: any) {
    this.totalCount = response.data.searchTerm ? response.data.paging.total_page : 0;
    this.enableLazyLoad = true;
    this._snackBar.dismiss();
  }

  getProduct(term: any, ind: any) {
    this._snackBar.dismiss();
    this.productService.showAllCaughtErr = false;
    this.totalCount = 0;
    if (ind == 0) {
      this.productList = [];
      this.paginationInd = 0;
    }

    this.productService.getProductList(term, ind).subscribe(({
      next: (response) => {
        this.renderer.removeClass(document.body, 'stop-scroll');
        if (this.searchTermLastValue == this.searchTerm) {
          if (response.data.searchTerm) {
            this.productList = this.productList.concat(response.data.products)
            this.enableNotification(response);
          } else {
            this.disableNotification()
          }
        } else {
          this.renderer.removeClass(document.body, 'stop-scroll');
          this.scrollbarTop()
          this.searchTermLastValue = this.searchTerm;
          if (response.data.searchTerm) {
            this.productList = response.data.products;
            this.enableNotification(response);
          } else {
            this.disableNotification()
          }
        }
        this.productService.displayLoader = false;
      },
      error: (err: Error) => {
        this.renderer.removeClass(document.body, 'stop-scroll');
        this.productService.displayLoader = false;
        this.enableLazyLoad = false;
        this.openSnackBar()
      }
    }));
  }

  scrollbarTop() {
    window.scroll(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY >= APPCONSTANTS.SCROLL_TO_TOP) {
      this.showToTop = true;
    } else {
      this.showToTop = false;
    }
    if ((window.innerHeight + window.scrollY == (document.body.scrollHeight)) && this.enableLazyLoad) {
      this.renderer.addClass(document.body, 'stop-scroll');
      this.paginationInd += 1;
      if (this.searchTerm && (this.paginationInd < this.totalCount)) {
        this.productService.displayLoader = true;
        this.getProduct(this.searchTerm, this.paginationInd);
      } else {
        console.log(this.paginationInd, this.totalCount)
        this.renderer.removeClass(document.body, 'stop-scroll');
        this.productService.showAllCaughtErr = true;
        this.enableLazyLoad = false;
      }
    }
  }
}
