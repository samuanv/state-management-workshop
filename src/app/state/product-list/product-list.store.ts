import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { Product } from 'src/app/product-list/product-list.service';
export interface ProductListState {
	products: Product[];
	searchTerm: string;
}
export function createInitialState(): ProductListState {
  return {
    products: [],
    searchTerm: ''
  };
}
@Injectable({
	providedIn: 'root'
})
@StoreConfig({name: 'product-list'})
export class ProductListStore extends Store<ProductListState> {
	constructor() {
		super(createInitialState());
	}
}
