import { Injectable } from '@angular/core';
import { ProductListStore, ProductListState } from './product-list.store';
import { Query } from '@datorama/akita';

@Injectable({
	providedIn: 'root'
})
export class ProductListQuery extends Query<ProductListState> {
	constructor(protected store: ProductListStore) {
		super(store);
	}
	public searchTerm$ = this.select(state => state.searchTerm);
	public products$ = this.select(state => state.products);

}
