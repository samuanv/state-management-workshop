import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { Product, ProductListService } from './product-list.service';
export class State {
	products: Product[] = [];
	searchTerm = '';
}
@Injectable({
  providedIn: 'root'
})
export class StateFacade {
	private state = new State();
	private dispatch = new BehaviorSubject<State>(this.state);

	public productList$: Observable<Product[]> = this.dispatch.asObservable().pipe(
		map(state => state.products), startWith([] as Product[])
	);
	public searchTerm$: Observable<string> = this.dispatch.asObservable().pipe(
		map(state => state.searchTerm)
	);
	constructor(private productListService: ProductListService) {
		this.hydrateState();
		this.dispatch.subscribe((state: State) => {
			localStorage.setItem('state', JSON.stringify(state));
		});
	}
	public getProductList(): void {
		// Cache every 24h?
		if (!this.state.products.length) {
			this.productListService.getProductList().subscribe(productList => {
				this.updateProducts(productList);
			});
		}
	}
	public filterProductList(term: string): void {
		this.updateSearchTerm(term);
		this.productListService.filterProductList(term).subscribe(productList => {
			this.updateProducts(productList);
		});
	}
	private hydrateState() {
		const state = JSON.parse(localStorage.getItem('state'));
		if (state) {
			if (state.products) {
				this.updateProducts(state.products);
			}
			if (state.searchTerm) {
				this.updateSearchTerm(state.searchTerm);
			}
		}
	}
	private updateProducts(products: Product[]) {
		this.dispatch.next(( this.state = {
			...this.state,
			products
		}));
	}
	private updateSearchTerm(searchTerm: string) {
		this.dispatch.next(( this.state = {
			...this.state,
			searchTerm
		}));
	}
}
