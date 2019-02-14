import { Component, OnInit } from '@angular/core';
import { ProductListService } from './product-list.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	public searchProduct: FormControl = new FormControl('');
  constructor(public productListService: ProductListService) {
		this.searchProduct.valueChanges.subscribe(value => this.productListService.filterProductList(value));
	}

  ngOnInit() {
		this.productListService.getProductList();
  }

}
