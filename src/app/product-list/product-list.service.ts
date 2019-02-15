import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, debounceTime, tap } from 'rxjs/operators';
import { ProductListStore } from '../state/product-list/product-list.store';
export interface Product {
	name: string;
	img: string;
	price: string;
}
export class State {
	products: Product[] = [];
	searchTerm = '';
}
@Injectable({
  providedIn: 'root'
})
export class ProductListService {

	constructor(private httpClient: HttpClient, private productListStore: ProductListStore) {
	}

	public getProductList(): void {
		this.httpClient.get<Product[]>('localhost:3000/products').subscribe((products: Product[]) => {
			this.productListStore.update(state => (
				{
					...state,
					products
				}
			));
		});
	}
	public filterProductList(term: string): void {
		this.productListStore.update(state => ({
			...state,
			searchTerm: term
		}));
		this.httpClient.get<Product[]>('localhost:3000/products?q=' + term).subscribe((products: Product[]) => {
			this.productListStore.update(state => (
				{
					...state,
					products
				}
			));
		});
	}
}
