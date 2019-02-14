import { Component, OnInit } from '@angular/core';
import { ProductListService, Product } from './product-list.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StateFacade } from './state-facade.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	public searchProduct: FormControl = new FormControl('');
	public productList$: Observable<Product[]>;
  constructor(private stateFacade: StateFacade) {
		this.productList$ = this.stateFacade.productList$;
		this.searchProduct.valueChanges.subscribe(value => this.stateFacade.filterProductList(value));
	}

  ngOnInit() {
		this.stateFacade.getProductList();
  }

}
