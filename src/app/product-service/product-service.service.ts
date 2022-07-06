import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class ProductServiceService {

  public displayLoader: boolean = false;
  public showSearchError: boolean = false;
  public showAllCaughtErr: boolean = false;
  
  constructor(private http: HttpClient) { }

  public getProductList(term: any, index: any): Observable<any>{
    return this.http.get('backend/search/products?searchTerm='+ term +'&start='+ index +'&itemPerPage=24');
  }
}
