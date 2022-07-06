import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ProductGroupComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatSnackBarModule, MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
