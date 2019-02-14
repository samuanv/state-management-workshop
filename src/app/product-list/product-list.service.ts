import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
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

	constructor(private httpClient: HttpClient) {
	}

	public getProductList(): Observable<Product[]> {
		return this.httpClient.get<Product[]>('localhost:3000/products');
	}
	public filterProductList(term: string): Observable<Product[]> {
		return this.httpClient.get<Product[]>('localhost:3000/products?q=' + term);
	}
}
