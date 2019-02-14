import { Component, OnInit } from '@angular/core';
import { ProductListService, Product } from './product-list.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	public searchProduct: FormControl = new FormControl('');
	public productList$: Observable<Product[]>;
  constructor(private productListService: ProductListService) {
		this.productList$ = this.productListService.productList$;
		this.searchProduct.valueChanges.subscribe(value => this.productListService.filterProductList(value));
	}

  ngOnInit() {
		this.productListService.getProductList();
  }

}
