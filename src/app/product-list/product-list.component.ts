import { Component, OnInit } from '@angular/core';
import { ProductListService, Product } from './product-list.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductListQuery } from '../state/product-list/product-list.query';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	public searchProduct: FormControl = new FormControl('');
	public productList$: Observable<Product[]>;
  constructor(private productListQuery: ProductListQuery, private productService: ProductListService) {
		this.productList$ = this.productListQuery.products$;
		this.searchProduct.valueChanges.subscribe(value => this.productService.filterProductList(value));
	}

  ngOnInit() {
		this.productService.getProductList();
  }

}
